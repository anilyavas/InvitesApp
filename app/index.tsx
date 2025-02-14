import { Redirect, Stack } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  return <Redirect href="/welcome" />;

  {
    /* 
  return (
    <View>
      <Stack.Screen options={{ title: 'Home' }} />
    </View>
  );*/
  }
}
