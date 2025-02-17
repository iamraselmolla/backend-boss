import mongoose from "mongoose";
import catchAsyncFunction from "../../share/catchAsyncFunc.js";
import PaymentServices from "./payment.services.js";
import httpStatus from "http-status";

const createPayment = catchAsyncFunction(async (req, res, next) => {
  try {
    const result = await PaymentServices.createPayment(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAsinglePayment = catchAsyncFunction(async (req, res) => {
  try {
    const result = await PaymentServices.getAsinglePayment(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteAPayment = catchAsyncFunction(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Invalid payment id",
      });
    }
    const result = await PaymentServices.deleteAPayment(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateAPayment = catchAsyncFunction(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Invalid payment id",
      });
    }
    const result = await PaymentServices.updateAPayment(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const PaymentController = {
  createPayment,
  getAsinglePayment,
  deleteAPayment,
  updateAPayment,
};
export default PaymentController;
