import express from "express";
import cors from "cors"
import bodyParser from "body-parser"

import Bisection from "./root of equation/Bisection.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.json({ "data": 100 });
})

app.post("/bisection", async (req, res) => {
    const { question, xl, xr } = req.body;
    const response = await Bisection(question, Number(xl), Number(xr))
    res.status(200).json(response);
})

app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
})