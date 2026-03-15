export interface IColor {
  name: string;
  value: string;
}

export interface IProduct {
  message: boolean;
  _id?: string;
  id: number;
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
