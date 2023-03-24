import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';


import AppRoutes from './Routes';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AppRoutes />
      </PaperProvider>
    </NavigationContainer>
  );
}

