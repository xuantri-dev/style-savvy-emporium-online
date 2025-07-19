import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { mockProducts } from '@/data/mockData';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [recentSearches] = useState(['black dress', 'winter coat', 'silk blouse']);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  }, [query]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
    }
  }, [searchParams]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-light tracking-wide text-center mb-8">Search</h1>
          
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10 h-12 text-lg"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Recent Searches */}
        {!query && (
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-lg font-medium mb-4">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <Badge
                  key={search}
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-medium">
                {searchResults.length > 0 
                  ? `${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${query}"`
                  : `No results found for "${query}"`
                }
              </h2>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                    <Card className="border-0 shadow-none">
                      <CardContent className="p-0">
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
                        </div>
                        <div className="pt-4">
                          <h3 className="product-title mb-2">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="price-text">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  We couldn't find any products matching your search.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Try searching for:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['dresses', 'tops', 'outerwear', 'accessories'].map((suggestion) => (
                      <Badge
                        key={suggestion}
                        variant="outline"
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => handleSearch(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/shop">Browse All Products</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;