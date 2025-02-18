import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Create() {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View className="flex-1">
      <LinearGradient colors={['#ff0000', '#800080', '#00008B']} style={StyleSheet.absoluteFill}>
        <View className="p-4" style={{ paddingTop: top, paddingBottom: bottom }}>
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Entypo
              name="cross"
              size={24}
              color="white"
              onPress={() => router.back()}
              className="rounded-full bg-zinc-700/30 p-2"
            />
            <Pressable className="rounded-full bg-white p-3 px-6">
              <Text className="font-bold text-zinc-900">Preview</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
