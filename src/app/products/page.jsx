import fs from 'fs/promises';
import path from 'path';
import ProductsComponent from '../../components/productsComponent';

export const revalidate = 60;

const ProductsPage = async () => {
  let productsData = [];

  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    const file = await fs.readFile(dbPath, 'utf8');
    const parsed = JSON.parse(file);
    productsData = Array.isArray(parsed?.products) ? parsed.products : [];
  } catch {
    productsData = [];
  }

  return <ProductsComponent products={productsData} />;
};

export default ProductsPage;
