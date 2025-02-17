const paymentSchema = new mongoose.Schema({
  userInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  courseInfo: {
    courseName: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    courseFee: {
      type: String,
      required: true,
    },
  },
  paymentInfo: {
    method: {
      type: String,
      required: true,
      enum: ["Bkash", "Rocket", "Nagad", "Bank Transfer"],
      default: "Bkash",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    installment: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    trasactionId: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Received", "Cancelled"],
    default: "Pending",
  },
  note: {
    type: String,
    trim: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
