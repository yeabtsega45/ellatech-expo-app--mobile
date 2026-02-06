export interface User {
  id: string;
  email: string;
  fullName: string;
  registeredAt: Date;
}

export interface Product {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  type: 'stock_add' | 'stock_remove' | 'product_create' | 'product_update';
  productSku: string;
  productName: string;
  quantityChange?: number;
  previousQuantity?: number;
  newQuantity?: number;
  timestamp: Date;
  description: string;
}
