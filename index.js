const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname);

app.use(express.static("public"));
app.use(cors());

const PORT = process.env.PORT || 3000;

const uri = process.env.URI || "http://192.168.1.9:3000";

// first testing
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Hello, world!",
    documentation: "https://oilprice-api.herokuapp.com/docs"
  });
});

// documentation
app.get("/docs", (request, response) => {
  response.render("docs");
});

app.get("/blend-list", (request, response) => {
  response.render("blend_list");
});

// API to get oilprice CSRF token
app.get("/csrf", async (request, response) => {
  try {
    const token = await axios.get("https://oilprice.com/ajax/csrf");

    console.log(token.data);

    response.json({
      status: token.status,
      message: "got a CSRF token!",
      data: {
        csrf_token: token.data.hash,
      },
    });
  } catch (error) {
    response
      .status(error.response.status)
      .send(`Cannot process the request: ${error.response.status}`);
  }
});

// API to get oil and gas price data based on period and blend
app.get("/prices/:blend/:period", async (request, response) => {
  let blend_code, period;

  // switch blend code based on blend param
  switch (request.params.blend) {
    case "wti":
      blend_code = 45;
      break;
    case "brent":
      blend_code = 46;
      break;
    case "natgas":
      blend_code = 51;
      break;
    case "heatingoil":
      blend_code = 52;
      break;
    case "opcblend":
      blend_code = 4460;
      break;
    case "marsus":
      blend_code = 50;
      break;
    case "opecbasket":
      blend_code = 29;
      break;
    case "cci":
      blend_code = 68;
      break;
    case "dme":
      blend_code = 48;
      break;
    case "mexican":
      blend_code = 71;
      break;
    case "indian":
      blend_code = 72;
      break;

    // Indonesia
    case "cinta":
      blend_code = 4176;
      break;
    case "duri":
      blend_code = 4177;
      break;
    case "minas":
      blend_code = 4181;
      break;
    default:
      break;
  }

  // switch period based on period param
  switch (request.params.period) {
    case "daily":
      period = 2;
      break;
    case "weekly":
      period = 3;
      break;
    case "monthly":
      period = 4;
      break;
    case "yearly":
      period = 5;
      break;
    case "max":
      period = 7;
      break;
    default:
      break;
  }

  try {
    // get CSRF token from /csrf route
    const csrf_token = await axios.get(`${uri}/csrf`).then((result) => {
      return result.data.data.csrf_token;
    });

    // get oil and gas price data based on period and blend
    const blend_data = await axios.post(
      `https://oilprice.com/freewidgets/json_get_oilprices`,
      `blend_id=${blend_code}&period=${period}&op_csrf_token=${csrf_token}`,
      {
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/x-www-form-urlencoded",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "Sec-GPC": 1,
          TE: "trailers",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    // small processings and deletion of unused properties
    [
      "id",
      "blend_name",
      "flag",
      "location",
      "section",
      "order",
      "day_template_order",
      "chart_periods",
      "update_text",
      "breaks",
      "formula",
      "hide",
      "source",
      "technicals_symbol",
      "technicals_enabled",
    ].forEach((item) => delete blend_data.data.blend[item]);
    Object.defineProperty(
      blend_data.data.blend,
      "name",
      Object.getOwnPropertyDescriptor(blend_data.data.blend, "spreadsheet_name")
    );
    delete blend_data.data.blend["spreadsheet_name"];

    // console.log(blend_data.data);
    response.status(200).json(blend_data.data);
  } catch (error) {
    console.log(error);

    response.json({
      message: "request failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`);
});
