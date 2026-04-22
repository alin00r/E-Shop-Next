import dbConnect from '../../../lib/mongodb';
import Purchase from '../../../models/Purchase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ message: 'Sign in to clear purchases.' });
    }

    const result = await Purchase.deleteMany({});
    return res.status(200).json({
      message: 'Purchased records cleared.',
      deletedCount: result.deletedCount || 0,
      totalAmount: 0,
      totalItems: 0,
    });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

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

  return res.status(200).json(summary);
}
