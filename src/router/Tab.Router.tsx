import { Routes } from './routes';
import { useTranslation } from 'react-i18next';
import { MainScreen } from 'screens/tabs/Main.Screen';
import { NavigationParamList } from 'types/navigator.types';
import { ProfileScreen } from 'screens/tabs/Profile.Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  getTabBarScreenOptions,
  getTabBarOption,
} from 'configs/navigation.configs';
import { useTheme } from 'theme/ThemeContext';

const TabStack = createBottomTabNavigator<NavigationParamList>();

export const TabRouter: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.TAB_ROUTER>
> = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const tabBarOptions = getTabBarOption(t);

  return (
    <TabStack.Navigator
      initialRouteName={Routes.MAIN}
      screenOptions={getTabBarScreenOptions(colors)}
    >
      <TabStack.Screen
        name={Routes.MAIN}
        component={MainScreen}
        options={tabBarOptions[Routes.MAIN]}
      />
      <TabStack.Screen
        name={Routes.PROFILE}
        component={ProfileScreen}
        options={tabBarOptions[Routes.PROFILE]}
      />
    </TabStack.Navigator>
  );
};
