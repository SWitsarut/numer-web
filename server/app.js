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
// import diff from "./API router/differentiation.js"
import regression from "./API router/regression.js"
import test from "./API router/backtest1.js"

import { Langange } from "./interpolation/Langange.js";
import { Newton_interpolation } from "./interpolation/newton.js";
import { LinearSpline, QuadraticSpline } from "./interpolation/Spline.js";
import db from "./Database.js";


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(apiTracker);
app.use(requestTimeTracker)
app.use(requestTimeout(3000));

// app.use(diff);
app.use(roe);
app.use(linearEquation)
app.use(regression)
app.use(test)

app.get("/interpolation/:method/:id", (req, res) => {
    const { method, id } = req.params;
    db.query("select * from interpolation where id = ? and method = ?", [id, method], (err, result) => {
        if (err) {
            res.status(500).json(err)
            return
        } else {
            res.status(200).json(result);
        }
    })
})


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