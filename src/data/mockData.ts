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

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
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
  // Additional products for each category
  {
    id: '6',
    name: 'Summer Floral Dress',
    description: 'Light and airy floral dress perfect for warm weather. Features a beautiful print and comfortable fit.',
    price: 149,
    images: ['/src/assets/product-dress-1.jpg'],
    category: 'dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral', 'White'],
    inStock: true,
    featured: false,
    onSale: false,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: '7',
    name: 'Midi Cocktail Dress',
    description: 'Sophisticated midi dress ideal for cocktail parties and special events. Elegant cut with modern details.',
    price: 219,
    originalPrice: 259,
    images: ['/src/assets/product-dress-1.jpg'],
    category: 'dresses',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    inStock: true,
    featured: true,
    onSale: true,
    rating: 4.7,
    reviews: 92,
  },
  {
    id: '8',
    name: 'Casual Cotton Blouse',
    description: 'Comfortable cotton blouse for everyday wear. Relaxed fit with classic button-up design.',
    price: 79,
    images: ['/src/assets/product-blouse-1.jpg'],
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Pink'],
    inStock: true,
    featured: false,
    onSale: false,
    rating: 4.3,
    reviews: 45,
  },
  {
    id: '9',
    name: 'Silk Camisole',
    description: 'Delicate silk camisole perfect for layering or wearing alone. Luxurious feel with adjustable straps.',
    price: 99,
    images: ['/src/assets/product-blouse-1.jpg'],
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Nude', 'Black', 'White'],
    inStock: true,
    featured: false,
    onSale: false,
    rating: 4.6,
    reviews: 78,
  },
  {
    id: '10',
    name: 'Winter Wool Coat',
    description: 'Warm wool coat for cold weather. Classic design with modern tailoring and premium materials.',
    price: 429,
    images: ['/src/assets/product-coat-1.jpg'],
    category: 'outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    inStock: true,
    featured: true,
    onSale: false,
    rating: 4.8,
    reviews: 134,
  },
  {
    id: '11',
    name: 'Leather Handbag',
    description: 'Premium leather handbag with spacious interior and elegant design. Perfect for work or weekend.',
    price: 199,
    originalPrice: 249,
    images: ['/src/assets/product-dress-1.jpg'],
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true,
    featured: false,
    onSale: true,
    rating: 4.5,
    reviews: 89,
  },
  {
    id: '12',
    name: 'Statement Earrings',
    description: 'Bold statement earrings to elevate any outfit. Crafted with attention to detail and quality materials.',
    price: 59,
    images: ['/src/assets/product-dress-1.jpg'],
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    inStock: true,
    featured: false,
    onSale: false,
    rating: 4.4,
    reviews: 23,
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
  {
    id: 'ORD-002',
    userId: '2',
    items: [
      {
        productId: '2',
        quantity: 2,
        size: 'S',
        color: 'White',
        price: 129,
      },
      {
        productId: '4',
        quantity: 1,
        size: 'One Size',
        color: 'Beige',
        price: 89,
      },
    ],
    total: 347,
    status: 'processing',
    createdAt: '2024-01-20T14:15:00Z',
    shippingAddress: {
      street: '456 Style Street',
      city: 'Los Angeles',
      country: 'USA',
      zipCode: '90210',
    },
  },
  {
    id: 'ORD-003',
    userId: '3',
    items: [
      {
        productId: '3',
        quantity: 1,
        size: 'M',
        color: 'Beige',
        price: 349,
      },
    ],
    total: 349,
    status: 'shipped',
    createdAt: '2024-01-18T09:45:00Z',
    shippingAddress: {
      street: '789 Fashion Blvd',
      city: 'Chicago',
      country: 'USA',
      zipCode: '60601',
    },
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'REV-001',
    productId: '1',
    userId: '2',
    userName: 'Jane Doe',
    rating: 5,
    comment: 'Absolutely gorgeous dress! The quality is exceptional and the fit is perfect. Received many compliments.',
    createdAt: '2024-01-16T12:00:00Z',
    status: 'approved',
  },
  {
    id: 'REV-002',
    productId: '2',
    userId: '3',
    userName: 'Sarah Miller',
    rating: 4,
    comment: 'Beautiful blouse, very elegant. The silk is high quality but runs a bit small.',
    createdAt: '2024-01-10T15:30:00Z',
    status: 'approved',
  },
  {
    id: 'REV-003',
    productId: '3',
    userId: '4',
    userName: 'Emma Johnson',
    rating: 5,
    comment: 'This coat is everything I hoped for! Perfect weight and the color is stunning.',
    createdAt: '2024-01-12T11:20:00Z',
    status: 'approved',
  },
  {
    id: 'REV-004',
    productId: '1',
    userId: '5',
    userName: 'Lisa Chen',
    rating: 3,
    comment: 'The dress is nice but the shipping took longer than expected.',
    createdAt: '2024-01-14T16:45:00Z',
    status: 'pending',
  },
];

// Extended Mock Users
export const extendedMockUsers: User[] = [
  ...mockUsers,
  {
    id: '3',
    email: 'sarah.miller@example.com',
    name: 'Sarah Miller',
    role: 'customer',
    address: {
      street: '456 Style Street',
      city: 'Los Angeles',
      country: 'USA',
      zipCode: '90210',
    },
  },
  {
    id: '4',
    email: 'emma.johnson@example.com',
    name: 'Emma Johnson',
    role: 'customer',
    address: {
      street: '789 Fashion Blvd',
      city: 'Chicago',
      country: 'USA',
      zipCode: '60601',
    },
  },
  {
    id: '5',
    email: 'lisa.chen@example.com',
    name: 'Lisa Chen',
    role: 'customer',
    address: {
      street: '321 Design Ave',
      city: 'San Francisco',
      country: 'USA',
      zipCode: '94102',
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