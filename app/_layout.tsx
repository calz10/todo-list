import { Stack } from "expo-router";
import ReduxProvider from '@/redux/provider'

export default function RootLayout() {
  return (
    <ReduxProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          title: 'Todos',
        }} />
        <Stack.Screen name="add-todo" options={{
          title: 'Add Todo',
          presentation: 'modal',
        }} />
      </Stack>
    </ReduxProvider>
  );
}
