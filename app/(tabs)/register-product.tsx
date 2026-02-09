import { useApp } from '@/context/AppContext';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterProductScreen() {
  const { registerProduct } = useApp();
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    const priceNum = parseFloat(price);
    const quantityNum = parseInt(quantity, 10);

    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price greater than 0');
      return;
    }

    if (isNaN(quantityNum) || quantityNum < 0) {
      setError('Please enter a valid quantity (0 or greater)');
      return;
    }

    const result = registerProduct(sku, name, priceNum, quantityNum);
    
    if (result.success) {
      Alert.alert('Success', 'Product registered successfully!', [
        { text: 'OK', onPress: () => {
          setSku('');
          setName('');
          setPrice('');
          setQuantity('');
        }}
      ]);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-ellatech-bgDark">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Register Product
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Add a new product to inventory
        </Text>

        {error ? (
          <View className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg p-4 mb-4">
            <Text className="text-red-700 dark:text-red-400">{error}</Text>
          </View>
        ) : null}

        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            SKU *
          </Text>
          <TextInput
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
            placeholder="PROD-001"
            placeholderTextColor="#9CA3AF"
            value={sku}
            onChangeText={setSku}
            autoCapitalize="characters"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Product Name *
          </Text>
          <TextInput
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
            placeholder="Product Name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Price *
          </Text>
          <TextInput
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
            placeholder="0.00"
            placeholderTextColor="#9CA3AF"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Initial Quantity *
          </Text>
          <TextInput
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="number-pad"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-ellatech-primary dark:bg-ellatech-primary rounded-lg py-4 px-6 active:bg-ellatech-primaryDark dark:active:bg-ellatech-primaryDark"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Register Product
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
