import { registerPassportMw } from "./passport.js";
import cors from 'cors';
import bodyParser from "body-parser";

export function registerMiddleware(app) {
  app.use(cors());
  app.use(bodyParser.json());
  registerPassportMw();
}