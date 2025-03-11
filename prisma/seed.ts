import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER',
    },
  });

  // Create sample products
  const products = [
    {
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      stock: 50,
      category: 'Electronics',
      id:'1'
    },
    {
      name: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      price: 899.99,
      stock: 100,
      category: 'Electronics',
      id:'2'
    },
    {
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling headphones',
      price: 249.99,
      stock: 75,
      category: 'Audio',
      id:"3"
    },
    {
      name: 'Smart Watch',
      description: 'Fitness and health tracking smartwatch',
      price: 199.99,
      stock: 60,
      category: 'Wearables',
      id:"4"
    },
    {
      name: 'Tablet Ultra',
      description: 'Lightweight tablet with stunning display',
      price: 499.99,
      stock: 40,
      category: 'Electronics',
      id:"5"
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }

  // Create sample orders
  const createdProducts = await prisma.product.findMany();
  
  // Create an order for the regular user
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: 1149.98,
      status: 'COMPLETED',
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            quantity: 1,
            price: createdProducts[0].price,
          },
          {
            productId: createdProducts[2].id,
            quantity: 1,
            price: createdProducts[2].price,
          },
        ],
      },
    },
  });

  console.log({ admin, user, products, order });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });