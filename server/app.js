import express from "express";
import cors from "cors"
import bodyParser from "body-parser"
import apiTracker from "./Middle ware/apiTracker.js";
import requestTimeout from "./Middle ware/requestTimeOut.js";
import chalk from "chalk";


import Bisection from "./root of equation/Bisection.js";
import Graphical from "./root of equation/Graphical.js";
import OnePoint from "./root of equation/One-point.js";
import newtonRaphson from "./root of equation/newton-raphson.js";
import Secant from "./root of equation/Secant.js";
import { Cramer } from "./AXB/Cramer.js";
import { gauss_jordan } from "./AXB/gauss-jordan.js";
import { gauss } from "./AXB/gauss.js";
import requestTimeTracker from "./Middle ware/requestTimeTracker.js";
import gauss_seidel from "./AXB/Gauss-seidel.js";
import LU from "./AXB/LUdecomposition.js";


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(apiTracker);
app.use(requestTimeTracker)
app.use(requestTimeout(3000));

app.post("/graphical", async (req, res) => {
    const { question, xl, xr } = req.body;
    const response = await Graphical(question, Number(xl), Number(xr))
    res.status(200).json(response);
})

app.post("/bisection", async (req, res) => {
    const { question, xl, xr } = req.body;
    const response = await Bisection(question, Number(xl), Number(xr))
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

app.post("/secant", async (req, res) => {
    const { question, x0, x1 } = req.body;
    const response = await Secant(question, Number(x0), Number(x1));
    res.status(200).json(response);
})


app.post("/cramer", async (req, res) => {
    const { A, B } = req.body;
    const x = await Cramer(A, B);
    res.status(200).json(x);
})

app.post("/gauss", async (req, res) => {
    const { A, B } = req.body;
    const x = gauss(A, B);
    res.status(200).json(x);
})

app.post("/gauss-jordan", async (req, res) => {
    const { A, B } = req.body;
    const x = await gauss_jordan(A, B);
    res.status(200).json(x);
})

app.post("/inversion", async (req, res) => {
    const { A, B } = req.body;
    const x = await gauss_jordan(A, B);
    res.status(200).json(x);
})

app.post("/gauss-seidel", async (req, res) => {
    const { A, B } = req.body;
    const x = gauss_seidel(A, B);
    res.status(200).json(x);
})

app.post("/lu-decomposition", async (req, res) => {
    const { A, B } = req.body;
    const x = LU(A, B);
    res.status(200).json(x);
})



app.listen(8080, () => {
    console.log(chalk.yellow.bold('Server ') + chalk.bold.green("is running ") + chalk.blue.bold('at http://localhost:8080'));
});