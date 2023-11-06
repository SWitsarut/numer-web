import express from "express"
import db from "../Database.js";

import { Cramer } from "../AXB/Cramer.js";
import { gauss_jordan } from "../AXB/gauss-jordan.js";
import { gauss } from "../AXB/gauss.js";
import gauss_seidel from "../AXB/Gauss-seidel.js";
import LU from "../AXB/LUdecomposition.js";
import { Jacobi } from "../AXB/Jacobi.js";


const router = express.Router();

router.get("/linearEquation/:method/:id", (req, res) => {
    const { id, method } = req.params;
    db.query("SELECT * FROM `linear-equation` WHERE `method` = ? AND `id` = ?", [method, id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: "Internal Server Error" })
        } else {
            const [question] = result;
            res.status(200).json(question);
        }

    })
})

router.post("/cramer", (req, res) => {
    const { A, B } = req.body;
    const x = Cramer(A, B);
    res.status(200).json(x);
})

router.post("/gauss", (req, res) => {
    const { A, B } = req.body;
    const x = gauss(A, B);
    res.status(200).json(x);
})

router.post("/gauss-jordan", (req, res) => {
    const { A, B } = req.body;
    const x = gauss_jordan(A, B);
    res.status(200).json(x);
})

router.post("/inversion", (req, res) => {
    const { A, B } = req.body;
    const x = gauss_jordan(A, B);
    res.status(200).json(x);
})

router.post("/gauss-seidel", (req, res) => {
    const { A, B } = req.body;
    const x = gauss_seidel(A, B);
    res.status(200).json(x);
})

router.post("/lu-decomposition", (req, res) => {
    const { A, B } = req.body;
    const x = LU(A, B);
    res.status(200).json(x);
})

router.post("/jacobi", (req, res) => {
    const { A, B } = req.body;
    const x = Jacobi(A, B);
    res.status(200).json(x);
})


export default router;