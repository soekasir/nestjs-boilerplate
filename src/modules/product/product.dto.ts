import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  stock: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  category_id: string;
}

export class ProductCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export class ProductDetailDto extends ProductDto {
  @ApiProperty()
  image: string;

  @ApiProperty()
  category: ProductCategoryDto;
}

export class GetProductDto {
  @ApiProperty({
    description: 'Limit for each page',
    minimum: 5,
    default: 10,
  })
  @IsNotEmpty()
  limit: number;

  @ApiProperty({
    description: 'number of pages',
    minimum: 1,
    default: 1,
  })
  @IsNotEmpty()
  page: number;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  data: ProductDto;
}
