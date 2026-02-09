import { useApp } from '@/context/AppContext';
import { Redirect, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { users, products, transactions } = useApp();

  // If no user is registered yet, always send to the Register User screen
  if (users.length === 0) {
    return <Redirect href="/(tabs)/register-user" />;
  }

  const stats = [
    { label: 'Users', value: users.length, color: 'bg-blue-500', icon: '👥' },
    { label: 'Products', value: products.length, color: 'bg-green-500', icon: '📦' },
    { label: 'Transactions', value: transactions.length, color: 'bg-purple-500', icon: '📝' },
  ];

  const quickActions = [
    { title: 'Register User', route: 'register-user', color: 'bg-blue-600', icon: '➕' },
    { title: 'Register Product', route: 'register-product', color: 'bg-green-600', icon: '📦' },
    { title: 'Adjust Stock', route: 'adjust-stock', color: 'bg-orange-600', icon: '📊' },
    { title: 'Product Status', route: 'product-status', color: 'bg-purple-600', icon: '🔍' },
    { title: 'Transactions', route: 'transactions', color: 'bg-indigo-600', icon: '📋' },
  ];

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Inventory Management
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Manage users, products, and inventory
        </Text>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Overview
          </Text>
          <View className="flex-row gap-3">
            {stats.map((stat) => (
              <View
                key={stat.label}
                className={`${stat.color} rounded-lg p-4 flex-1`}
              >
                <Text className="text-2xl mb-1">{stat.icon}</Text>
                <Text className="text-white text-2xl font-bold">{stat.value}</Text>
                <Text className="text-white/90 text-sm">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Quick Actions
          </Text>
          <View className="gap-3">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.route}
                onPress={() => router.push(`/(tabs)/${action.route}` as any)}
                className={`${action.color} rounded-lg p-4 flex-row items-center active:opacity-80`}
              >
                <Text className="text-2xl mr-3">{action.icon}</Text>
                <Text className="text-white font-semibold text-lg flex-1">
                  {action.title}
                </Text>
                <Text className="text-white/80">→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {products.length > 0 && (
          <View className="mt-6">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Recent Products
            </Text>
            {products.slice(0, 5).map((product) => (
              <View
                key={product.sku}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-2"
              >
                <Text className="text-gray-900 dark:text-white font-semibold">
                  {product.name}
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">
                  SKU: {product.sku} • Stock: {product.quantity} units • ${product.price.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
