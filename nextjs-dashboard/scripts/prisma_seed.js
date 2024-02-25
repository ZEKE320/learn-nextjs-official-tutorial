const { PrismaClient } = require('@prisma/client');
const {
  users,
  customers,
  invoices,
  revenue,
} = require('../app/lib/placeholder-data');
const bcrypt = require('bcrypt');

/**
 * @type {import('@prisma/client').PrismaClient}
 */
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: await Promise.all(
      users.map(async (user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: await bcrypt.hash(user.password, 10),
        };
      }),
    ),
    skipDuplicates: true,
  });

  await prisma.customer.createMany({
    data: customers.map((customer) => {
      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
      };
    }),
    skipDuplicates: true,
  });

  await prisma.invoice.createMany({
    data: invoices.map((invoice) => {
      return {
        customer_id: invoice.customer_id,
        amount: invoice.amount,
        status: invoice.status,
        date: new Date(invoice.date),
      };
    }),
    skipDuplicates: true,
  });

  await prisma.revenue.createMany({
    data: revenue.map((rev) => {
      return {
        month: rev.month,
        revenue: rev.revenue,
      };
    }),
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
