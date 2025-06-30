import { Routes } from './routes';
import { TabRouter } from './Tab.Router';
import { MainScreen } from 'screens/tabs/Main.Screen';
import { screenOptions } from 'configs/navigation.configs';
import { NavigationParamList } from 'types/navigator.types';
import { ProfileScreen } from 'screens/tabs/Profile.Screen';
import { DetailScreen } from 'screens/others/Detail.Screen';
import { ListScreen } from 'screens/others/List.Screen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainStack = createNativeStackNavigator<NavigationParamList>();

export const MainRouter: React.FC = () => {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.TAB_ROUTER}
      screenOptions={screenOptions}
    >
      <MainStack.Screen name={Routes.TAB_ROUTER} component={TabRouter} />
      <MainStack.Screen name={Routes.MAIN} component={MainScreen} />
      <MainStack.Screen name={Routes.PROFILE} component={ProfileScreen} />
      <MainStack.Screen name={Routes.DETAIL} component={DetailScreen} />
      <MainStack.Screen name={Routes.LIST} component={ListScreen} />
    </MainStack.Navigator>
  );
};
