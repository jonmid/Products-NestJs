import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // https://github.com/FaztWeb/nestjs-products-api

  // http://localhost:3000/product
  @Get()
  async getProducts(@Res() res: Response) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  // http://localhost:3000/product/5eaa33e97bb68213a1adabd8
  @Get(':productID')
  async getProduct(@Res() res: Response, @Param('productID') productID) {
    const product = this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  // http://localhost:3000/product/create
  @Post('create')
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product,
    });
  }

  // http://localhost:3000/product/delete?productID=5eaf1f61a9b92109242ddecd
  @Delete('delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    console.log(productID);
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      productDeleted,
    });
  }

  // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
  @Put('update')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDto,
    @Query('productID') productID,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Updated Successfully',
      updatedProduct,
    });
  }
}
