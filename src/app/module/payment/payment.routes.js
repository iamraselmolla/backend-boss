import express from "express";

const PaymentRouter = express.Router();

import PaymentController from "./payment.controller.js";

PaymentRouter.post("/", PaymentController.createPayment);

PaymentRouter.get("/:id", PaymentController.getAsinglePayment);

PaymentRouter.delete("/:id", PaymentController.deleteAPayment);

export default PaymentRouter;
