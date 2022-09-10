import { PrismaService } from '../prisma/prisma.service';
import { GetProductDto, ProductCategoryDto, ProductDto } from './product.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: ProductDto): Promise<import(".prisma/client").Product>;
    createCategory(dto: ProductCategoryDto): Promise<import(".prisma/client").ProductCategory>;
    deleteProduct(id: string): Promise<import(".prisma/client").Product>;
    updateProduct(id: string, productDto: ProductDto): Promise<import(".prisma/client").Product>;
    getCategories(): Promise<import(".prisma/client").ProductCategory[]>;
    getProducts(dto: GetProductDto): Promise<(import(".prisma/client").Product & {
        category: import(".prisma/client").ProductCategory;
    })[]>;
    skippedProducts(limit: number, page: number): number;
}
