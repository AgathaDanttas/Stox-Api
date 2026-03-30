import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

interface RegisterCompanyDTO {
  company: {
    nameReason: string;
    nameFantasy: string;
    cnpj: string;
    typeBranch: string;
    email: string;
  };
  representative: {
    name: string;
    email: string;
    position: string;
    phone: string;
  };
  user: {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "COLLABORATOR";
  };
}

export async function registerCompanyService(data: RegisterCompanyDTO) {
  const { company, representative, user } = data;

  console.log("company:", company);
  console.log("representative:", representative);
  console.log("user:", user); const existingCompany = await prisma.company.findUnique({
    where: { cnpj: company.cnpj },
  });

  if (existingCompany) {
    throw new Error("CNPJ já cadastrado.");
  }

  return prisma.$transaction(async (tx) => {
    const createdCompany = await tx.company.create({
      data: {
        nameReason: company.nameReason,
        nameFantasy: company.nameFantasy,
        cnpj: company.cnpj,
        typeBranch: company.typeBranch,
        email: company.email,
      },
    });

    const createdRepresentative = await tx.representative.create({
      data: {
        name: representative.name,
        email: representative.email,
        position: representative.position,
        phone: representative.phone,
        companyId: createdCompany.id,
      },
    });

    const createdUser = await tx.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        profile: user.role,
        companyId: createdCompany.id,
      },
    });

    return {
      company: createdCompany,
      representative: createdRepresentative,
      user: createdUser,
    };
  });
}