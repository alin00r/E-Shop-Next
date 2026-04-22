import React from 'react';
import ProductsComponent from '../components/productsComponent';
import dbConnect from '../../lib/mongodb';
import Product from '../../models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';

const Products = ({ productsData, isAuthenticated }) => {
  return (
    <div>
      <ProductsComponent
        products={productsData}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default Products;

export async function getServerSideProps(context) {
  let data = [];
  const session = await getServerSession(context.req, context.res, authOptions);

  try {
    await dbConnect();
    let query = Product.find({}).sort({ createdAt: -1 });

    if (!session) {
      query = query.limit(4);
    }

    const products = await query.lean();
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
      isAuthenticated: Boolean(session),
      session,
    },
  };
}
