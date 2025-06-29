import { scale } from 'theme/metrics';
import { Platform, Pressable } from 'react-native';
import { Routes } from 'router/routes';
import { SvgImage } from 'components/SvgImage';
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const iconSize = 24;

export const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: Platform.select({ ios: 'default', android: 'slide_from_right' }),
  navigationBarHidden: true,
};

export const authScreenOptions: NativeStackNavigationOptions = {
  ...screenOptions,
  contentStyle: {
    // backgroundColor: 'red',
    paddingHorizontal: scale.horizontal(16),
    paddingTop: scale.vertical(100),
  },
};

const tabIconConfig = {
  [Routes.MAIN]: require('assets/vectors/home.svg'),
  [Routes.PROFILE]: require('assets/vectors/profile.svg'),
};

const renderTabIcon =
  (routeName: Routes.MAIN | Routes.PROFILE) =>
  ({ color }: { color: string }) => {
    return (
      <SvgImage
        color={color}
        width={iconSize}
        height={iconSize}
        source={tabIconConfig[routeName]}
      />
    );
  };

const tabBarButton = (props: BottomTabBarButtonProps) => {
  return (
    <Pressable {...(props as any)} android_ripple={{ color: 'transparent' }} />
  );
};

export const tabBarScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  animation: 'none',
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  tabBarActiveTintColor: 'blue',
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    height: Platform.OS === 'ios' ? scale.vertical(90) : scale.vertical(80),
    paddingTop: 10,
    elevation: 0,
    shadowOpacity: 0,
    // backgroundColor: colors.neutral[900],
  },
  tabBarButton,
};

export const tabBarOption = {
  [Routes.MAIN]: {
    tabBarIcon: renderTabIcon(Routes.MAIN),
  } as BottomTabNavigationOptions,
  [Routes.PROFILE]: {
    tabBarIcon: renderTabIcon(Routes.PROFILE),
  },
};
