import express from "express";

const PaymentRouter = express.Router();

import PaymentController from "./payment.controller.js";

PaymentRouter.post("/", PaymentController.createPayment);

export default PaymentRouter;
