
import { prisma } from '../../lib/prisma'
import { RegisterCompanyDTO } from './company.dto'


export async function registerCompanyService(data: RegisterCompanyDTO) {
  const {
    nameReason,
    nameFantasy,
    cnpj,
    email,
    typeBranch,
  } = data
  
  if (
    !nameReason ||
    !nameFantasy ||
    !cnpj ||
    !typeBranch
  ) {
    throw new Error('Dados obrigatórios não informados')
  }
  console.log("CNPJ recebido:", cnpj, cnpj.length);

  const company = await prisma.company.create({
    data: {
      nameReason,
      nameFantasy,
      cnpj,
      typeBranch,
      ...(email && { email }),
    },
  })

  console.log(data);

  return company
}