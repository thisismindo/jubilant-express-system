import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import urlRoutes from "./routes/url.routes";
import { apiResponse } from "./libs/response";
import cors, { CorsOptions } from "cors";

dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        const allowedOrigins = [
            "http://localhost"
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Accept-Language",
        "Accept-Encoding",
        "Connection"
    ],
    credentials: true,
};

app.use(cors<Request>(corsOptions));

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
