import express from 'express';

import Bisection from "./../root of equation/Bisection.js";
import Graphical from "../root of equation/Graphical.js";
import OnePoint from "../root of equation/One-point.js";
import newtonRaphson from "../root of equation/newton-raphson.js";
import Secant from "../root of equation/Secant.js";
import db from '../Database.js';

const router = express.Router();

router.get("/graphical/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT *
    FROM graphical
    WHERE id = (
        SELECT MAX(id)
        FROM graphical
        WHERE id <= ?
    )
    AND id >= 1;
    `, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" })
        }
        const [question] = result;
        res.status(200).json(question);

    })
})

router.post("/graphical", (req, res) => {
    const { question, xl, xr } = req.body;
    const response = Graphical(question, Number(xl), Number(xr))
    res.status(200).json(response);
})


router.get("/bisection/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT *
    FROM bisection
    WHERE id = (
        SELECT MAX(id)
        FROM bisection
        WHERE id <= ?
    )
    AND id >= 1;
    `, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" })
        }
        const [question] = result;
        res.status(200).json(question);

    })
})


router.post("/bisection", (req, res) => {
    const { question, xl, xr } = req.body;
    const response = Bisection(question, Number(xl), Number(xr))
    res.status(200).json(response);
})



router.get("/onepoint/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT *
    FROM onepoint
    WHERE id = (
        SELECT MAX(id)
        FROM onepoint
        WHERE id <= ?
    )
    AND id >= 1;
    `, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" })
        }
        const [question] = result;
        res.status(200).json(question);
    })
})

router.post("/onepoint", (req, res) => {
    const { question, x0 } = req.body;
    const response = OnePoint(question, Number(x0));
    res.status(200).json(response);
})


router.get("/newton-raphson/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT *
    FROM newton-raphson
    WHERE id = (
        SELECT MAX(id)
        FROM newton-raphson
        WHERE id <= ?
    )
    AND id >= 1;
    `, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" })
        }
        const [question] = result;
        res.status(200).json(question);

    })
})

router.post("/newton-raphson", (req, res) => {
    const { question, x0 } = req.body;
    const response = newtonRaphson(question, Number(x0));
    res.status(200).json(response);
})

router.get("/secant/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT *
    FROM secant
    WHERE id = (
        SELECT MAX(id)
        FROM secant
        WHERE id <= ?
    )
    AND id >= 1;
    `, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" })
        }
        const [question] = result;
        res.status(200).json(question);

    })
})

router.post("/secant", (req, res) => {
    const { question, x0, x1 } = req.body;
    const response = Secant(question, Number(x0), Number(x1));
    res.status(200).json(response);
})

export default router;