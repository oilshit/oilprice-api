const express = require("express");
const axios = require("axios");

const app = express();

// const app
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Hello, world!",
  });
});

// app to get oilprice CSRF token
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

app.get("/wti", (request, response) => {
  console.log(request.body);

  response.end;
});

app.listen(3000, () => {
  console.log("listening to http://localhost:3000");
});
