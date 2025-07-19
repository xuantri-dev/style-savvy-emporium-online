import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { mockProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Wishlist = () => {
  const { toast } = useToast();
  // Mock wishlist items - in real app, this would come from state/API
  const [wishlistItems, setWishlistItems] = useState([
    mockProducts[0], // Elegant Black Dress
    mockProducts[2], // Premium Beige Coat
  ]);

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
    toast({
      title: 'Removed from wishlist',
      description: 'Item has been removed from your wishlist.',
    });
  };

  const addToCart = (productId: string) => {
    toast({
      title: 'Added to cart',
      description: 'Item has been added to your cart.',
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-light mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Save items you love for later by clicking the heart icon.
            </p>
            <Button asChild>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light tracking-wide">My Wishlist</h1>
          <Badge variant="outline" className="text-sm">
            {wishlistItems.length} items
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((product) => (
            <Card key={product.id} className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="relative group">
                  <Link to={`/product/${product.id}`}>
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
                  </Link>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-destructive"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pt-4 space-y-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="product-title hover-underline">{product.name}</h3>
                  </Link>
                  
                  <div className="flex items-center gap-2">
                    <span className="price-text">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center space-y-4">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              wishlistItems.forEach(product => addToCart(product.id));
              toast({
                title: 'All items added to cart',
                description: 'All wishlist items have been added to your cart.',
              });
            }}
          >
            Add All to Cart
          </Button>
          <div>
            <Button asChild variant="link">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;