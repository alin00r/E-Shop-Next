import mongoose from 'mongoose';
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';

function mapProduct(product) {
  return {
    id: product._id.toString(),
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    thumbnail: product.thumbnail,
    stock: product.stock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product id.' });
  }

  if (req.method === 'GET') {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json(mapProduct(product));
  }

  if (req.method === 'PUT') {
    try {
      const update = {
        title: req.body?.title,
        price: Number(req.body?.price),
        category: req.body?.category,
        description: req.body?.description,
        thumbnail: req.body?.thumbnail || '',
        stock: Number(req.body?.stock || 0),
      };

      const product = await Product.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      return res.status(200).json(mapProduct(product));
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Could not update product.', error });
    }
  }

  if (req.method === 'DELETE') {
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json({ message: 'Product deleted.', id });
  }

  return res.status(405).json({ message: 'Method not allowed.' });
}
