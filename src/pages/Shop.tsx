import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Layout from '@/components/Layout';
import { mockProducts, mockCategories } from '@/data/mockData';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const categoryFilter = searchParams.get('category');
  const PRODUCTS_PER_PAGE = 9;
  
  const { filteredProducts, paginatedProducts, totalPages } = useMemo(() => {
    let products = [...mockProducts];
    
    // Filter by category
    if (categoryFilter) {
      products = products.filter(product => product.category === categoryFilter);
    }
    
    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      products = products.filter(product => 
        product.price >= min && (max ? product.price <= max : true)
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured products first
        products.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    
    // Pagination
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
    
    return {
      filteredProducts: products,
      paginatedProducts,
      totalPages
    };
  }, [categoryFilter, sortBy, priceRange, currentPage]);

  const currentCategory = categoryFilter 
    ? mockCategories.find(cat => cat.id === categoryFilter) 
    : null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-heading mb-4">
            {currentCategory ? currentCategory.name : 'All Products'}
          </h1>
          <p className="text-muted-foreground">
            {currentCategory 
              ? currentCategory.description 
              : 'Discover our complete collection of premium fashion pieces'
            }
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="lg:w-64 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                <Link 
                  to="/shop" 
                  className={`block text-sm py-2 px-3 rounded hover:bg-muted transition-colors ${
                    !categoryFilter ? 'bg-muted font-medium' : ''
                  }`}
                >
                  All Products
                </Link>
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/shop?category=${category.id}`}
                    className={`block text-sm py-2 px-3 rounded hover:bg-muted transition-colors ${
                      categoryFilter === category.id ? 'bg-muted font-medium' : ''
                    }`}
                  >
                    {category.name} ({category.productCount})
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-100">Under $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200-300">$200 - $300</SelectItem>
                  <SelectItem value="300">Over $300</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found • Page {currentPage} of {totalPages}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }>
              {paginatedProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-0">
                      {viewMode === 'grid' ? (
                        <>
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="product-image"
                            />
                            {product.onSale && (
                              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                                Sale
                              </Badge>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                              onClick={(e) => {
                                e.preventDefault();
                                // Add to wishlist logic
                              }}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="pt-4">
                            <h3 className="product-title mb-2">{product.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-rose-gold text-rose-gold" />
                                <span className="text-sm text-muted-foreground ml-1">
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="price-text">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-4">
                          <div className="relative w-48 h-64 overflow-hidden rounded-lg">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 py-2">
                            <h3 className="product-title mb-2">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-rose-gold text-rose-gold" />
                                <span className="text-sm text-muted-foreground ml-1">
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="price-text">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={page === currentPage}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;