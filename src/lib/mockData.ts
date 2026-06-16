// Mock Users
export const mockUsers = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
  },
  {
    id: 2,
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
  },
];

// Mock Products
export const mockProducts = [
  {
    id: 1,
    name: "Laptop Pro",
    description: "High-performance laptop with 16GB RAM and 512GB SSD",
    price: 1299.99,
    category: "Electronics",
    image: "/images/laptop.jpg",
    stock: 15,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with 2.4GHz receiver",
    price: 29.99,
    category: "Accessories",
    image: "/images/mouse.jpg",
    stock: 50,
    rating: 4.2,
  },
  {
    id: 3,
    name: "USB-C Cable",
    description: "High-speed USB-C charging and data transfer cable",
    price: 12.99,
    category: "Accessories",
    image: "/images/usb-c.jpg",
    stock: 100,
    rating: 4.0,
  },
  {
    id: 4,
    name: "4K Monitor",
    description: "27 inch 4K UHD display with HDR support",
    price: 599.99,
    category: "Electronics",
    image: "/images/monitor.jpg",
    stock: 8,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with Cherry MX switches",
    price: 89.99,
    category: "Accessories",
    image: "/images/keyboard.jpg",
    stock: 25,
    rating: 4.6,
  },
];

export type Product = (typeof mockProducts)[0];
export type User = (typeof mockUsers)[0];
