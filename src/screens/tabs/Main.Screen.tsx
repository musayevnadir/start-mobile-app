import React from 'react';
import { Routes } from 'router/routes';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useTheme } from 'theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { CommonStyles } from 'theme/common.styles';
import { LanguageToggle } from 'components/LanguageToggle';
import { ReusableButton } from 'components/ReusableButton';
import { NavigationParamList } from 'types/navigator.types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const MainScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.MAIN>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.topHeader, { backgroundColor: colors.surface }]}>
        <Text style={[typography.HeadlineBold18, { color: colors.text }]}>
          {t('MAIN.MAIN_SCREEN')}
        </Text>
        <LanguageToggle />
      </View>
      <ScrollView
        style={CommonStyles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('MAIN.MAIN_SCREEN')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('MAIN.WELCOME_TO_MAIN_SCREEN')}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <ReusableButton
            icon="📄"
            variant="large"
            title={t('MAIN.GO_TO_DETAIL_SCREEN')}
            subtitle={t('MAIN.VIEW_DETAILED_INFORMATION')}
            onPress={() => navigation.navigate(Routes.DETAIL)}
          />
          <ReusableButton
            icon="📋"
            variant="large"
            title={t('MAIN.GO_TO_LIST_SCREEN')}
            subtitle={t('MAIN.BROWSE_ITEMS_LIST')}
            onPress={() => navigation.navigate(Routes.LIST)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    ...CommonStyles.flex,
    paddingTop: scale.vertical(22),
  },
  topHeader: {
    paddingHorizontal: scale.horizontal(16),
    paddingVertical: scale.vertical(12),
    ...CommonStyles.alignCenterJustifyBetweenRow,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scrollContent: {
    flexGrow: 1,
    padding: scale.horizontal(16),
    paddingTop: scale.vertical(20),
  },
  header: {
    padding: scale.vertical(24),
    borderRadius: scale.moderate(12),
    marginBottom: scale.vertical(24),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    textAlign: 'center',
    ...typography.HeadlineBold18,
    marginBottom: scale.vertical(8),
  },
  subtitle: {
    textAlign: 'center',
    ...typography.BodyRegular14,
    lineHeight: scale.vertical(20),
  },
  buttonsContainer: {
    gap: scale.vertical(16),
  },
});
