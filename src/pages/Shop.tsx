import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
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
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
                : 'space-y-8'
            }>
              {paginatedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewMode={viewMode}
                  showDescription={viewMode === 'list'}
                />
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