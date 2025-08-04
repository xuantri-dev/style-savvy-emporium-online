import React from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Star, Award } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

const BestSelling = () => {
  const [sortBy, setSortBy] = React.useState('sales');
  const [filterCategory, setFilterCategory] = React.useState('all');

  // Create best-selling products based on rating and reviews
  const bestSellingProducts = mockProducts
    .map(product => ({
      ...product,
      salesScore: product.rating * product.reviews, // Mock sales calculation
      totalSales: Math.floor(product.reviews * (product.rating / 5) * 50) // Mock sales number
    }))
    .sort((a, b) => b.salesScore - a.salesScore);

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  const filteredProducts = filterCategory === 'all' 
    ? bestSellingProducts 
    : bestSellingProducts.filter(p => p.category === filterCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'sales':
        return b.totalSales - a.totalSales;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return b.salesScore - a.salesScore;
    }
  });

  const topProduct = sortedProducts[0];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Best-Selling Products</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular items loved by thousands of customers
          </p>
        </div>

        {/* Best Seller Highlight */}
        {topProduct && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-primary mr-2" />
              <Badge className="text-lg px-4 py-2">
                #1 Best Seller
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-foreground mb-4">{topProduct.name}</h2>
                <p className="text-muted-foreground mb-4">{topProduct.description}</p>
                <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start mb-6">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{topProduct.rating}</span>
                    <span className="text-muted-foreground ml-1">({topProduct.reviews} reviews)</span>
                  </div>
                  <Badge variant="secondary">
                    {topProduct.totalSales} sold
                  </Badge>
                </div>
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <span className="text-3xl font-bold text-primary">${topProduct.price}</span>
                  {topProduct.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${topProduct.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <div className="max-w-md mx-auto">
                <ProductCard product={topProduct} />
              </div>
            </div>
          </div>
        )}

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.filter(cat => cat !== 'all').map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Best Selling</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviewed</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {sortedProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {index < 3 && (
                <Badge 
                  className="absolute top-2 left-2 z-10"
                  variant={index === 0 ? "default" : "secondary"}
                >
                  #{index + 1}
                </Badge>
              )}
              <ProductCard product={product} />
              <div className="mt-2 text-center">
                <Badge variant="outline" className="text-xs">
                  {product.totalSales} sold
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Why These Products Are Best-Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">High Customer Rating</h3>
              <p className="text-muted-foreground">
                Average rating of {(sortedProducts.reduce((sum, p) => sum + p.rating, 0) / sortedProducts.length).toFixed(1)}/5.0
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Proven Sales</h3>
              <p className="text-muted-foreground">
                Over {sortedProducts.reduce((sum, p) => sum + p.totalSales, 0).toLocaleString()} units sold
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">
                Backed by {sortedProducts.reduce((sum, p) => sum + p.reviews, 0).toLocaleString()} customer reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BestSelling;