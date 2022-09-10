import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { IsNumber } from 'class-validator';
import { useResponse } from 'src/helpers/hooks';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  GetProductDto,
  ProductCategoryDto,
  ProductDto,
  UpdateProductDto,
} from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: ProductDto) {
    const newProduct = await this.productService.create(dto);
    if (newProduct) {
      return useResponse(true, 'berhasil menambahkan products', newProduct);
    } else {
      return useResponse(false, 'gagal menambahkan products');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('category')
  async category() {
    const categories = await this.productService.getCategories();
    if (categories) {
      return useResponse(true, 'berhasil mengambil categories', categories);
    } else {
      return useResponse(false, 'gagal mengambil categories');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('category/create')
  async createCategory(@Body() dto: ProductCategoryDto) {
    const newCategory = await this.productService.createCategory(dto);
    if (newCategory) {
      return useResponse(true, 'berhasil menambahkan category', newCategory);
    } else {
      return useResponse(false, 'gagal menambahkan category');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() query: GetProductDto) {
    const products = await this.productService.getProducts(query);
    if (products) {
      return useResponse(true, 'berhasil mengambil products', products);
    } else {
      return useResponse(false, 'gagal mengambil products');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteProduct(@Body() dto: { id: string }) {
    const product = await this.productService.deleteProduct(dto.id);
    if (product) {
      return useResponse(
        true,
        'berhasil menghapus product ' + product.name,
        product,
      );
    } else {
      return useResponse(false, 'gagal menghapus product');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateProduct(@Body() dto: UpdateProductDto) {
    const product = await this.productService.updateProduct(dto.id, dto.data);
    if (product) {
      return useResponse(
        true,
        'berhasil menghapus product ' + product.name,
        product,
      );
    } else {
      return useResponse(false, 'gagal menghapus product');
    }
  }
}
