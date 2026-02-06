import { useApp } from '@/context/AppContext';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProductStatusScreen() {
  const { getProduct, products } = useApp();
  const [sku, setSku] = useState('');
  const [product, setProduct] = useState<ReturnType<typeof getProduct>>(undefined);

  useEffect(() => {
    if (sku) {
      const foundProduct = getProduct(sku);
      setProduct(foundProduct);
    } else {
      setProduct(undefined);
    }
  }, [sku, getProduct, products]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Product Status
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          View product inventory details
        </Text>

        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Search by SKU
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
          <View className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <View className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                SKU: {product.sku}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Current Stock
              </Text>
              <Text className={`text-3xl font-bold ${
                product.quantity === 0
                  ? 'text-red-600 dark:text-red-400'
                  : product.quantity < 10
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-green-600 dark:text-green-400'
              }`}>
                {product.quantity} units
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Price
              </Text>
              <Text className="text-xl font-semibold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </Text>
            </View>

            <View>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Last Updated
              </Text>
              <Text className="text-base text-gray-900 dark:text-white">
                {formatDate(product.lastUpdated)}
              </Text>
            </View>
          </View>
        ) : sku ? (
          <View className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <Text className="text-yellow-800 dark:text-yellow-300 text-center">
              No product found with SKU: {sku}
            </Text>
          </View>
        ) : (
          <View className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <Text className="text-gray-600 dark:text-gray-400 text-center">
              Enter a SKU to view product status
            </Text>
          </View>
        )}

        {products.length > 0 && (
          <View className="mt-6">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              All Products
            </Text>
            {products.map((p) => (
              <TouchableOpacity
                key={p.sku}
                onPress={() => setSku(p.sku)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-2"
              >
                <Text className="text-gray-900 dark:text-white font-semibold">
                  {p.name}
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  SKU: {p.sku} • Stock: {p.quantity} units
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
