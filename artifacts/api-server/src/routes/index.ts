import { Router, type IRouter } from "express";
import healthRouter from "./health";
import shopRouter from "./shop";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(shopRouter);
router.use(contactRouter);

export default router;
