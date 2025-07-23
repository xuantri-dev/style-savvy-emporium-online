import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  className?: string;
  showDescription?: boolean;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className = '', 
  showDescription = false,
  viewMode = 'grid'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
    // Add to favorites logic here
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to wishlist logic here
  };

  if (viewMode === 'list') {
    return (
      <Link to={`/product/${product.id}`} className={`product-card ${className}`}>
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div className="flex gap-4">
              <div 
                className="relative w-48 h-64 overflow-hidden rounded-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {product.onSale && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    Sale
                  </Badge>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="bg-white/90 hover:bg-white h-8 w-8 border border-gray-200 shadow-sm"
                    onClick={handleFavoriteClick}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="bg-white/90 hover:bg-white h-8 w-8 border border-gray-200 shadow-sm"
                    onClick={handleWishlistClick}
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
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
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`} className={`product-card ${className}`}>
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div 
            className="relative overflow-hidden rounded-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.name}
              className="product-image transition-all duration-300"
            />
            {product.onSale && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                Sale
              </Badge>
            )}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-white/90 hover:bg-white border border-gray-200 shadow-sm"
                onClick={handleFavoriteClick}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-white/90 hover:bg-white border border-gray-200 shadow-sm"
                onClick={handleWishlistClick}
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
          <div className="pt-4">
            <h3 className="product-title mb-2">{product.name}</h3>
            {showDescription && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {product.description}
              </p>
            )}
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
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;