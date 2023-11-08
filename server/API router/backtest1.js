import { Router } from "express"
import db from "../Database.js";
import { secondCentral } from "../Differentiation/second.js";

const router = Router();

router.get("/test1/:id", (req, res) => {
    const { id } = req.params;
    db.query("select * from diff where id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    })
})

router.post("/test1", (req, res) => {
    const { question, x, h } = req.body;
    const answer = secondCentral(question, x, h);
    res.status(200).json(answer);
})

export default router