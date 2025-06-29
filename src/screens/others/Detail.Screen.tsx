import React from 'react';
import { Routes } from 'router/routes';
import { View, Text } from 'react-native';
import { NavigationParamList } from 'types/navigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const DetailScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.DETAIL>
> = () => {
  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  );
};
