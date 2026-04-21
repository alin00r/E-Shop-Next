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

  if (req.method === 'GET') {
    const articles = await News.find({}).sort({ createdAt: -1 });
    return res.status(200).json(articles.map(mapNewsArticle));
  }

  if (req.method === 'POST') {
    try {
      const payload = {
        title: req.body?.title,
        body: req.body?.body,
        category: req.body?.category || 'general',
        imageUrl: req.body?.imageUrl || '',
      };

      const created = await News.create(payload);
      return res.status(201).json(mapNewsArticle(created));
    } catch (error) {
      return res.status(400).json({
        message: 'Could not create news article.',
        error,
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed.' });
}
