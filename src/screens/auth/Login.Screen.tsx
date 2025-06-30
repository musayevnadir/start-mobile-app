import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Routes } from 'router/routes';
import { NavigationParamList } from 'types/navigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { scale } from 'theme/metrics';
import { useTheme } from 'theme/ThemeContext';
import { ThemeToggle } from 'components/ThemeToggle';
import { QuickThemeToggle } from 'components/QuickThemeToggle';
import { CommonStyles } from 'theme/common.styles';
import { typography } from 'theme/typograpy';

export const LoginScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.LOGIN>
> = () => {
  const { colors } = useTheme();

  return (
    <View style={[CommonStyles.flex, { backgroundColor: colors.background }]}>
      <ScrollView
        style={CommonStyles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Start Mobile App!
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sign in to your account
            </Text>
          </View>
          <QuickThemeToggle />
        </View>
        <ThemeToggle />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: scale.vertical(20),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: scale.vertical(40),
    marginBottom: scale.vertical(20),
  },
  header: {
    flex: 1,
    marginRight: scale.horizontal(16),
  },
  title: {
    textAlign: 'center',
    ...typography.LargeTitleRegular40,
    marginBottom: scale.vertical(8),
  },
  subtitle: {
    textAlign: 'center',
    ...typography.HeadlineRegular16,
    marginBottom: scale.vertical(16),
  },
});
