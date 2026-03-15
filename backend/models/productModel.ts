import mongoose, { Document, Schema, Model } from 'mongoose';
import crypto from 'crypto';

export interface IColor {
  name: string;
  value: string;
}

export interface IProduct extends Document {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  originalPrice?: number | null;
  onSale: boolean;
  rating: number;
  reviews: number;
  stock: number;
  description?: string;
  image: string;
  gallery?: string[];
  sizes?: string[];
  colors: IColor[];
}

const productSchema: Schema<IProduct> = new Schema({
  id: { type: String, default: () => crypto.randomUUID(), unique: true },
  name: { type: String, required: true },
  brand: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  onSale: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  stock: { type: Number, default: 1 },
  description: { type: String },
  image: { type: String, required: true },
  gallery: [String],
  sizes: [String],
  colors: [{
    name: String,
    value: String
  }]
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export default Product;
