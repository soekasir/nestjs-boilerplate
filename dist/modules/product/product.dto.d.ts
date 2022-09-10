export declare class ProductDto {
    name: string;
    stock: number;
    description: string;
    category_id: string;
}
export declare class ProductCategoryDto {
    name: string;
}
export declare class ProductDetailDto extends ProductDto {
    image: string;
    category: ProductCategoryDto;
}
export declare class GetProductDto {
    limit: number;
    page: number;
}
export declare class UpdateProductDto {
    id: string;
    data: ProductDto;
}
