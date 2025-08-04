import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Tag, Gift, Percent } from 'lucide-react';

const promotions = [
  {
    id: 1,
    title: "Spring Sale",
    description: "Up to 50% off on all spring collection items",
    discount: "50%",
    code: "SPRING50",
    expiryDate: "2024-04-30",
    category: "Seasonal",
    minOrder: 100,
    image: "/src/assets/hero-fashion.jpg",
    active: true
  },
  {
    id: 2,
    title: "New Customer Offer",
    description: "Get 20% off on your first purchase",
    discount: "20%",
    code: "WELCOME20",
    expiryDate: "2024-12-31",
    category: "Welcome",
    minOrder: 50,
    image: "/src/assets/product-dress-1.jpg",
    active: true
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "Free shipping on orders over $75",
    discount: "Free Shipping",
    code: "FREESHIP75",
    expiryDate: "2024-05-15",
    category: "Shipping",
    minOrder: 75,
    image: "/src/assets/product-blouse-1.jpg",
    active: true
  },
  {
    id: 4,
    title: "VIP Member Exclusive",
    description: "Exclusive 30% discount for VIP members",
    discount: "30%",
    code: "VIP30",
    expiryDate: "2024-06-30",
    category: "VIP",
    minOrder: 150,
    image: "/src/assets/product-coat-1.jpg",
    active: true
  },
  {
    id: 5,
    title: "Weekend Flash Sale",
    description: "Limited time 40% off selected items",
    discount: "40%",
    code: "FLASH40",
    expiryDate: "2024-03-17",
    category: "Flash Sale",
    minOrder: 80,
    image: "/src/assets/hero-fashion.jpg",
    active: false
  },
  {
    id: 6,
    title: "Buy 2 Get 1 Free",
    description: "Buy any 2 items and get the 3rd one free",
    discount: "Buy 2 Get 1",
    code: "BUY2GET1",
    expiryDate: "2024-04-15",
    category: "Bundle",
    minOrder: 0,
    image: "/src/assets/product-dress-1.jpg",
    active: true
  }
];

const Promotion = () => {
  const [filter, setFilter] = React.useState("All");
  const categories = ["All", ...new Set(promotions.map(p => p.category))];

  const filteredPromotions = filter === "All" 
    ? promotions.filter(p => p.active)
    : promotions.filter(p => p.category === filter && p.active);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // In a real app, show a toast notification
    console.log(`Copied code: ${code}`);
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    return expiry < now;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Special Promotions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing deals and exclusive offers on your favorite fashion items
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPromotions.map((promotion) => (
            <Card key={promotion.id} className="group hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              {isExpiringSoon(promotion.expiryDate) && (
                <Badge className="absolute top-4 right-4 z-10 bg-orange-500">
                  Expiring Soon
                </Badge>
              )}
              {isExpired(promotion.expiryDate) && (
                <Badge className="absolute top-4 right-4 z-10" variant="destructive">
                  Expired
                </Badge>
              )}
              
              <div className="aspect-video overflow-hidden">
                <img
                  src={promotion.image}
                  alt={promotion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{promotion.category}</Badge>
                  <div className="flex items-center text-primary font-bold text-lg">
                    <Percent className="w-4 h-4 mr-1" />
                    {promotion.discount}
                  </div>
                </div>
                <CardTitle>{promotion.title}</CardTitle>
                <CardDescription>{promotion.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Promo Code */}
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Promo Code</p>
                        <p className="font-mono font-bold text-lg">{promotion.code}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyCode(promotion.code)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Expires: {new Date(promotion.expiryDate).toLocaleDateString()}</span>
                    </div>
                    {promotion.minOrder > 0 && (
                      <div className="flex items-center text-muted-foreground">
                        <Tag className="w-4 h-4 mr-2" />
                        <span>Minimum order: ${promotion.minOrder}</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={isExpired(promotion.expiryDate)}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    {isExpired(promotion.expiryDate) ? 'Expired' : 'Shop Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Promotion Features */}
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">How to Use Promotions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Copy the Code</h3>
              <p className="text-muted-foreground">
                Click the copy button to get your promo code
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Shop Products</h3>
              <p className="text-muted-foreground">
                Add items to your cart and proceed to checkout
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Percent className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Apply & Save</h3>
              <p className="text-muted-foreground">
                Enter the code at checkout to get your discount
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Promotion;