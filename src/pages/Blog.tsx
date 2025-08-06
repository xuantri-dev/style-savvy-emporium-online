import React from 'react';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { CalendarDays, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Spring Fashion Trends 2024",
    excerpt: "Discover the hottest fashion trends for spring and how to incorporate them into your wardrobe.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    category: "Fashion Trends",
    image: "/src/assets/hero-fashion.jpg",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Building a Capsule Wardrobe",
    excerpt: "Learn how to create a versatile wardrobe with essential pieces that work for any occasion.",
    author: "Emma Davis",
    date: "March 12, 2024",
    category: "Style Guide",
    image: "/src/assets/product-dress-1.jpg",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Sustainable Fashion Choices",
    excerpt: "Making eco-friendly fashion choices that are both stylish and environmentally conscious.",
    author: "Michael Chen",
    date: "March 10, 2024",
    category: "Sustainability",
    image: "/src/assets/product-coat-1.jpg",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Color Coordination Guide",
    excerpt: "Master the art of color coordination with these professional styling tips and tricks.",
    author: "Lisa Rodriguez",
    date: "March 8, 2024",
    category: "Style Tips",
    image: "/src/assets/product-blouse-1.jpg",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "Seasonal Wardrobe Transition",
    excerpt: "How to seamlessly transition your wardrobe from winter to spring with smart layering.",
    author: "David Park",
    date: "March 5, 2024",
    category: "Seasonal",
    image: "/src/assets/hero-fashion.jpg",
    readTime: "7 min read"
  },
  {
    id: 6,
    title: "Accessorizing Like a Pro",
    excerpt: "Transform any outfit with the right accessories. Learn the do's and don'ts of accessorizing.",
    author: "Amanda Wilson",
    date: "March 1, 2024",
    category: "Accessories",
    image: "/src/assets/product-dress-1.jpg",
    readTime: "5 min read"
  }
];

const categories = ["All", "Fashion Trends", "Style Guide", "Sustainability", "Style Tips", "Seasonal", "Accessories"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 6;

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Fashion Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest fashion trends, styling tips, and industry insights
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
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

        {/* Newsletter Signup */}
        <div className="mt-16 bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest fashion insights and exclusive content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;