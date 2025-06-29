import { View, Text } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigator.types';
import { Routes } from 'router/routes';

export const ListScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.LIST>
> = () => {
  return (
    <View>
      <Text>ListScreen</Text>
    </View>
  );
};
