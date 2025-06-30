import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Routes } from 'router/routes';
import { scale } from 'theme/metrics';
import { useTheme } from 'theme/ThemeContext';
import { NavigationParamList } from 'types/navigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { typography } from 'theme/typograpy';
import { CommonStyles } from 'theme/common.styles';

export const MainScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.MAIN>
> = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[CommonStyles.flex, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={CommonStyles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            Main Screen
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Welcome to the main screen. Navigate to other sections using the
            buttons below.
          </Text>
        </View>

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
              Go to Detail Screen
            </Text>
            <Text style={[styles.buttonSubtext, { color: colors.surface }]}>
              View detailed information
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(Routes.LIST)}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.buttonIcon, { color: colors.surface }]}>
              📋
            </Text>
            <Text style={[styles.buttonText, { color: colors.surface }]}>
              Go to List Screen
            </Text>
            <Text style={[styles.buttonSubtext, { color: colors.surface }]}>
              Browse items list
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  button: {
    padding: scale.vertical(20),
    borderRadius: scale.moderate(12),
    alignItems: 'center',
    minHeight: scale.vertical(100),
    justifyContent: 'center',
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
    ...typography.HeadlineMedium16,
    marginBottom: scale.vertical(4),
    textAlign: 'center',
  },
  buttonSubtext: {
    textAlign: 'center',
    ...typography.FootnoteRegular12,
    opacity: 0.9,
  },
});
