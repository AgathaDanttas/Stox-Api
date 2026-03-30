import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    const companies = await prisma.company.findMany();
    console.log("Conectado ao MongoDB! Empresas:", companies);
  } catch (error) {
    console.error("Erro ao conectar:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();