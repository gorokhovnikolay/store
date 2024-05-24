require("dotenv").config();
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
// app.use(express.static("../my-app/build"));
app.use(express.static(path.join(__dirname, "../my-app/build")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../my-app/build/index.html"));
});

mongoose.connect(process.env.DB_CONNETC_URL).then(() => {
	app.listen(port, () => {
		console.log(`Сервер запущен на ${port} порту`);
	});
});
