import express from "express";
import chalk from "chalk";

//middle ware
import requestTimeTracker from "./Middle ware/requestTimeTracker.js";
import apiTracker from "./Middle ware/apiTracker.js";
import requestTimeout from "./Middle ware/requestTimeOut.js";
import cors from "cors"
import bodyParser from "body-parser"


import roe from "./API router/root_of_equation.js";
import linearEquation from "./API router/linear_equation.js"

import { Langange } from "./interpolation/Langange.js";
import { Newton_interpolation } from "./interpolation/newton.js";
import { LinearSpline, QuadraticSpline } from "./interpolation/Spline.js";


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(apiTracker);
app.use(requestTimeTracker)
app.use(requestTimeout(3000));

app.use(roe);
app.use(linearEquation)



app.post("/langange", async (req, res) => {
    const { x, y, targetX } = req.body;
    const ans = Langange(x, y, targetX);
    res.status(200).json(ans);
})

app.post("/newton", (req, res) => {
    const { x, y, targetX } = req.body;
    const ans = Newton_interpolation(x, y, targetX);
    res.status(200).json(ans);
})

app.post("/spline-linear", (req, res) => {
    const { x, y, targetX } = req.body;
    const ans = LinearSpline(x, y, targetX);
    res.status(200).json(ans);
})

app.post("/spline-quadratic", (req, res) => {
    const { x, y, targetX } = req.body;
    const ans = QuadraticSpline(x, y, targetX);
    res.status(200).json(ans);
})

app.listen(8080, () => {
    console.log(chalk.yellow.bold('Server ') + chalk.bold.green("is running ") + chalk.blue.bold('at http://localhost:8080'));
});