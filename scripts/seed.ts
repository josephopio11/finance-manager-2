import { accounts, categories, transactions } from "@/db/schema";
import { convertAmountToMilliUnits } from "@/lib/utils";
import { neon } from "@neondatabase/serverless";
import { createId } from "@paralleldrive/cuid2";
import { eachDayOfInterval, subDays } from "date-fns";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Home machine
const SEED_USER_ID = "user_2ZhFbqQYs2YPbSaEtAIwHnPC6Ly";
// School Machine
// const SEED_USER_ID = "user_2gUXO2GhhRQVrygpcpJKRQGKiq5";
const SEED_CATEGORIES = [
  { id: createId(), name: "Food", userId: SEED_USER_ID, plaidId: null },
  { id: createId(), name: "Groceries", userId: SEED_USER_ID, plaidId: null },
  {
    id: createId(),
    name: "Entertainment",
    userId: SEED_USER_ID,
    plaidId: null,
  },
  { id: createId(), name: "Housing", userId: SEED_USER_ID, plaidId: null },
  { id: createId(), name: "Utilities", userId: SEED_USER_ID, plaidId: null },
  { id: createId(), name: "Car", userId: SEED_USER_ID, plaidId: null },
  { id: createId(), name: "Other", userId: SEED_USER_ID, plaidId: null },
  { id: createId(), name: "Savings", userId: SEED_USER_ID, plaidId: null },
];
const SEED_ACCOUNTS = [
  { id: createId(), name: "Checking", userId: SEED_USER_ID, plaidId: null },
  { id: createId(), name: "Savings", userId: SEED_USER_ID, plaidId: null },
  { id: createId(), name: "Credit Card", userId: SEED_USER_ID, plaidId: null },
  { id: createId(), name: "Other", userId: SEED_USER_ID, plaidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Rent":
      return Math.random() * 400 + 90;
    case "Food":
      return Math.random() * 30 + 10;
    case "Groceries":
      return Math.random() * 50 + 15;
    case "Entertainment":
      return Math.random() * 100 + 20;
    case "Housing":
      return Math.random() * 200 + 30;
    case "Utilities":
      return Math.random() * 80 + 20;
    case "Car":
      return Math.random() * 100 + 20;
    case "Other":
      return Math.random() * 30 + 5;
    case "Savings":
      return Math.random() * 200 + 70;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 5) + 1;

  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.5;
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMilliUnits(
      isExpense ? -amount : amount
    );

    SEED_TRANSACTIONS.push({
      // id: `transaction_${format(day, "yyyy-MM-dd")}_${i}_${Math.floor(
      //   Math.random() * 500
      // )}`,
      id: createId(),
      accountId: SEED_ACCOUNTS[Math.floor(Math.random() * 4)].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Merchant",
      notes: "Test random transaction",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();
    await db.insert(categories).values(SEED_CATEGORIES).onConflictDoNothing();
    await db.insert(accounts).values(SEED_ACCOUNTS).onConflictDoNothing();
    await db
      .insert(transactions)
      .values(SEED_TRANSACTIONS)
      .onConflictDoNothing();
  } catch (error) {
    console.error("Error seeding database: ", error);
    process.exit(1);
  }
};

main();
