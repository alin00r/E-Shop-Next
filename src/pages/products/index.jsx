import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import ProductsComponent from '../components/productsComponent';

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
    const dbPath = path.join(process.cwd(), 'db.json');
    const file = await fs.readFile(dbPath, 'utf8');
    const parsed = JSON.parse(file);
    data = Array.isArray(parsed?.products) ? parsed.products : [];
  } catch {
    data = [];
  }

  return {
    props: {
      productsData: data,
    },
    revalidate: 60,
  };
}
