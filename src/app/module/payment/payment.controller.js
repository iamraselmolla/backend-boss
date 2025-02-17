import catchAsyncFunction from "../../share/catchAsyncFunc.js";
import PaymentServices from "./payment.services.js";
import httpStatus from "http-status";

const createPayment = catchAsyncFunction(async (req, res, next) => {
  const result = await PaymentServices.createPayment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment created successfully",
    data: result,
  });
});

const PaymentController = { createPayment };
export default PaymentController;
