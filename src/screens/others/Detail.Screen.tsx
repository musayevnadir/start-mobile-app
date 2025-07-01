import React from 'react';
import { Routes } from 'router/routes';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Linking,
  Alert,
} from 'react-native';
import { scale } from 'theme/metrics';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'theme/ThemeContext';
import { typography } from 'theme/typograpy';
import { SvgImage } from 'components/SvgImage';
import { CommonStyles } from 'theme/common.styles';
import { ReusableButton } from 'components/ReusableButton';
import { NavigationParamList } from 'types/navigator.types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector, selectCurrentRepository } from 'store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const DetailScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.DETAIL>
> = ({ navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const currentRepository = useAppSelector(selectCurrentRepository);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  const formatNumber = (num: number) => num.toLocaleString();

  const handleOpenRepository = async () => {
    if (currentRepository?.html_url) {
      try {
        await Linking.openURL(currentRepository.html_url);
      } catch (error) {
        Alert.alert(t('DETAIL.ERROR'), t('DETAIL.UNABLE_TO_OPEN_URL'));
      }
    }
  };

  if (!currentRepository) {
    return (
      <SafeAreaView
        style={[styles.root, { backgroundColor: colors.background }]}
      >
        <View style={CommonStyles.flex}>
          <View style={styles.emptyState}>
            <Text style={[styles.emptyIcon, { color: colors.textSecondary }]}>
              📄
            </Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              {t('DETAIL.NO_REPOSITORY_SELECTED')}
            </Text>
            <Text
              style={[styles.emptyDescription, { color: colors.textSecondary }]}
            >
              {t('DETAIL.SELECT_REPOSITORY_MESSAGE')}
            </Text>
          </View>
          <ReusableButton
            variant="back"
            fullWidth={true}
            title={t('MAIN.GO_BACK')}
            onPress={() => navigation.goBack()}
            icon={require('assets/vectors/arrow.goBack.svg')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        style={CommonStyles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('DETAIL.REPOSITORY_DETAILS')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {currentRepository.full_name}
          </Text>
        </View>
        <View style={[styles.content, { backgroundColor: colors.surface }]}>
          <View style={styles.repositoryHeader}>
            <Text style={[styles.repoName, { color: colors.text }]}>
              � {currentRepository.name}
            </Text>
            {currentRepository.language && (
              <Text style={[styles.repoLanguage, { color: colors.primary }]}>
                {currentRepository.language}
              </Text>
            )}
          </View>
          {currentRepository.description && (
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {currentRepository.description}
            </Text>
          )}
          <View style={styles.statsContainer}>
            <View
              style={[
                styles.statCard,
                { backgroundColor: colors.backgroundSecondary },
              ]}
            >
              <Text style={[styles.statValue, { color: colors.text }]}>
                ⭐ {formatNumber(currentRepository.stargazers_count)}
              </Text>
              <Text
                style={[
                  typography.FootnoteRegular12,
                  { color: colors.textSecondary },
                ]}
              >
                {t('DETAIL.STARS')}
              </Text>
            </View>
            <View
              style={[
                styles.statCard,
                { backgroundColor: colors.backgroundSecondary },
              ]}
            >
              <Text style={[styles.statValue, { color: colors.text }]}>
                🍴 {formatNumber(currentRepository.forks_count)}
              </Text>
              <Text
                style={[
                  typography.FootnoteRegular12,
                  { color: colors.textSecondary },
                ]}
              >
                {t('DETAIL.FORKS')}
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View
              style={[styles.infoRow, { borderBottomColor: colors.border }]}
            >
              <Text
                style={[
                  CommonStyles.flex,
                  typography.FootnoteBold12,
                  { color: colors.textSecondary },
                ]}
              >
                {t('DETAIL.OWNER')}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {currentRepository.owner.login}
              </Text>
            </View>
            <View
              style={[styles.infoRow, { borderBottomColor: colors.border }]}
            >
              <Text
                style={[
                  CommonStyles.flex,
                  typography.FootnoteBold12,
                  { color: colors.textSecondary },
                ]}
              >
                {t('DETAIL.REPOSITORY_ID')}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {currentRepository.id}
              </Text>
            </View>
            <View
              style={[styles.infoRow, { borderBottomColor: colors.border }]}
            >
              <Text
                style={[
                  CommonStyles.flex,
                  typography.FootnoteBold12,
                  { color: colors.textSecondary },
                ]}
              >
                {t('DETAIL.CREATED')}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {formatDate(currentRepository.created_at)}
              </Text>
            </View>
            <View
              style={[styles.infoRow, { borderBottomColor: colors.border }]}
            >
              <Text
                style={[
                  CommonStyles.flex,
                  typography.FootnoteBold12,
                  { color: colors.textSecondary },
                ]}
              >
                {t('DETAIL.LAST_UPDATED')}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {formatDate(currentRepository.updated_at)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.openButton, { backgroundColor: colors.primary }]}
            onPress={handleOpenRepository}
            activeOpacity={0.8}
          >
            <Text
              style={[typography.HeadlineMedium16, { color: colors.surface }]}
            >
              {t('DETAIL.OPEN_REPOSITORY')}
            </Text>
          </TouchableOpacity>
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
          <Text
            style={[typography.HeadlineMedium16, { color: colors.surface }]}
          >
            {t('MAIN.GO_BACK')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: scale.vertical(16),
    paddingBottom: scale.vertical(32),
    paddingHorizontal: scale.horizontal(16),
    ...CommonStyles.flex,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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
    ...typography.FootnoteRegular12,
  },
  content: {
    padding: scale.vertical(20),
    borderRadius: scale.moderate(12),
    marginBottom: scale.vertical(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  repositoryHeader: {
    flexWrap: 'wrap',
    marginBottom: scale.vertical(16),
    ...CommonStyles.alignCenterJustifyBetweenRow,
  },
  repoName: {
    flex: 1,
    ...typography.HeadlineBold18,
    marginRight: scale.horizontal(12),
  },
  repoLanguage: {
    ...typography.FootnoteBold12,
    paddingHorizontal: scale.horizontal(12),
    paddingVertical: scale.vertical(6),
    borderRadius: scale.moderate(16),
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  description: {
    ...typography.BodyRegular14,
    lineHeight: scale.vertical(20),
    marginBottom: scale.vertical(20),
  },
  statsContainer: {
    flexDirection: 'row',
    gap: scale.horizontal(16),
    marginBottom: scale.vertical(24),
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: scale.vertical(16),
    borderRadius: scale.moderate(12),
  },
  statValue: {
    ...typography.HeadlineMedium16,
    marginBottom: scale.vertical(4),
  },
  infoContainer: {
    marginBottom: scale.vertical(24),
  },
  infoRow: {
    borderBottomWidth: 1,
    paddingVertical: scale.vertical(12),
    ...CommonStyles.alignCenterJustifyBetweenRow,
  },
  infoValue: {
    flex: 2,
    textAlign: 'right',
    ...typography.FootnoteRegular12,
  },
  openButton: {
    alignItems: 'center',
    padding: scale.vertical(16),
    borderRadius: scale.moderate(12),
  },
  backButton: {
    gap: scale.horizontal(8),
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
    ...CommonStyles.alignJustifyCenterRow,
  },
  emptyState: {
    flex: 1,
    padding: scale.horizontal(32),
    ...CommonStyles.flexAlignJustifyCenter,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: scale.vertical(16),
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: scale.vertical(8),
    ...typography.HeadlineBold18,
  },
  emptyDescription: {
    textAlign: 'center',
    ...typography.BodyRegular14,
    lineHeight: scale.vertical(20),
    marginBottom: scale.vertical(32),
  },
});
