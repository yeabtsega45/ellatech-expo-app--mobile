import { useApp } from '@/context/AppContext';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const ITEMS_PER_PAGE = 10;

export default function TransactionsScreen() {
  const { transactions } = useApp();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return transactions.slice(startIndex, endIndex);
  }, [transactions, currentPage]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'stock_add':
        return '➕';
      case 'stock_remove':
        return '➖';
      case 'product_create':
        return '✨';
      case 'product_update':
        return '✏️';
      default:
        return '📝';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'stock_add':
        return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700';
      case 'stock_remove':
        return 'bg-rose-100 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700';
      case 'product_create':
        return 'bg-ellatech-primary/10 dark:bg-ellatech-bgCard border-ellatech-primary/40 dark:border-ellatech-primary/60';
      case 'product_update':
        return 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700';
      default:
        return 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-ellatech-bgDark">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Transaction History
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          View all inventory changes and updates
        </Text>

        {transactions.length === 0 ? (
          <View className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <Text className="text-gray-600 dark:text-gray-400 text-center text-lg">
              No transactions yet
            </Text>
            <Text className="text-gray-500 dark:text-gray-500 text-center mt-2">
              Transactions will appear here as you manage products
            </Text>
          </View>
        ) : (
          <>
            <View className="mb-4">
              {paginatedTransactions.map((transaction) => (
                <View
                  key={transaction.id}
                  className={`${getTransactionColor(transaction.type)} border rounded-lg p-4 mb-3`}
                >
                  <View className="flex-row items-start mb-2">
                    <Text className="text-2xl mr-3">{getTransactionIcon(transaction.type)}</Text>
                    <View className="flex-1">
                      <Text className="text-gray-900 dark:text-white font-semibold mb-1">
                        {transaction.productName}
                      </Text>
                      <Text className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                        {transaction.description}
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <Text className="text-gray-600 dark:text-gray-400 text-xs">
                          SKU: {transaction.productSku}
                        </Text>
                        <Text className="text-gray-600 dark:text-gray-400 text-xs">
                          {formatDate(transaction.timestamp)}
                        </Text>
                      </View>
                      {transaction.previousQuantity !== undefined && transaction.newQuantity !== undefined && (
                        <View className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                          <Text className="text-xs text-gray-600 dark:text-gray-400">
                            Stock: {transaction.previousQuantity} → {transaction.newQuantity}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {totalPages > 1 && (
              <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <TouchableOpacity
                  onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? 'bg-gray-300 dark:bg-gray-700'
                      : 'bg-blue-600 dark:bg-blue-500'
                  }`}
                >
                  <Text className={`font-semibold ${
                    currentPage === 1 ? 'text-gray-500' : 'text-white'
                  }`}>
                    Previous
                  </Text>
                </TouchableOpacity>

                <Text className="text-gray-700 dark:text-gray-300 font-semibold">
                  Page {currentPage} of {totalPages}
                </Text>

                <TouchableOpacity
                  onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'bg-gray-300 dark:bg-gray-700'
                      : 'bg-blue-600 dark:bg-blue-500'
                  }`}
                >
                  <Text className={`font-semibold ${
                    currentPage === totalPages ? 'text-gray-500' : 'text-white'
                  }`}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Text className="text-center text-gray-600 dark:text-gray-400 text-sm">
                Total Transactions: {transactions.length}
              </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
