
import AppNavigator from './src/navigation/AppNavigator';
import { RoleProvider } from './src/contexts/RoleContext';

function App() {

  return (
    <RoleProvider>
      <AppNavigator/>
    </RoleProvider>
  );
}


export default App;
