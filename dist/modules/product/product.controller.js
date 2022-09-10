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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const use_guards_decorator_1 = require("@nestjs/common/decorators/core/use-guards.decorator");
const hooks_1 = require("../../helpers/hooks");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const product_dto_1 = require("./product.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async create(dto) {
        const newProduct = await this.productService.create(dto);
        if (newProduct) {
            return (0, hooks_1.useResponse)(true, 'berhasil menambahkan products', newProduct);
        }
        else {
            return (0, hooks_1.useResponse)(false, 'gagal menambahkan products');
        }
    }
    async category() {
        const categories = await this.productService.getCategories();
        if (categories) {
            return (0, hooks_1.useResponse)(true, 'berhasil mengambil categories', categories);
        }
        else {
            return (0, hooks_1.useResponse)(false, 'gagal mengambil categories');
        }
    }
    async createCategory(dto) {
        const newCategory = await this.productService.createCategory(dto);
        if (newCategory) {
            return (0, hooks_1.useResponse)(true, 'berhasil menambahkan category', newCategory);
        }
        else {
            return (0, hooks_1.useResponse)(false, 'gagal menambahkan category');
        }
    }
    async list(query) {
        const products = await this.productService.getProducts(query);
        if (products) {
            return (0, hooks_1.useResponse)(true, 'berhasil mengambil products', products);
        }
        else {
            return (0, hooks_1.useResponse)(false, 'gagal mengambil products');
        }
    }
    async deleteProduct(dto) {
        const product = await this.productService.deleteProduct(dto.id);
        if (product) {
            return (0, hooks_1.useResponse)(true, 'berhasil menghapus product ' + product.name, product);
        }
        else {
            return (0, hooks_1.useResponse)(false, 'gagal menghapus product');
        }
    }
    async updateProduct(dto) {
        const product = await this.productService.updateProduct(dto.id, dto.data);
        if (product) {
            return (0, hooks_1.useResponse)(true, 'berhasil menghapus product ' + product.name, product);
        }
        else {
            return (0, hooks_1.useResponse)(false, 'gagal menghapus product');
        }
    }
};
__decorate([
    (0, use_guards_decorator_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, use_guards_decorator_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "category", null);
__decorate([
    (0, use_guards_decorator_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('category/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createCategory", null);
__decorate([
    (0, use_guards_decorator_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('list'),
    __param(0, (0, decorators_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.GetProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "list", null);
__decorate([
    (0, use_guards_decorator_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, use_guards_decorator_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map