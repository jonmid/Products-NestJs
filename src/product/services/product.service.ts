import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.interface';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  // Get all products
  async getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Get a single Product
  async getProduct(productID: string): Promise<Product> {
    return this.productModel.findById(productID);
  }

  // Post a single product
  async createProduct(createProductDTO: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDTO);
    return newProduct.save();
  }

  // Delete Product
  async deleteProduct(productID: number): Promise<Product> {
    const deletedProduct = this.productModel.findByIdAndRemove(productID);
    return deletedProduct;
  }

  // Put a single product
  async updateProduct(
    productID: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const updatedProduct = this.productModel.findByIdAndUpdate(
      productID,
      createProductDto,
      // { new: true },
    );
    return updatedProduct;
  }
}
