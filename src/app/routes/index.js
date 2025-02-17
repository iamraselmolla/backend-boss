import express from "express";
import PaymentRouter from "../module/payment/payment.routes.js";

const router = express.Router();

const routerArr = [
  {
    path: "/payment",
    router: PaymentRouter,
  },
];

routerArr.forEach((singleRouter) =>
  router.use(singleRouter.path, singleRouter.router)
);

export default router;
