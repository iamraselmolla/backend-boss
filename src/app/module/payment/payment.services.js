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

const PaymentServices = { createPayment, getAsinglePayment, deleteAPayment };
export default PaymentServices;
