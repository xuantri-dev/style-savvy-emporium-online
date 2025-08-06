import React from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { getProductsByCategory } from '@/data/mockData';

const Outerwear = () => {
  const [sortBy, setSortBy] = React.useState('featured');
  const [priceRange, setPriceRange] = React.useState([0, 600]);
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 9;

  const outerwearProducts = getProductsByCategory('outerwear');
  
  // Get all available sizes and colors
  const allSizes = [...new Set(outerwearProducts.flatMap(p => p.sizes))];
  const allColors = [...new Set(outerwearProducts.flatMap(p => p.colors))];

  // Filter products
  const filteredProducts = outerwearProducts.filter(product => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size));
    const colorMatch = selectedColors.length === 0 || selectedColors.some(color => product.colors.includes(color));
    return priceMatch && sizeMatch && colorMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      case 'featured':
      default:
        return Number(b.featured) - Number(a.featured);
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, priceRange, selectedSizes, selectedColors]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 600]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Outerwear Collection</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay stylish and warm with our premium collection of coats, jackets, and outerwear
          </p>
          <Badge variant="secondary" className="mt-4">
            {outerwearProducts.length} products available
          </Badge>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-muted rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={600}
                  step={20}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <Button
                      key={size}
                      variant={selectedSizes.includes(size) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {allColors.map(color => (
                    <Button
                      key={color}
                      variant={selectedColors.includes(color) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <p className="text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} of {sortedProducts.length} products
                </p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mb-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setCurrentPage(Math.max(1, currentPage - 1)); }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setCurrentPage(Math.min(totalPages, currentPage + 1)); }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            {/* No Products Message */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No outerwear found matching your filters.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>

        {/* Category Features */}
        <div className="mt-16 bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Outerwear for Every Season</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧥</span>
              </div>
              <h3 className="font-semibold mb-2">Winter Coats</h3>
              <p className="text-muted-foreground">
                Luxurious wool and down coats for ultimate warmth
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌧️</span>
              </div>
              <h3 className="font-semibold mb-2">Rain Jackets</h3>
              <p className="text-muted-foreground">
                Water-resistant and stylish protection from the elements
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍂</span>
              </div>
              <h3 className="font-semibold mb-2">Light Jackets</h3>
              <p className="text-muted-foreground">
                Perfect transitional pieces for spring and fall
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Outerwear;