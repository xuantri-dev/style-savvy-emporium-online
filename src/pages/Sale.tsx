import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { getSaleProducts } from '@/data/mockData';

const Sale = () => {
  const saleProducts = getSaleProducts();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="brand-heading mb-4 text-primary">SALE</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive sale collection featuring premium pieces at exceptional prices. 
            Limited time offers on selected items.
          </p>
        </div>

        {/* Sale Banner */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-4">
            UP TO 40% OFF SELECTED ITEMS
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Enjoy significant savings on our curated collection of fashion essentials
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="secondary" className="text-lg px-6 py-2">
              Free Shipping on Sale Orders
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-2">
              Extended Returns
            </Badge>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {saleProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="product-image"
                    />
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      SALE
                    </Badge>
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
                      <span className="price-text text-destructive">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.originalPrice && (
                        <Badge variant="outline" className="ml-auto">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {saleProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No sale items available at the moment.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/shop">Browse All Products</Link>
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-light tracking-wide mb-4">Don't Miss Out</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sale items are available while supplies last. Shop now to secure your favorite pieces 
            at these exclusive prices.
          </p>
          <Button asChild size="lg">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Sale;