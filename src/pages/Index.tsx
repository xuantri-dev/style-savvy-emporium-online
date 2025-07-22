import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, getSaleProducts } from '@/data/mockData';
import heroImage from '@/assets/hero-fashion.jpg';
import productDress from '@/assets/product-dress-1.jpg';
import productBlouse from '@/assets/product-blouse-1.jpg';
import productCoat from '@/assets/product-coat-1.jpg';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const saleProducts = getSaleProducts();

  const bannerSlides = [
    {
      image: heroImage,
      title: "SOPHISTICATED FASHION",
      subtitle: "Discover timeless elegance with our curated collection of premium fashion pieces",
      primaryButton: { text: "Explore Collection", link: "/shop" },
      secondaryButton: { text: "Shop Sale", link: "/sale" }
    },
    {
      image: productDress,
      title: "NEW ARRIVALS",
      subtitle: "Fresh styles just landed. Be the first to discover our latest pieces",
      primaryButton: { text: "Shop New", link: "/shop" },
      secondaryButton: { text: "View All", link: "/shop" }
    },
    {
      image: productCoat,
      title: "WINTER COLLECTION",
      subtitle: "Stay warm and stylish with our premium outerwear collection",
      primaryButton: { text: "Shop Outerwear", link: "/shop?category=outerwear" },
      secondaryButton: { text: "Learn More", link: "/about" }
    }
  ];

  return (
    <Layout>
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {bannerSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-screen flex items-center justify-center">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  
                  <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
                    <h1 className="brand-heading mb-6 fade-in-up">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl font-light tracking-wide mb-8 max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="btn-minimal bg-white text-black hover:bg-white/90">
                        <Link to={slide.primaryButton.link}>
                          {slide.primaryButton.text}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                        <Link to={slide.secondaryButton.link}>
                          {slide.secondaryButton.text}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-8 bg-white/20 border-white/30 text-white hover:bg-white/30" />
          <CarouselNext className="right-8 bg-white/20 border-white/30 text-white hover:bg-white/30" />
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">Featured Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked pieces that embody our commitment to quality and style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated categories designed for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/shop?category=dresses" className="group relative overflow-hidden rounded-lg h-80">
            <img
              src={productDress}
              alt="Dresses"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-light tracking-wide mb-2">DRESSES</h3>
                <p className="text-sm tracking-widest">ELEGANT & SOPHISTICATED</p>
              </div>
            </div>
          </Link>

          <Link to="/shop?category=tops" className="group relative overflow-hidden rounded-lg h-80">
            <img
              src={productBlouse}
              alt="Tops"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-light tracking-wide mb-2">TOPS</h3>
                <p className="text-sm tracking-widest">PREMIUM & REFINED</p>
              </div>
            </div>
          </Link>

          <Link to="/shop?category=outerwear" className="group relative overflow-hidden rounded-lg h-80">
            <img
              src={productCoat}
              alt="Outerwear"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-light tracking-wide mb-2">OUTERWEAR</h3>
                <p className="text-sm tracking-widest">LUXURY & COMFORT</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">New Arrivals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fresh styles just landed. Be the first to discover our latest pieces
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {saleProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from real customers who love our fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Fashion Enthusiast",
                text: "The quality is absolutely incredible. Every piece I've bought has become a staple in my wardrobe.",
                rating: 5
              },
              {
                name: "Emma Chen",
                role: "Professional",
                text: "Perfect for my professional wardrobe. The attention to detail and fit is unmatched.",
                rating: 5
              },
              {
                name: "Maria Rodriguez",
                role: "Style Blogger",
                text: "I consistently find unique pieces here that I can't get anywhere else. Love the curated selection!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-rose-gold text-rose-gold" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">Our Promise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built on values that matter to you and to the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-light tracking-wide mb-4">PREMIUM QUALITY</h3>
            <p className="text-muted-foreground">
              Every piece is carefully crafted with the finest materials and attention to detail
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-light tracking-wide mb-4">SUSTAINABLE FASHION</h3>
            <p className="text-muted-foreground">
              Committed to ethical practices and environmental responsibility in every step
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-light tracking-wide mb-4">TIMELESS DESIGN</h3>
            <p className="text-muted-foreground">
              Classic pieces that transcend trends and remain elegant season after season
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-heading mb-4">Stay in Style</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, 
            exclusive offers, and fashion insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border rounded-lg bg-background"
            />
            <Button className="btn-minimal">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
