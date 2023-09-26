import express from "express";
import cors from "cors"
import bodyParser from "body-parser"

import Bisection from "./root of equation/Bisection.js";
import Graphical from "./root of equation/Graphical.js";
import OnePoint from "./root of equation/One-point.js";
import newtonRaphson from "./root of equation/newton-raphson.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/bisection", async (req, res) => {
    const { question, xl, xr } = req.body;
    const response = await Bisection(question, Number(xl), Number(xr))
    res.status(200).json(response);
})
app.post("/graphical", async (req, res) => {
    const { question, xl, xr } = req.body;
    const response = await Graphical(question, Number(xl), Number(xr))
    res.status(200).json(response);
})

app.post("/onepoint", async (req, res) => {
    const { question, x0 } = req.body;
    const response = await OnePoint(question, Number(x0));
    res.status(200).json(response);
})

app.post("/newton-raphson", async (req, res) => {
    const { question, x0 } = req.body;
    const response = await newtonRaphson(question, Number(x0));
    res.status(200).json(response);
})

app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
})