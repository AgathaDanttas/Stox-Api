"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
const mockCompanyId = "000000000000000000000000";
const productsData = [
    { "name": "Camiseta Nike Branca", "barcode": "7891234560001", "brand": "Nike", "description": "Camiseta básica branca", "purchasePrice": 30, "salePrice": 59.9, "minStock": 10, "maxStock": 100, "location": "A1-G1", "supplier": "Distribuidora Alpha", "category": "Roupas", "customFields": { "garantiaMeses": 3 } },
    { "name": "Tênis Adidas Run", "barcode": "7891234560002", "brand": "Adidas", "description": "Tênis esportivo corrida", "purchasePrice": 120, "salePrice": 249.9, "minStock": 5, "maxStock": 50, "location": "A1-G2", "supplier": "Comercial Beta", "category": "Calçados", "customFields": { "garantiaMeses": 6 } },
    { "name": "Calça Jeans Slim", "barcode": "7891234560003", "brand": "Levis", "description": "Calça jeans azul escuro", "purchasePrice": 80, "salePrice": 159.9, "minStock": 8, "maxStock": 60, "location": "A2-G1", "supplier": "Distribuidora Alpha", "category": "Roupas" },
    { "name": "Notebook Dell Inspiron", "barcode": "7891234560004", "brand": "Dell", "description": "Notebook i5 8GB RAM", "purchasePrice": 2500, "salePrice": 3200, "minStock": 2, "maxStock": 15, "location": "E1-G1", "supplier": "Fornecedor Delta", "category": "Eletrônicos" },
    { "name": "Mouse Logitech MX", "barcode": "7891234560005", "brand": "Logitech", "description": "Mouse sem fio premium", "purchasePrice": 150, "salePrice": 299.9, "minStock": 10, "maxStock": 80, "location": "E1-G2", "supplier": "Fornecedor Delta", "category": "Eletrônicos" },
    { "name": "Teclado Mecânico RGB", "barcode": "7891234560006", "brand": "Redragon", "description": "Teclado gamer RGB", "purchasePrice": 200, "salePrice": 399.9, "minStock": 6, "maxStock": 40, "location": "E2-G1", "supplier": "Fornecedor Delta", "category": "Eletrônicos" },
    { "name": "Monitor 24\" LG", "barcode": "7891234560007", "brand": "LG", "description": "Monitor Full HD", "purchasePrice": 600, "salePrice": 999.9, "minStock": 4, "maxStock": 25, "location": "E2-G2", "supplier": "Fornecedor Delta", "category": "Eletrônicos" },
    { "name": "Cadeira Gamer", "barcode": "7891234560008", "brand": "DXRacer", "description": "Cadeira ergonômica", "purchasePrice": 700, "salePrice": 1299.9, "minStock": 3, "maxStock": 20, "location": "M1-G1", "supplier": "Omega Distribuições", "category": "Móveis" },
    { "name": "Mesa Escritório", "barcode": "7891234560009", "brand": "Multimóveis", "description": "Mesa para escritório", "purchasePrice": 300, "salePrice": 599.9, "minStock": 5, "maxStock": 30, "location": "M1-G2", "supplier": "Omega Distribuições", "category": "Móveis" },
    { "name": "Fone Bluetooth JBL", "barcode": "7891234560010", "brand": "JBL", "description": "Fone sem fio", "purchasePrice": 100, "salePrice": 199.9, "minStock": 12, "maxStock": 90, "location": "E3-G1", "supplier": "Comercial Beta", "category": "Eletrônicos" },
    { "name": "Smartphone Samsung A54", "barcode": "7891234560011", "brand": "Samsung", "description": "Smartphone intermediário", "purchasePrice": 1200, "salePrice": 1899.9, "minStock": 4, "maxStock": 35, "location": "E3-G2", "supplier": "Comercial Beta", "category": "Eletrônicos" },
    { "name": "Carregador USB-C", "barcode": "7891234560012", "brand": "Baseus", "description": "Carregador rápido", "purchasePrice": 40, "salePrice": 89.9, "minStock": 20, "maxStock": 150, "location": "E4-G1", "supplier": "Comercial Beta", "category": "Acessórios" },
    { "name": "Copo Térmico Stanley", "barcode": "7891234560013", "brand": "Stanley", "description": "Copo térmico 473ml", "purchasePrice": 70, "salePrice": 149.9, "minStock": 10, "maxStock": 60, "location": "H1-G1", "supplier": "Distribuidora Alpha", "category": "Utilidades" },
    { "name": "Garrafa Térmica", "barcode": "7891234560014", "brand": "Termolar", "description": "Garrafa 1L", "purchasePrice": 50, "salePrice": 109.9, "minStock": 8, "maxStock": 70, "location": "H1-G2", "supplier": "Distribuidora Alpha", "category": "Utilidades" },
    { "name": "Livro Clean Code", "barcode": "7891234560015", "brand": "Alta Books", "description": "Livro de programação", "purchasePrice": 60, "salePrice": 120, "minStock": 6, "maxStock": 40, "location": "L1-G1", "supplier": "Logística Gamma", "category": "Livros" },
    { "name": "Livro Java Completo", "barcode": "7891234560016", "brand": "Casa do Código", "description": "Java backend", "purchasePrice": 70, "salePrice": 140, "minStock": 6, "maxStock": 40, "location": "L1-G2", "supplier": "Logística Gamma", "category": "Livros" },
    { "name": "Caneca Personalizada", "barcode": "7891234560017", "brand": "PrintArt", "description": "Caneca 300ml", "purchasePrice": 15, "salePrice": 39.9, "minStock": 15, "maxStock": 100, "location": "H2-G1", "supplier": "Logística Gamma", "category": "Utilidades" },
    { "name": "Relógio Smartwatch", "barcode": "7891234560018", "brand": "Xiaomi", "description": "Smartwatch fitness", "purchasePrice": 200, "salePrice": 399.9, "minStock": 5, "maxStock": 45, "location": "E5-G1", "supplier": "Comercial Beta", "category": "Eletrônicos" },
    { "name": "Luminária LED", "barcode": "7891234560019", "brand": "Philips", "description": "Luminária de mesa", "purchasePrice": 45, "salePrice": 99.9, "minStock": 10, "maxStock": 80, "location": "M2-G1", "supplier": "Omega Distribuições", "category": "Iluminação" },
    { "name": "Extensão Elétrica", "barcode": "7891234560020", "brand": "Intelbras", "description": "Extensão 5 tomadas", "purchasePrice": 25, "salePrice": 59.9, "minStock": 20, "maxStock": 120, "location": "E5-G2", "supplier": "Fornecedor Delta", "category": "Acessórios" }
];
async function seed() {
    console.log("Creating strict Mock Company if it doesn't exist...");
    let company = await prisma.company.findUnique({ where: { id: mockCompanyId } });
    if (!company) {
        company = await prisma.company.create({
            data: {
                id: mockCompanyId,
                nameReason: "Stox Inc",
                nameFantasy: "Stox Mock",
                cnpj: "00000000000000",
                typeBranch: "Tech",
                email: "admin@stox.com"
            }
        });
    }
    // Pre-seed categories
    const categoriesMap = {};
    const suppliersMap = {};
    const customFieldsMap = {};
    console.log("Processing seed data...");
    for (const item of productsData) {
        // 1. Category
        if (!categoriesMap[item.category]) {
            let cat = await prisma.category.findFirst({ where: { name: item.category, companyId: mockCompanyId } });
            if (!cat) {
                cat = await prisma.category.create({ data: { name: item.category, color: "#8C7CF0", companyId: mockCompanyId } });
            }
            categoriesMap[item.category] = cat.id;
        }
        // 2. Supplier
        if (!suppliersMap[item.supplier]) {
            let sup = await prisma.supplier.findFirst({ where: { name: item.supplier, companyId: mockCompanyId } });
            if (!sup) {
                sup = await prisma.supplier.create({ data: { name: item.supplier, email: "contato@fornecedor.com", phone: "11999999999", companyId: mockCompanyId } });
            }
            suppliersMap[item.supplier] = sup.id;
        }
        // 3. Custom Fields Definition
        if (item.customFields) {
            for (const key of Object.keys(item.customFields)) {
                if (!customFieldsMap[key]) {
                    let cf = await prisma.customField.findFirst({ where: { name: key, companyId: mockCompanyId } });
                    if (!cf) {
                        cf = await prisma.customField.create({ data: { name: key, type: "number", companyId: mockCompanyId } });
                    }
                    customFieldsMap[key] = cf.id;
                }
            }
        }
        // 4. Create Product with relations
        const customFieldsArray = item.customFields ? Object.entries(item.customFields).map(([k, v]) => ({
            fieldId: customFieldsMap[k],
            value: String(v)
        })) : [];
        await prisma.product.create({
            data: {
                name: item.name,
                barcode: item.barcode,
                brand: item.brand,
                description: item.description,
                purchasePrice: item.purchasePrice,
                salePrice: item.salePrice,
                minStock: item.minStock,
                maxStock: item.maxStock,
                location: item.location,
                quantity: Math.floor(Math.random() * (item.maxStock - item.minStock + 1)) + item.minStock,
                categoryId: categoriesMap[item.category],
                supplierId: suppliersMap[item.supplier],
                companyId: mockCompanyId,
                customFields: customFieldsArray
            }
        });
        console.log(`Created: ${item.name}`);
    }
    console.log("Seeding complete!");
}
seed().catch(e => console.error(e)).finally(() => prisma.$disconnect());
