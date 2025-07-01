import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigator.types';
import { Routes } from 'router/routes';
import { useTheme } from 'theme/ThemeContext';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { ThemeToggle } from 'components/ThemeToggle';
import { CommonStyles } from 'theme/common.styles';

export const ProfileScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.PROFILE>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        style={CommonStyles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('MAIN.PROFILE_SCREEN')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('MAIN.MANAGE_YOUR_PROFILE')}
          </Text>
        </View>
        <ThemeToggle />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate(Routes.DETAIL)}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonIcon, { color: colors.surface }]}>
              📄
            </Text>
            <Text style={[styles.buttonText, { color: colors.surface }]}>
              {t('MAIN.GO_TO_DETAIL_SCREEN')}
            </Text>
            <Text style={[styles.buttonSubtext, { color: colors.surface }]}>
              {t('MAIN.VIEW_DETAILED_INFORMATION')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate(Routes.LIST)}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonIcon, { color: colors.surface }]}>
              📋
            </Text>
            <Text style={[styles.buttonText, { color: colors.surface }]}>
              {t('MAIN.GO_TO_LIST_SCREEN')}
            </Text>
            <Text style={[styles.buttonSubtext, { color: colors.surface }]}>
              {t('MAIN.BROWSE_ITEMS_LIST')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    ...CommonStyles.flex,
    paddingTop: scale.vertical(16),
  },
  scrollContent: {
    flexGrow: 1,
    padding: scale.horizontal(16),
    paddingTop: scale.vertical(20),
  },
  header: {
    padding: scale.vertical(24),
    borderRadius: scale.moderate(12),
    marginBottom: scale.vertical(20),
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
  },
  buttonsContainer: {
    gap: scale.vertical(16),
    marginTop: scale.vertical(16),
  },
  button: {
    padding: scale.vertical(20),
    borderRadius: scale.moderate(12),
    ...CommonStyles.alignJustifyCenter,
    minHeight: scale.vertical(100),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  buttonIcon: {
    ...typography.HeadlineRegular24,
    marginBottom: scale.vertical(8),
  },
  buttonText: {
    textAlign: 'center',
    ...typography.HeadlineMedium16,
    marginBottom: scale.vertical(4),
  },
  buttonSubtext: {
    textAlign: 'center',
    ...typography.FootnoteRegular12,
    opacity: 0.9,
  },
  languageSection: {
    marginTop: scale.vertical(16),
    marginBottom: scale.vertical(16),
  },
  sectionTitle: {
    ...typography.HeadlineMedium16,
    marginBottom: scale.vertical(12),
  },
});
