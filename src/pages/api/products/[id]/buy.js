import mongoose from 'mongoose';
import dbConnect from '../../../../lib/mongodb';
import Product from '../../../../models/Product';
import Purchase from '../../../../models/Purchase';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product id.' });
  }

  const quantity = Math.max(1, Number(req.body?.quantity || 1));

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  const totalPrice = product.price * quantity;

  await Purchase.create({
    productId: product._id,
    title: product.title,
    quantity,
    unitPrice: product.price,
    totalPrice,
  });

  const totals = await Purchase.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$totalPrice' },
        totalItems: { $sum: '$quantity' },
      },
    },
  ]);

  const summary = totals[0] || { totalAmount: 0, totalItems: 0 };

  return res.status(200).json({
    message: 'Product purchased successfully.',
    lineTotal: totalPrice,
    totalAmount: summary.totalAmount,
    totalItems: summary.totalItems,
  });
}
