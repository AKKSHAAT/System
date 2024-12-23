import express from "express";
import cors from 'cors';
import sequelize from "./database/db.js";


import userRoutes from './routes/userRoutes.js';
const app = express();

app.use(express.json())
app.use(cors());
app.use('/api/user', userRoutes);
const PORT = 5000;


sequelize.sync({ force: true }).then(async () => {
    console.log("DB connected");
});


app.get("/", (req, res)=>{
    res.send("on");
});

app.listen(PORT, ()=>{
    console.log("on PORT: ", PORT);
});