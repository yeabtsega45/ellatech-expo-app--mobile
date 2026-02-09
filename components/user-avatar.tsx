import { useApp } from '@/context/AppContext';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export function UserAvatar() {
  const { users, logout } = useApp();
  const [open, setOpen] = useState(false);

  const activeUser = users[0];

  const initials = useMemo(() => {
    if (!activeUser?.fullName) return '?';
    const parts = activeUser.fullName.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts[parts.length - 1]?.[0] ?? '';
    return (first + last).toUpperCase();
  }, [activeUser?.fullName]);

  if (!activeUser) {
    return null;
  }

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <View className="relative mr-3">
      <TouchableOpacity
        onPress={() => setOpen(prev => !prev)}
        className="h-9 w-9 rounded-full bg-ellatech-primary items-center justify-center border border-white/40"
        activeOpacity={0.8}
      >
        <Text className="text-xs font-semibold text-white">
          {initials}
        </Text>
      </TouchableOpacity>

      {open && (
        <View className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-ellatech-bgCard border border-slate-200 dark:border-slate-700 shadow-lg p-3 z-50">
          <Text className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Signed in as
          </Text>
          <Text className="text-sm font-semibold text-slate-900 dark:text-white mb-3" numberOfLines={1}>
            {activeUser.fullName}
          </Text>

          <TouchableOpacity
            onPress={handleLogout}
            className="mt-1 rounded-lg bg-red-600 dark:bg-red-500 py-2 px-3 items-center active:bg-red-700 dark:active:bg-red-600"
          >
            <Text className="text-xs font-semibold text-white">
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

