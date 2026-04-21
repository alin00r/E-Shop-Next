import mongoose from 'mongoose';
import dbConnect from '../../../lib/mongodb';
import News from '../../../models/News';

function mapNewsArticle(article) {
  return {
    id: article._id.toString(),
    title: article.title,
    body: article.body,
    category: article.category,
    imageUrl: article.imageUrl,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
}

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid news id.' });
  }

  if (req.method === 'GET') {
    const article = await News.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'News article not found.' });
    }

    return res.status(200).json(mapNewsArticle(article));
  }

  if (req.method === 'PUT') {
    try {
      const update = {
        title: req.body?.title,
        body: req.body?.body,
        category: req.body?.category || 'general',
        imageUrl: req.body?.imageUrl || '',
      };

      const article = await News.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      });

      if (!article) {
        return res.status(404).json({ message: 'News article not found.' });
      }

      return res.status(200).json(mapNewsArticle(article));
    } catch (error) {
      return res.status(400).json({
        message: 'Could not update news article.',
        error,
      });
    }
  }

  if (req.method === 'DELETE') {
    const deleted = await News.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'News article not found.' });
    }

    return res.status(200).json({ message: 'News article deleted.', id });
  }

  return res.status(405).json({ message: 'Method not allowed.' });
}
