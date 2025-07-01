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

export const getTabBarScreenOptions = (
  colors: any,
): BottomTabNavigationOptions => ({
  headerShown: false,
  animation: 'none',
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: true,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textSecondary,
  tabBarStyle: {
    height: Platform.OS === 'ios' ? scale.vertical(90) : scale.vertical(80),
    paddingTop: 10,
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  tabBarButton,
});

export const tabBarOption = {
  [Routes.MAIN]: {
    title: 'Main',
    tabBarIcon: renderTabIcon(Routes.MAIN),
  } as BottomTabNavigationOptions,
  [Routes.PROFILE]: {
    title: 'Profile',
    tabBarIcon: renderTabIcon(Routes.PROFILE),
  },
};

export const getTabBarOption = (t: (key: string) => string) => ({
  [Routes.MAIN]: {
    title: t('NAVIGATION.MAIN'),
    tabBarIcon: renderTabIcon(Routes.MAIN),
  } as BottomTabNavigationOptions,
  [Routes.PROFILE]: {
    title: t('NAVIGATION.PROFILE'),
    tabBarIcon: renderTabIcon(Routes.PROFILE),
  },
});
