import * as sqlite3 from "sqlite3"
const DBSOURCE = ":memory:"

let db = new sqlite3.Database(DBSOURCE, (err: any) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        const sqlCreate =
            `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
            "created_at" datetime NOT NULL DEFAULT (datetime('now')), 
            "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
             "email" varchar NOT NULL, "password" varchar NOT NULL, 
             "token" varchar NOT NULL DEFAULT (0),
            CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`;
        db.run(sqlCreate, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful creation of the 'users' table");
        });
    }
})
export default db