import { Injectable } from '@nestjs/common';
import { pagination } from 'src/helpers/hooks';
import { PrismaService } from '../prisma/prisma.service';
import { GetProductDto, ProductCategoryDto, ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(dto: ProductDto) {
    try {
      const newProduct = await this.prisma.product.create({
        data: dto,
      });
      return newProduct;
    } catch (error) {
      return null;
    }
  }

  async createCategory(dto: ProductCategoryDto) {
    try {
      const newCategory = await this.prisma.productCategory.create({
        data: dto,
      });
      return newCategory;
    } catch (error) {
      return null;
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id,
        },
      });
      return product;
    } catch (error) {
      return null;
    }
  }

  async updateProduct(id: string, productDto: ProductDto) {
    try {
      const product = await this.prisma.product.update({
        where: {
          id,
        },
        data: productDto,
      });
      return product;
    } catch (error) {
      return null;
    }
  }

  async getCategories() {
    try {
      const categories = await this.prisma.productCategory.findMany();
      return categories;
    } catch (error) {
      return null;
    }
  }

  async getProducts(dto: GetProductDto) {
    const limit = Number(dto.limit);
    const page = Number(dto.page);

    try {
      const products = await this.prisma.product.findMany({
        skip: pagination(limit, page),
        take: limit,
        include: {
          category: true,
        },
      });
      return products;
    } catch (error) {
      return null;
    }
  }
}
