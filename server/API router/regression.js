import { Router } from "express"
import db from "../Database.js"
import { Least_Square_Multiple, Least_Square_Polynomial } from "../Regression/Least-square.js";
const router = Router();

router.get("/regression/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM regression WHERE id = (
        SELECT MAX(id)
        FROM regression
        WHERE id <= ?
    )
    AND id >= 1;`, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" })
        }
        res.status(200).json(result);
    })
});

router.get("/mul-regression/:id", (req, res) => {
    const { id } = req.params;
    db.query(
        //     `SELECT * FROM "mul-regression" WHERE id = (
        //     SELECT MAX(id)
        //     FROM "mul-regression"
        //     WHERE id <= ?
        // )
        // AND id >= 1; `
        "SELECT * FROM `mul-regression` WHERE `id` = ? OR `id` = (SELECT `id` FROM `mul-regression` ORDER BY ABS(`id` - ?) LIMIT 1);"
        // "SELECT * FROM `mul-regression` WHERE `id` = ?"
        , [id, id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err })
            }
            res.status(200).json(result);
        })
})

router.post("/regression", (req, res) => {
    const { m, x, y, targetX } = req.body;
    const answer = Least_Square_Polynomial(m, x, y, targetX);
    res.status(200).json({ answer, targetX })
    // res.status(500).json({ error: "Internal Server Error" })
})


router.post("/mul-regression", (req, res) => {
    const { x, y, targetX } = req.body;
    const answer = Least_Square_Multiple(x, y, targetX);
    res.status(200).json({ answer, targetX })
})


export default router;