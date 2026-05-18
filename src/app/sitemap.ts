import { MetadataRoute } from 'next';
import productsData from '@/data/products.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://finds.consultways.com';

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = productsData.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Dynamic product routes (All 18 products!)
  const productRoutes: MetadataRoute.Sitemap = productsData.flatMap((category) =>
    category.products.map((product) => ({
      url: `${baseUrl}/product/${product.asin}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  );

  return [...routes, ...categoryRoutes, ...productRoutes];
}
