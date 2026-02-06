import { useApp } from '@/context/AppContext';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AdjustStockScreen() {
  const { products, adjustStock, getProduct } = useApp();
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [product, setProduct] = useState<ReturnType<typeof getProduct>>(undefined);

  useEffect(() => {
    if (sku) {
      const foundProduct = getProduct(sku);
      setProduct(foundProduct);
      if (!foundProduct) {
        setError('Product not found');
      } else {
        setError('');
      }
    } else {
      setProduct(undefined);
      setError('');
    }
  }, [sku, getProduct]);

  const handleAddStock = () => {
    if (!product) {
      setError('Please enter a valid SKU');
      return;
    }

    const quantityNum = parseInt(quantity, 10);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('Please enter a valid quantity greater than 0');
      return;
    }

    const result = adjustStock(product.sku, quantityNum);
    
    if (result.success) {
      Alert.alert('Success', `Added ${quantityNum} units to stock`, [
        { text: 'OK', onPress: () => {
          setQuantity('');
          const updatedProduct = getProduct(product.sku);
          setProduct(updatedProduct);
        }}
      ]);
    } else {
      setError(result.error || 'Failed to adjust stock');
    }
  };

  const handleRemoveStock = () => {
    if (!product) {
      setError('Please enter a valid SKU');
      return;
    }

    const quantityNum = parseInt(quantity, 10);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('Please enter a valid quantity greater than 0');
      return;
    }

    const result = adjustStock(product.sku, -quantityNum);
    
    if (result.success) {
      Alert.alert('Success', `Removed ${quantityNum} units from stock`, [
        { text: 'OK', onPress: () => {
          setQuantity('');
          const updatedProduct = getProduct(product.sku);
          setProduct(updatedProduct);
        }}
      ]);
    } else {
      setError(result.error || 'Failed to adjust stock');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Adjust Stock
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Add or remove product inventory
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Product SKU
          </Text>
          <TextInput
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
            placeholder="Enter SKU"
            placeholderTextColor="#9CA3AF"
            value={sku}
            onChangeText={setSku}
            autoCapitalize="characters"
          />
        </View>

        {product ? (
          <View className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
            <Text className="text-blue-900 dark:text-blue-300 font-semibold mb-1">
              {product.name}
            </Text>
            <Text className="text-blue-700 dark:text-blue-400 text-sm">
              Current Stock: {product.quantity} units
            </Text>
          </View>
        ) : null}

        {error ? (
          <View className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg p-4 mb-4">
            <Text className="text-red-700 dark:text-red-400">{error}</Text>
          </View>
        ) : null}

        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Quantity
          </Text>
          <TextInput
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
            placeholder="Enter quantity"
            placeholderTextColor="#9CA3AF"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="number-pad"
          />
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={handleAddStock}
            disabled={!product || !quantity}
            className={`flex-1 rounded-lg py-4 px-6 ${
              product && quantity
                ? 'bg-green-600 dark:bg-green-500 active:bg-green-700 dark:active:bg-green-600'
                : 'bg-gray-400 dark:bg-gray-600'
            }`}
          >
            <Text className="text-white text-center font-semibold">
              Add Stock
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRemoveStock}
            disabled={!product || !quantity}
            className={`flex-1 rounded-lg py-4 px-6 ${
              product && quantity
                ? 'bg-red-600 dark:bg-red-500 active:bg-red-700 dark:active:bg-red-600'
                : 'bg-gray-400 dark:bg-gray-600'
            }`}
          >
            <Text className="text-white text-center font-semibold">
              Remove Stock
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
