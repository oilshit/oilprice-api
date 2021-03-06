# oilprice-api

[Live Preview](#live-preview) | [Project Overview](#project-overview) | [Setup Requirements](#setup-requirements) | [Project Setup](#project-setup) | [Project Implementation](#project-implementation)

## Live Preview

> This project is live on [https://oilprice-api.herokuapp.com](https://oilprice-api.herokuapp.com). Documentation is available on [https://oilprice-api.herokuapp.com/docs](https://oilprice-api.herokuapp.com/docs).

## Project Overview

This project displays basic API to get oil and gas prices based on oilprice.com.

## Setup Requirements

- Node.js (you can download it [here](https://nodejs.org))

## Project Setup

Using **Terminal** (Linux and MacOS) or **WSL console** (Windows), you can clone this repository by

```bash
git clone https://github.com/oilshit/oilprice-api.git
cd oilprice-api
```

Assuming Node.js installation has been done, you can install project dependencies by

```bash
npm install
```

or

```bash
yarn
```

After installing dependencies, you can start the server by

```bash
npm run dev
```

or

```bash
yarn run dev
```

This will starts localhost server in `http://localhost:3000` (port 3000). You can access the API for the first testing by typing `http://localhost:3000` in your browser. The documentation of API can be accessed in `http://localhost:3000/docs`.

![documentation in localhost](assets/doc1.png)

## Project Implementation

This project has been implemented on following stuffs:

- Extracting oil and gas price data into CSV file ([oilprice-extract](https://github.com/oilshit/oilprice-extract))
- more coming soon...
