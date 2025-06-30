import React from 'react';
import { Routes } from 'router/routes';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NavigationParamList } from 'types/navigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from 'theme/ThemeContext';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { CommonStyles } from 'theme/common.styles';
import { SvgImage } from 'components/SvgImage';

export const DetailScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.DETAIL>
> = ({ navigation }) => {
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
            Detail Screen
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            This is the detail screen with comprehensive information about the
            selected item.
          </Text>
        </View>

        <View style={[styles.content, { backgroundColor: colors.surface }]}>
          <Text style={[styles.contentTitle, { color: colors.text }]}>
            📄 Item Details
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Here you can view detailed information about the selected item. This
            screen provides comprehensive data and options for managing the
            item.
          </Text>

          <View style={styles.infoContainer}>
            <View
              style={[styles.infoRow, { borderBottomColor: colors.border }]}
            >
              <Text
                style={[
                  typography.FootnoteBold12,
                  { color: colors.textSecondary },
                ]}
              >
                ID:
              </Text>
              <Text
                style={[typography.FootnoteRegular12, { color: colors.text }]}
              >
                DET001
              </Text>
            </View>
            <View
              style={[styles.infoRow, { borderBottomColor: colors.border }]}
            >
              <Text
                style={[
                  typography.FootnoteBold12,
                  { color: colors.textSecondary },
                ]}
              >
                Status:
              </Text>
              <Text
                style={[
                  typography.FootnoteRegular12,
                  { color: colors.primary },
                ]}
              >
                Active
              </Text>
            </View>
            <View
              style={[styles.infoRow, { borderBottomColor: colors.border }]}
            >
              <Text
                style={[
                  typography.FootnoteBold12,
                  { color: colors.textSecondary },
                ]}
              >
                Created:
              </Text>
              <Text
                style={[typography.FootnoteRegular12, { color: colors.text }]}
              >
                Today
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <SvgImage
            width={16}
            height={16}
            color={colors.surface}
            source={require('assets/vectors/arrow.goBack.svg')}
          />
          <Text style={[styles.backButtonText, { color: colors.surface }]}>
            Go Back
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    ...CommonStyles.flex,
    paddingTop: scale.vertical(16),
    paddingBottom: scale.vertical(12),
  },
  scrollContent: {
    flexGrow: 1,
    padding: scale.horizontal(16),
    paddingTop: scale.vertical(20),
  },
  header: {
    padding: scale.vertical(20),
    borderRadius: scale.moderate(12),
    marginBottom: scale.vertical(20),
  },
  title: {
    textAlign: 'center',
    ...typography.HeadlineBold18,
    marginBottom: scale.vertical(8),
  },
  subtitle: {
    textAlign: 'center',
    ...typography.FootnoteRegular12,
  },
  content: {
    padding: scale.vertical(20),
    borderRadius: scale.moderate(12),
    marginBottom: scale.vertical(20),
  },
  contentTitle: {
    ...typography.HeadlineBold18,
    marginBottom: scale.vertical(12),
  },
  description: {
    ...typography.FootnoteRegular12,
    marginBottom: scale.vertical(20),
  },
  infoContainer: {
    gap: scale.vertical(8),
  },
  infoRow: {
    borderBottomWidth: 1,
    paddingVertical: scale.vertical(8),
    ...CommonStyles.justifyBetweenRow,
  },
  backButton: {
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
    ...CommonStyles.alignJustifyCenterRow,
    gap: scale.horizontal(12),
  },
  buttonText: {
    textAlign: 'center',
    ...typography.HeadlineMedium16,
  },
  backButtonText: {
    textAlign: 'center',
    ...typography.HeadlineMedium16,
  },
});
