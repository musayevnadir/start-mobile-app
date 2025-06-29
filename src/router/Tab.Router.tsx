import { Routes } from './routes';
import { MainScreen } from 'screens/tabs/Main.Screen';
import { NavigationParamList } from 'types/navigator.types';
import { ProfileScreen } from 'screens/tabs/Profile.Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabBarOption, tabBarScreenOptions } from 'configs/navigation.configs';

const TabStack = createBottomTabNavigator<NavigationParamList>();

export const TabRouter: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.TAB_ROUTER>
> = () => {
  return (
    <TabStack.Navigator
      initialRouteName={Routes.MAIN}
      screenOptions={tabBarScreenOptions}
    >
      <TabStack.Screen
        name={Routes.MAIN}
        component={MainScreen}
        options={tabBarOption[Routes.MAIN]}
      />
      <TabStack.Screen
        name={Routes.PROFILE}
        component={ProfileScreen}
        options={tabBarOption[Routes.PROFILE]}
      />
    </TabStack.Navigator>
  );
};
