import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client.js";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD;

if (!connectionString || !email || !password) {
    throw new Error(
        "DATABASE_URL, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD are required"
    );
}

const adapter = new PrismaPg({
    connectionString
})

const prisma = new PrismaClient({
    adapter
})

const main = async () => {
    const existingAdmin = await prisma.admin.findUnique({
        where: {
            email,
        },
    });

    if (existingAdmin) {
        console.log("Seed admin already exists.");
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.create({
        data: {
            fullName: "System Admin",
            email,
            passwordHash,
            role: "ADMIN",
        },
    });

    console.log(`Seed admin created: ${admin.email}`);

}

main()
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
