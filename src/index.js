import dotenv from "dotenv"
import {app} from "./app.js" 
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config({
    path: './.env'
})



// Pool()
//     .then(() => {
//         app.listen(process.env.PORT || 8000, () => {
//             console.log(`Server is running at port : ${process.env.PORT || 8000}`);
//         });
//     })
//     .catch((err) => {
//         console.error("Database connection failed:", err);
//     });

