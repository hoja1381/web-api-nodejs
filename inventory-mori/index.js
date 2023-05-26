const dotenv = require("dotenv");
const express = require("express");

const app = express();
dotenv.config();

require("./strartup/db");

app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is runnig");
});

require("./strartup/routes")(app);
