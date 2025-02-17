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

const getAllPayment = async (search, page, limit) => {
  let skip = (page - 1) * limit;
  if (skip < 0) skip = 0;
  const searchQuery = {
    $or: [
      { "userInfo.name": { $regex: search, $options: "i" } },
      { "userInfo.email": { $regex: search, $options: "i" } },
      { "userInfo.phone": { $regex: search, $options: "i" } },
      { "courseInfo.courseName": { $regex: search, $options: "i" } },
      { "courseInfo.batch": { $regex: search, $options: "i" } },
      { "paymentInfo.method": { $regex: search, $options: "i" } },
      { "paymentInfo.transactionId": { $regex: search, $options: "i" } },
    ],
  };

  const payments = await Payment.find(searchQuery).limit(limit).skip(skip);

  const totalPayments = await Payment.countDocuments(searchQuery);

  const statusAggregation = await Payment.aggregate([
    { $match: searchQuery },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const statusCount = {};
  statusAggregation.forEach(({ _id, count }) => {
    statusCount[_id] = count;
  });

  const paymentMethodAggregation = await Payment.aggregate([
    { $match: searchQuery },
    { $group: { _id: "$paymentInfo.method", count: { $sum: 1 } } },
  ]);

  const paymentMethodCount = {};
  paymentMethodAggregation.forEach(({ _id, count }) => {
    paymentMethodCount[_id] = count;
  });

  return {
    payments,
    totalPayments,
    statusCount,
    paymentMethodCount,
  };
};

const PaymentServices = {
  createPayment,
  getAsinglePayment,
  deleteAPayment,
  updateAPayment,
  getAllPayment,
};
export default PaymentServices;
