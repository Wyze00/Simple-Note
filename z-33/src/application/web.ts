import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicApi } from "../router/public";
import { privateAPI } from "../router/private";
import cors from 'cors';

export const web = express();

web.use(cors());

web.use(express.json());

web.use(publicApi);
web.use(privateAPI);

web.use(errorMiddleware);