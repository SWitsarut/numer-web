import express from "express"
import db from "../Database.js";

import { firstForward, firstBackward, firstCentral } from "../Differentiation/first.js";
import { secondBackward, secondCentral, secondForward } from "../Differentiation/second.js";

import { getRealValue } from "../Differentiation/realValue.js";

const router = express.Router();


router.get("/diff/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    db.query("select * from diff where id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err })
            return;
        }
        res.status(200).json(result);
    })
});

router.post("/diff/first", (req, res) => {
    const { method, question, x, h } = req.body;
    // console.log({ method, question, x, h })
    let answer;
    // console.log(firstForward(question, Number(x), Number(h)));
    if (method === "forward") {
        console.log("hello")
        answer = firstForward(question, Number(x), Number(h));
    } else if (method == "central") {
        answer = firstCentral(question, Number(x), Number(h));
    } else if (method == "backward") {
        answer = firstBackward(question, Number(x), Number(h));
    }
    console.log({ answer, derivative: 1 })
    res.status(200).json({ answer, derivative: 1 })

})

router.post("/diff/second", (req, res) => {
    const { method, question, x, h } = req.body;
    let answer;
    if (method === "forward") {
        answer = secondForward(question, Number(x), Number(h));
    } else if (method == "central") {
        answer = secondCentral(question, Number(x), Number(h));
    } else if (method == "backward") {
        answer = secondBackward(question, Number(x), Number(h));
    }
    res.status(200).json({ answer, derivative: 2 });
})

export default router;
