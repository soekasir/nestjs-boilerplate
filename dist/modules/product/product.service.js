"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            const newProduct = await this.prisma.product.create({
                data: dto,
            });
            return newProduct;
        }
        catch (error) {
            return null;
        }
    }
    async createCategory(dto) {
        try {
            const newCategory = await this.prisma.productCategory.create({
                data: {
                    name: dto.name,
                },
            });
            return newCategory;
        }
        catch (error) {
            return null;
        }
    }
    async deleteProduct(id) {
        try {
            const product = await this.prisma.product.delete({
                where: {
                    id: id,
                },
            });
            return product;
        }
        catch (error) {
            return null;
        }
    }
    async updateProduct(id, productDto) {
        try {
            const product = await this.prisma.product.update({
                where: {
                    id: id,
                },
                data: productDto,
            });
            return product;
        }
        catch (error) {
            return null;
        }
    }
    async getCategories() {
        try {
            const categories = await this.prisma.productCategory.findMany();
            return categories;
        }
        catch (error) {
            return null;
        }
    }
    async getProducts(dto) {
        const limit = Number(dto.limit);
        const page = Number(dto.page);
        try {
            const products = await this.prisma.product.findMany({
                skip: this.skippedProducts(limit, page),
                take: limit,
                include: {
                    category: true,
                },
            });
            return products;
        }
        catch (error) {
            return null;
        }
    }
    skippedProducts(limit, page) {
        const pagination = limit * (page === 1 ? 0 : page - 1);
        return pagination;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map