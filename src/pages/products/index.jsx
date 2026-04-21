import React from 'react';
import ProductsComponent from '../components/productsComponent';
import dbConnect from '../../lib/mongodb';
import Product from '../../models/Product';

const Products = ({ productsData }) => {
  return (
    <div>
      <ProductsComponent products={productsData} />
    </div>
  );
};

export default Products;

export async function getStaticProps() {
  let data = [];

  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    data = products.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      thumbnail: item.thumbnail,
      stock: item.stock,
    }));
  } catch {
    data = [];
  }

  return {
    props: {
      productsData: data,
    },
    revalidate: 300,
  };
}
