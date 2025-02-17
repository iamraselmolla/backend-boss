import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, "Invalid email format"],
      },
      phone: {
        type: String,
        required: true,
        // match: [/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"],
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
        type: Number,
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
        enum: ["Pending", "Completed", "Failed"],
      },
      installment: {
        type: Number,
        required: true,
      },
      paymentDate: {
        type: Date,
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
        unique: true,
      },
      receipt: {
        type: String,
        trim: true,
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
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
