import app from './app.js';
import { databaseConnection } from './database/connection.js';
const PORT = process.env.PORT || 8000; 

databaseConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to db on ${PORT}`)
        })

    })
    .catch(() => {
        console.log("Can't connect the database", error)
     })
