import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Purchase =
  mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);

export default Purchase;
