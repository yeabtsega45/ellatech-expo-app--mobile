import { useApp } from '@/context/AppContext';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterUserScreen() {
  const { registerUser, users } = useApp();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  // If a user is already registered, don't stay on this screen
  if (users.length > 0) {
    return <Redirect href="/(tabs)" />;
  }

  const handleSubmit = () => {
    setError('');
    const result = registerUser(email, fullName);
    
    if (result.success) {
      Alert.alert('Success', 'User registered successfully!');
      setEmail('');
      setFullName('');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-ellatech-bgDark">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Register User
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-6">
          Create a new user account
        </Text>

        {error ? (
          <View className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg p-4 mb-4">
            <Text className="text-red-700 dark:text-red-400">{error}</Text>
          </View>
        ) : null}

        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </Text>
          <TextInput
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
            placeholder="user@example.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </Text>
          <TextInput
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
            placeholder="John Doe"
            placeholderTextColor="#9CA3AF"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-ellatech-primary dark:bg-ellatech-primary rounded-lg py-4 px-6 active:bg-ellatech-primaryDark dark:active:bg-ellatech-primaryDark"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Register User
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
