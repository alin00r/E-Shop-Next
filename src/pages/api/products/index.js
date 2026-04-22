import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

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
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    let query = Product.find({}).sort({ createdAt: -1 });

    if (!session) {
      query = query.limit(4);
    }

    const products = await query;
    return res.status(200).json(products.map(mapProduct));
  }

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ message: 'Sign in to create products.' });
    }

    try {
      const payload = {
        title: req.body?.title,
        price: Number(req.body?.price),
        category: req.body?.category,
        description: req.body?.description,
        thumbnail: req.body?.thumbnail || '',
        stock: Number(req.body?.stock || 0),
      };

      const created = await Product.create(payload);
      return res.status(201).json(mapProduct(created));
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Could not create product.', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed.' });
}
