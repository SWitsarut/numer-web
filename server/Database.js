import mysql2 from "mysql2";

const db = mysql2.createConnection({
    host: "localhost",
    user: "numerical",
    database: "numerical-method",
    password: "S3XY-numerDB"
})

export default db
