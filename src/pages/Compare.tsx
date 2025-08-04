import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Star, Heart, ShoppingCart } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

const Compare = () => {
  const [compareItems, setCompareItems] = React.useState([
    mockProducts[0], // Elegant Black Dress
    mockProducts[1], // Luxury White Blouse
    mockProducts[2]  // Premium Beige Coat
  ]);

  const removeItem = (id: string) => {
    setCompareItems(items => items.filter(item => item.id !== id));
  };

  const addItem = () => {
    // In a real app, this would open a product selection modal
    console.log('Add item to comparison');
  };

  const maxItems = 4;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Compare Products</h1>
          <p className="text-xl text-muted-foreground">
            Compare up to {maxItems} products side by side to find the perfect fit
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Product Cards */}
              {compareItems.map((product) => (
                <Card key={product.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removeItem(product.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  <CardHeader className="text-center">
                    <div className="aspect-square overflow-hidden rounded-lg mb-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Price */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">${product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Stock Status */}
                    <div className="text-center">
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
                      </Badge>
                    </div>

                    {/* Sizes */}
                    <div>
                      <h4 className="font-semibold mb-2">Available Sizes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.sizes.map((size) => (
                          <Badge key={size} variant="outline" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div>
                      <h4 className="font-semibold mb-2">Available Colors:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.colors.map((color) => (
                          <Badge key={color} variant="outline" className="text-xs">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Special Tags */}
                    <div className="flex flex-wrap gap-1">
                      {product.featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                      {product.onSale && (
                        <Badge variant="destructive">On Sale</Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Heart className="w-4 h-4 mr-2" />
                        Add to Wishlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add More Button */}
              {compareItems.length < maxItems && (
                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="flex items-center justify-center h-full min-h-[400px]">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={addItem}
                      className="h-auto py-8 px-8 flex-col space-y-2"
                    >
                      <Plus className="w-8 h-8" />
                      <span>Add Product</span>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Why Compare with Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Detailed Comparison</h3>
              <p className="text-muted-foreground">
                Compare all important features side by side
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Shopping</h3>
              <p className="text-muted-foreground">
                Add to cart directly from comparison view
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Save Favorites</h3>
              <p className="text-muted-foreground">
                Save products to wishlist for later
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;