import app from './app.js';
import { databaseConnection } from './database/connection.js';
const PORT = process.env.PORT || 8000;

databaseConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Can't connect to the database:", error);
        process.exit(1); // Exit the process with a failure code
    });
