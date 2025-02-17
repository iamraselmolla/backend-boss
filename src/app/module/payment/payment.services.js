import Payment from "./payment.model.js";

const createPayment = async (paymentData) => {
  return await Payment.create(paymentData);
};

const PaymentServices = { createPayment };
export default PaymentServices;
