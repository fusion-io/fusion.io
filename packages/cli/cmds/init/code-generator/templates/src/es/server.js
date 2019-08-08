import { Kernel } from "@fusion.io/proton";
import app from "./app";

export default (app.start().make(Kernel)).callback();
