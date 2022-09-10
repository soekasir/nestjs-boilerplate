import { GetProductDto, ProductCategoryDto, ProductDto, UpdateProductDto } from './product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    create(dto: ProductDto): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
    category(): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
    createCategory(dto: ProductCategoryDto): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
    list(query: GetProductDto): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
    deleteProduct(dto: {
        id: string;
    }): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
    updateProduct(dto: UpdateProductDto): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
}
