import express from "express";
import cors from "cors";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//health-check
app.get("/", (_req, res) => {
    res.json({
        message: "API is working !"
    })
});

export default app;