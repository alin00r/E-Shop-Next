import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'general',
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;
