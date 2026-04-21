import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      default: '',
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
