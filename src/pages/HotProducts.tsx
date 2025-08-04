import React from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flame, Clock, Zap, Eye } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

const HotProducts = () => {
  const [sortBy, setSortBy] = React.useState('trending');
  const [filterCategory, setFilterCategory] = React.useState('all');

  // Create hot products with trending scores
  const hotProducts = mockProducts
    .map(product => {
      const trendingScore = (product.rating * 20) + (product.reviews / 10) + (product.onSale ? 30 : 0) + (product.featured ? 25 : 0);
      const viewsToday = Math.floor(Math.random() * 500) + 100; // Mock views
      const addedToCartToday = Math.floor(Math.random() * 50) + 10; // Mock cart additions
      
      return {
        ...product,
        trendingScore,
        viewsToday,
        addedToCartToday,
        hotLevel: trendingScore > 180 ? 'fire' : trendingScore > 150 ? 'hot' : 'warm'
      };
    })
    .sort((a, b) => b.trendingScore - a.trendingScore);

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  const filteredProducts = filterCategory === 'all' 
    ? hotProducts 
    : hotProducts.filter(p => p.category === filterCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.trendingScore - a.trendingScore;
      case 'views':
        return b.viewsToday - a.viewsToday;
      case 'cart-adds':
        return b.addedToCartToday - a.addedToCartToday;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id); // Mock newest by ID
      default:
        return b.trendingScore - a.trendingScore;
    }
  });

  const getHotIcon = (level: string) => {
    switch (level) {
      case 'fire':
        return <Flame className="w-4 h-4 text-red-500" />;
      case 'hot':
        return <Zap className="w-4 h-4 text-orange-500" />;
      default:
        return <Eye className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getHotBadgeVariant = (level: string) => {
    switch (level) {
      case 'fire':
        return 'destructive';
      case 'hot':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flame className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Hot Products</h1>
            <Flame className="w-8 h-8 text-red-500 ml-3" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trending now! These products are flying off our virtual shelves
          </p>
        </div>

        {/* Hot Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-6 text-center">
            <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {hotProducts.filter(p => p.hotLevel === 'fire').length}
            </div>
            <div className="text-sm text-muted-foreground">On Fire</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg p-6 text-center">
            <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {hotProducts.filter(p => p.hotLevel === 'hot').length}
            </div>
            <div className="text-sm text-muted-foreground">Hot Items</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 rounded-lg p-6 text-center">
            <Eye className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {hotProducts.reduce((sum, p) => sum + p.viewsToday, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Views Today</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {hotProducts.reduce((sum, p) => sum + p.addedToCartToday, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Added to Cart</div>
          </div>
        </div>

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
              <SelectItem value="trending">Most Trending</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
              <SelectItem value="cart-adds">Most Added to Cart</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {sortedProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {/* Hot Level Badge */}
              <Badge 
                className="absolute top-2 left-2 z-10 flex items-center gap-1"
                variant={getHotBadgeVariant(product.hotLevel)}
              >
                {getHotIcon(product.hotLevel)}
                {product.hotLevel === 'fire' ? 'On Fire!' : 
                 product.hotLevel === 'hot' ? 'Hot!' : 'Trending'}
              </Badge>
              
              {/* Ranking Badge for top 3 */}
              {index < 3 && (
                <Badge className="absolute top-2 right-2 z-10 bg-yellow-500">
                  #{index + 1}
                </Badge>
              )}
              
              <ProductCard product={product} />
              
              {/* Hot Stats */}
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {product.viewsToday} views today
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {product.addedToCartToday} added to cart
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      product.hotLevel === 'fire' ? 'bg-red-500' :
                      product.hotLevel === 'hot' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min(product.trendingScore / 2, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hot Categories */}
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Hottest Categories Right Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.filter(cat => cat !== 'all').map((category) => {
              const categoryProducts = hotProducts.filter(p => p.category === category);
              const avgTrending = categoryProducts.reduce((sum, p) => sum + p.trendingScore, 0) / categoryProducts.length;
              
              return (
                <div key={category} className="text-center p-4 bg-background rounded-lg">
                  <h3 className="font-semibold mb-2 capitalize">{category}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {avgTrending > 180 ? <Flame className="w-5 h-5 text-red-500" /> :
                     avgTrending > 150 ? <Zap className="w-5 h-5 text-orange-500" /> :
                     <Eye className="w-5 h-5 text-yellow-500" />}
                    <span className="text-sm font-medium">
                      {avgTrending > 180 ? 'On Fire' :
                       avgTrending > 150 ? 'Hot' : 'Trending'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {categoryProducts.length} hot products
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setFilterCategory(category)}>
                    Explore {category}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HotProducts;