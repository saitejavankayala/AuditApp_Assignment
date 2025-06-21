
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { RoleProvider } from './src/contexts/RoleContext';

function App() {
  const isDarkMode = useColorScheme() === 'light';

  return (
    <RoleProvider>
      <AppNavigator/>
    </RoleProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
