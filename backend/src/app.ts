import express from "express";
import cors from "cors";
import authRoutes from "@/routes/auth.routes.js"

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

//
app.use("/api/auth", authRoutes);


export default app;