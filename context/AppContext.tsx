import { Product, Transaction, User } from '@/types';
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface AppContextType {
  users: User[];
  products: Product[];
  transactions: Transaction[];
  registerUser: (email: string, fullName: string) => { success: boolean; error?: string };
  registerProduct: (sku: string, name: string, price: number, quantity: number) => { success: boolean; error?: string };
  adjustStock: (sku: string, quantityChange: number) => { success: boolean; error?: string };
  getProduct: (sku: string) => Product | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const registerUser = useCallback((email: string, fullName: string) => {
    // Validation
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    if (!fullName || fullName.trim().length < 2) {
      return { success: false, error: 'Please enter a valid full name' };
    }

    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: email.trim(),
      fullName: fullName.trim(),
      registeredAt: new Date(),
    };

    setUsers(prev => [...prev, newUser]);
    return { success: true };
  }, [users]);

  const registerProduct = useCallback((sku: string, name: string, price: number, quantity: number) => {
    // Validation
    if (!sku || sku.trim().length === 0) {
      return { success: false, error: 'SKU is required' };
    }
    if (!name || name.trim().length === 0) {
      return { success: false, error: 'Product name is required' };
    }
    if (price <= 0) {
      return { success: false, error: 'Price must be greater than 0' };
    }
    if (quantity < 0) {
      return { success: false, error: 'Quantity cannot be negative' };
    }

    // Check if SKU already exists
    if (products.some(p => p.sku.toLowerCase() === sku.toLowerCase())) {
      return { success: false, error: 'Product with this SKU already exists' };
    }

    const newProduct: Product = {
      sku: sku.trim(),
      name: name.trim(),
      price,
      quantity,
      lastUpdated: new Date(),
    };

    setProducts(prev => [...prev, newProduct]);

    // Add transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'product_create',
      productSku: newProduct.sku,
      productName: newProduct.name,
      newQuantity: quantity,
      timestamp: new Date(),
      description: `Product "${newProduct.name}" (SKU: ${newProduct.sku}) created with initial quantity of ${quantity}`,
    };
    setTransactions(prev => [transaction, ...prev]);

    return { success: true };
  }, [products]);

  const adjustStock = useCallback((sku: string, quantityChange: number) => {
    const product = products.find(p => p.sku.toLowerCase() === sku.toLowerCase());
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    const newQuantity = product.quantity + quantityChange;
    
    if (newQuantity < 0) {
      return { success: false, error: 'Stock cannot go negative' };
    }

    const previousQuantity = product.quantity;
    const updatedProduct: Product = {
      ...product,
      quantity: newQuantity,
      lastUpdated: new Date(),
    };

    setProducts(prev => prev.map(p => p.sku === product.sku ? updatedProduct : p));

    // Add transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: quantityChange > 0 ? 'stock_add' : 'stock_remove',
      productSku: product.sku,
      productName: product.name,
      quantityChange: Math.abs(quantityChange),
      previousQuantity,
      newQuantity,
      timestamp: new Date(),
      description: `${quantityChange > 0 ? 'Added' : 'Removed'} ${Math.abs(quantityChange)} units of "${product.name}" (SKU: ${product.sku}). Stock: ${previousQuantity} → ${newQuantity}`,
    };
    setTransactions(prev => [transaction, ...prev]);

    return { success: true };
  }, [products]);

  const getProduct = useCallback((sku: string) => {
    return products.find(p => p.sku.toLowerCase() === sku.toLowerCase());
  }, [products]);

  return (
    <AppContext.Provider
      value={{
        users,
        products,
        transactions,
        registerUser,
        registerProduct,
        adjustStock,
        getProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
