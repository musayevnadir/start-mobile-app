import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from 'router/routes';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useTheme } from 'theme/ThemeContext';
import { LoginForm } from 'components/LoginForm';
import { CommonStyles } from 'theme/common.styles';
import { NavigationParamList } from 'types/navigator.types';
import { QuickThemeToggle } from 'components/QuickThemeToggle';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const LoginScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.LOGIN>
> = () => {
  const { t } = useTranslation();
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
              {t('AUTH.CHOOSE_YOUR_THEME_AND_SIGN_IN')}
            </Text>
          </View>
          <QuickThemeToggle />
        </View>
        <LoginForm />
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: scale.vertical(40),
    marginBottom: scale.vertical(20),
  },
  header: {
    flex: 1,
    marginRight: scale.horizontal(16),
  },
  title: {
    textAlign: 'center',
    ...typography.HeadlineRegular24,
    marginBottom: scale.vertical(8),
  },
  subtitle: {
    textAlign: 'center',
    ...typography.HeadlineRegular16,
    marginBottom: scale.vertical(16),
  },
});
