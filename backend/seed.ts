import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel';

dotenv.config();

const PRODUCTS = [
  {
    id: "prod-001",
    name: "Classic Cotton T-Shirt",
    brand: "UrbanWear",
    category: "T-Shirts",
    price: 29.99,
    originalPrice: 39.99,
    onSale: true,
    rating: 4.5,
    reviews: 128,
    stock: 45,
    description: "Soft premium cotton t-shirt designed for everyday comfort. Breathable fabric with a modern slim fit perfect for casual wear.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#000080" },
    ],
  },
  {
    id: "prod-002",
    name: "Slim Fit Jeans",
    brand: "DenimCo",
    category: "Jeans",
    price: 59.99,
    originalPrice: null,
    onSale: false,
    rating: 4,
    reviews: 89,
    stock: 30,
    description: "Modern slim fit jeans made from stretch denim for maximum comfort and style.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Blue", value: "#0000ff" },
      { name: "Black", value: "#000000" },
      { name: "Gray", value: "#808080" },
    ],
  },
  {
    id: "prod-003",
    name: "Leather Jacket",
    brand: "MotoStyle",
    category: "Jackets",
    price: 129.99,
    originalPrice: 159.99,
    onSale: true,
    rating: 4.8,
    reviews: 56,
    stock: 15,
    description: "Premium genuine leather jacket with a classic biker design. Durable and stylish.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Brown", value: "#8b4513" },
    ],
  },
  {
    id: "prod-004",
    name: "Running Shoes",
    brand: "RunMax",
    category: "Shoes",
    price: 89.99,
    originalPrice: null,
    onSale: false,
    rating: 4.3,
    reviews: 234,
    stock: 60,
    description: "Lightweight running shoes designed for maximum performance and comfort.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: [
      { name: "Red", value: "#ff0000" },
      { name: "Blue", value: "#0000ff" },
      { name: "White", value: "#ffffff" },
    ],
  },
  {
    id: "prod-005",
    name: "Wool Sweater",
    brand: "NordicWear",
    category: "Sweaters",
    price: 79.99,
    originalPrice: 99.99,
    onSale: true,
    rating: 4.6,
    reviews: 67,
    stock: 25,
    description: "Warm wool sweater perfect for winter. Soft knit with a stylish modern fit.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Gray", value: "#808080" },
      { name: "Beige", value: "#f5f5dc" },
      { name: "Black", value: "#000000" },
    ],
  },
  {
    id: "prod-006",
    name: "Cargo Pants",
    brand: "TrendSetter",
    category: "Pants",
    price: 69.99,
    originalPrice: null,
    onSale: false,
    rating: 4.2,
    reviews: 45,
    stock: 40,
    description: "Comfortable and stylish cargo pants with multiple pockets.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Olive", value: "#808000" },
      { name: "Black", value: "#000000" },
      { name: "Khaki", value: "#f0e68c" },
    ],
  },
  {
    id: "prod-007",
    name: "Summer Dress",
    brand: "Bloom",
    category: "Dresses",
    price: 49.99,
    originalPrice: 69.99,
    onSale: true,
    rating: 4.7,
    reviews: 156,
    stock: 20,
    description: "A light and breezy summer dress with floral patterns.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Pink", value: "#ffc0cb" },
      { name: "White", value: "#ffffff" },
      { name: "Blue", value: "#87ceeb" },
    ],
  },
  {
    id: "prod-008",
    name: "Sports Hoodie",
    brand: "ActiveLite",
    category: "Hoodies",
    price: 54.99,
    originalPrice: null,
    onSale: false,
    rating: 4.4,
    reviews: 92,
    stock: 50,
    description: "A comfortable hoodie perfect for sports and casual wear.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Gray", value: "#808080" },
      { name: "Navy", value: "#000080" },
    ],
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'ecommer',
    });
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    console.log('Old products cleared.');

    await Product.insertMany(PRODUCTS);
    console.log('Initial products seeded successfully!');

    await mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
