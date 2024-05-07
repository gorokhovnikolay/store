require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("../my-app/build"));

app.use("/", routes);

mongoose.connect(process.env.DB_CONNETC_URL).then(() => {
	app.listen(port, () => {
		console.log(`Сервер запущен на ${port} порту`);
	});
});
