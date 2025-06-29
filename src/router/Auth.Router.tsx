import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigator.types';
import { Routes } from './routes';
import { LoginScreen } from 'screens/auth/Login.Screen';
import { RegisterScreen } from 'screens/auth/Register.Screen';
import { authScreenOptions, screenOptions } from 'configs/navigation.configs';

const AuthStack = createNativeStackNavigator<NavigationParamList>();

export const AuthRouter: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={Routes.LOGIN}
      screenOptions={authScreenOptions}
    >
      <AuthStack.Screen
        name={Routes.LOGIN}
        component={LoginScreen}
        options={screenOptions}
      />
      <AuthStack.Screen name={Routes.REGISTER} component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};
