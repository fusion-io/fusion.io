import app from "./app";
import { Kernel } from "@fusion.io/proton";

export default (app.start().make<Kernel>(Kernel)).callback();
