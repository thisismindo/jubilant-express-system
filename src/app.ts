import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import urlRoutes from "./routes/url.routes";
import { apiResponse } from "./libs/response";

dotenv.config();

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        next();
    } catch (err) {
        next(err);
    }
});

app.use("/users", userRoutes);
app.use("/urls", urlRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json(apiResponse(true, "Unanimous Express is running..."));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);
    res.status(500).json(apiResponse(false, "Internal Server Error"));
});

export default app;
