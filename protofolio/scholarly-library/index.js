const express = require("express");
const { urlencoded, json } = require("body-parser");
const router = require("./routes/main");

const app = express();
const PORT = 8000;

// Middleware
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./routes/views");

// Routes
app.use("/", router);
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
