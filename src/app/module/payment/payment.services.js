import Payment from "./payment.model.js";

const createPayment = async (paymentData) => {
  return await Payment.create(paymentData);
};
const getAsinglePayment = async (id) => {
  return await Payment.findById(id);
};

const deleteAPayment = async (id) => {
  return await Payment.findByIdAndDelete(id);
};

const updateAPayment = async (id, status) => {
  const result = await Payment.findById(id);
  if (!result) {
    throw new Error("Payment not found");
  }
  if (result.status === "Received") {
    throw new Error("Payment already received");
  }
  result.status = status;
  return await result.save({
    validateBeforeSave: true,
    runValidators: true,
  });
};

const PaymentServices = {
  createPayment,
  getAsinglePayment,
  deleteAPayment,
  updateAPayment,
};
export default PaymentServices;
