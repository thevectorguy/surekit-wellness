import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import shopRouter from "./shop.js";
import contactRouter from "./contact.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(shopRouter);
router.use(contactRouter);

export default router;
