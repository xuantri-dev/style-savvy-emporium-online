// Mock data for the fashion e-commerce website

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  onSale: boolean;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'admin';
  address?: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
}

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Elegant Black Dress',
    description: 'A sophisticated black dress perfect for evening events. Made from premium fabric with a flattering silhouette.',
    price: 189,
    originalPrice: 249,
    images: ['/src/assets/product-dress-1.jpg'],
    category: 'dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy'],
    inStock: true,
    featured: true,
    onSale: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Luxury White Blouse',
    description: 'Premium white blouse crafted from silk. Features elegant button details and a classic fit.',
    price: 129,
    images: ['/src/assets/product-blouse-1.jpg'],
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Cream'],
    inStock: true,
    featured: true,
    onSale: false,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Premium Beige Coat',
    description: 'Luxurious wool coat in sophisticated beige. Perfect for transitional weather with timeless style.',
    price: 349,
    images: ['/src/assets/product-coat-1.jpg'],
    category: 'outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Camel', 'Black'],
    inStock: true,
    featured: true,
    onSale: false,
    rating: 4.9,
    reviews: 67,
  },
  // Add more products for variety
  {
    id: '4',
    name: 'Minimalist Silk Scarf',
    description: 'Hand-finished silk scarf with modern geometric patterns. A versatile accessory for any outfit.',
    price: 89,
    images: ['/src/assets/product-dress-1.jpg'], // Placeholder
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Beige', 'Black', 'Navy'],
    inStock: true,
    featured: false,
    onSale: false,
    rating: 4.7,
    reviews: 34,
  },
  {
    id: '5',
    name: 'Tailored Blazer',
    description: 'Perfectly tailored blazer in premium wool blend. Essential piece for professional and casual looks.',
    price: 229,
    originalPrice: 289,
    images: ['/src/assets/product-coat-1.jpg'], // Placeholder
    category: 'outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Charcoal'],
    inStock: true,
    featured: false,
    onSale: true,
    rating: 4.5,
    reviews: 156,
  },
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'dresses',
    name: 'Dresses',
    description: 'Elegant dresses for every occasion',
    image: '/src/assets/product-dress-1.jpg',
    productCount: 45,
  },
  {
    id: 'tops',
    name: 'Tops',
    description: 'Premium blouses and shirts',
    image: '/src/assets/product-blouse-1.jpg',
    productCount: 67,
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    description: 'Coats, blazers, and jackets',
    image: '/src/assets/product-coat-1.jpg',
    productCount: 32,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Scarves, bags, and jewelry',
    image: '/src/assets/product-dress-1.jpg',
    productCount: 89,
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@luxe.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'jane.doe@example.com',
    name: 'Jane Doe',
    role: 'customer',
    address: {
      street: '123 Fashion Ave',
      city: 'New York',
      country: 'USA',
      zipCode: '10001',
    },
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '2',
    items: [
      {
        productId: '1',
        quantity: 1,
        size: 'M',
        color: 'Black',
        price: 189,
      },
    ],
    total: 189,
    status: 'delivered',
    createdAt: '2024-01-15T10:30:00Z',
    shippingAddress: {
      street: '123 Fashion Ave',
      city: 'New York',
      country: 'USA',
      zipCode: '10001',
    },
  },
];

// Helper functions
export const getFeaturedProducts = () => mockProducts.filter(product => product.featured);
export const getSaleProducts = () => mockProducts.filter(product => product.onSale);
export const getProductsByCategory = (categoryId: string) => 
  mockProducts.filter(product => product.category === categoryId);
export const getProductById = (id: string) => 
  mockProducts.find(product => product.id === id);