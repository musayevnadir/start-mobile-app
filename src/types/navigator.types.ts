import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from 'router/routes';

export type AppNavigation = NativeStackNavigationProp<NavigationParamList>;

export type NavigationParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.REGISTER]: undefined;
  [Routes.AUTH_ROUTER]: undefined;
  [Routes.MAIN_ROUTER]: undefined;
  [Routes.TAB_ROUTER]: undefined;
  [Routes.MAIN]: undefined;
  [Routes.PROFILE]: undefined;
  [Routes.LIST]: undefined;
  [Routes.DETAIL]: undefined;
};
