import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigator.types';
import { Routes } from 'router/routes';
import { useTheme } from 'theme/ThemeContext';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { CommonStyles } from 'theme/common.styles';
import { ReusableButton } from 'components/ReusableButton';
import {
  useAppDispatch,
  useAppSelector,
  selectRepositories,
  selectRepositoriesLoading,
  selectRepositoriesRefreshing,
  selectRepositoriesError,
  selectSearchQuery,
  selectHasMore,
  selectCurrentPage,
} from 'store';
import {
  fetchRepositories,
  setCurrentRepository,
  setSearchQuery,
  clearRepositories,
  clearError,
} from 'store/slices/repositorySlice';
import { Repository } from 'services/api/github.api';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

const GITHUB_USERNAME = 'facebook';

export const ListScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.LIST>
> = ({ navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const repositories = useAppSelector(selectRepositories);
  const isLoading = useAppSelector(selectRepositoriesLoading);
  const isRefreshing = useAppSelector(selectRepositoriesRefreshing);
  const error = useAppSelector(selectRepositoriesError);
  const searchQuery = useAppSelector(selectSearchQuery);
  const hasMore = useAppSelector(selectHasMore);
  const currentPage = useAppSelector(selectCurrentPage);

  const [searchText, setSearchText] = useState(searchQuery);

  useEffect(() => {
    if (repositories.length === 0) {
      dispatch(fetchRepositories({ username: GITHUB_USERNAME }));
    }
  }, [dispatch, repositories.length]);

  useEffect(() => {
    if (error) {
      Alert.alert(t('COMMON.ERROR'), error, [
        { text: t('COMMON.OK'), onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [error, dispatch, t]);

  const handleRefresh = useCallback(() => {
    dispatch(
      fetchRepositories({
        username: GITHUB_USERNAME,
        page: 1,
        query: searchQuery,
        refresh: true,
      }),
    );
  }, [dispatch, searchQuery]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(
        fetchRepositories({
          username: GITHUB_USERNAME,
          page: currentPage + 1,
          query: searchQuery,
        }),
      );
    }
  }, [dispatch, isLoading, hasMore, currentPage, searchQuery]);

  const handleSearch = useCallback(() => {
    dispatch(setSearchQuery(searchText));
    dispatch(clearRepositories());
    dispatch(
      fetchRepositories({
        username: GITHUB_USERNAME,
        page: 1,
        query: searchText.trim(),
      }),
    );
  }, [dispatch, searchText]);

  const handleClearSearch = useCallback(() => {
    setSearchText('');
    dispatch(setSearchQuery(''));
    dispatch(clearRepositories());
    dispatch(fetchRepositories({ username: GITHUB_USERNAME, page: 1 }));
  }, [dispatch]);

  const handleRepositoryPress = useCallback(
    (repository: Repository) => {
      dispatch(setCurrentRepository(repository));
      navigation.navigate(Routes.DETAIL);
    },
    [dispatch, navigation],
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const renderRepository = ({ item }: { item: Repository }) => (
    <TouchableOpacity
      style={[
        styles.repositoryItem,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
      onPress={() => handleRepositoryPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.repositoryHeader}>
        <Text
          numberOfLines={1}
          style={[styles.repoName, { color: colors.text }]}
        >
          {item.name}
        </Text>
        <View style={CommonStyles.alignJustifyCenterRow}>
          <Text style={[styles.repoLanguage, { color: colors.primary }]}>
            {item.language || t('LIST.UNKNOWN_LANGUAGE')}
          </Text>
          <Text
            style={[
              styles.arrow,
              typography.HeadlineRegular20,
              { color: colors.textSecondary },
            ]}
          >
            →
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={2}
        style={[styles.repoDescription, { color: colors.textSecondary }]}
      >
        {item.description || t('LIST.NO_DESCRIPTION')}
      </Text>
      <View style={styles.repoStats}>
        <View style={styles.statItem}>
          <Text
            style={[
              typography.FootnoteRegular12,
              { color: colors.textSecondary },
            ]}
          >
            ⭐
          </Text>
          <Text
            style={[
              typography.FootnoteRegular12,
              { color: colors.textSecondary },
            ]}
          >
            {formatNumber(item.stargazers_count)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text
            style={[
              typography.FootnoteRegular12,
              { color: colors.textSecondary },
            ]}
          >
            🍴
          </Text>
          <Text
            style={[
              typography.FootnoteRegular12,
              { color: colors.textSecondary },
            ]}
          >
            {formatNumber(item.forks_count)}
          </Text>
        </View>
        <Text style={[styles.updatedText, { color: colors.textSecondary }]}>
          {t('LIST.UPDATED')} {formatDate(item.updated_at)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoading || repositories.length === 0) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text
          style={[typography.BodyRegular14, { color: colors.textSecondary }]}
        >
          {t('LIST.LOADING_MORE')}
        </Text>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyIcon, { color: colors.textSecondary }]}>
        📚
      </Text>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        {t('LIST.NO_REPOSITORIES_FOUND')}
      </Text>
      <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
        {searchQuery
          ? t('LIST.TRY_DIFFERENT_SEARCH')
          : t('LIST.UNABLE_TO_LOAD')}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t('LIST.GITHUB_REPOSITORIES')}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {GITHUB_USERNAME}
          {t('LIST.REPOSITORIES_SUBTITLE')}
        </Text>
      </View>
      <View
        style={[styles.searchContainer, { backgroundColor: colors.surface }]}
      >
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          value={searchText}
          returnKeyType="search"
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          placeholder={t('LIST.SEARCH_PLACEHOLDER')}
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSearch}
          style={[styles.searchButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[typography.BodyMedium14, { color: colors.surface }]}>
            {t('LIST.SEARCH')}
          </Text>
        </TouchableOpacity>
        {searchQuery ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleClearSearch}
            style={[
              styles.clearButton,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <Text
              style={[
                typography.BodyRegular14,
                { color: colors.textSecondary },
              ]}
            >
              {t('LIST.CLEAR')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        data={repositories}
        renderItem={renderRepository}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
      />
      {isLoading && repositories.length === 0 && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={[typography.BodyRegular14, { color: colors.textSecondary }]}
          >
            {t('LIST.LOADING_REPOSITORIES')}
          </Text>
        </View>
      )}
      <ReusableButton
        variant="back"
        title={t('MAIN.GO_BACK')}
        onPress={() => navigation.goBack()}
        icon={require('assets/vectors/arrow.goBack.svg')}
        fullWidth={false}
        customStyles={{
          container: {
            marginHorizontal: scale.horizontal(16),
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    ...CommonStyles.flex,
    paddingTop: scale.vertical(16),
    paddingBottom: scale.vertical(18),
  },
  header: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: scale.vertical(20),
    borderRadius: scale.moderate(12),
    marginBottom: scale.vertical(16),
    marginHorizontal: scale.horizontal(16),
  },
  title: {
    textAlign: 'center',
    ...typography.HeadlineBold18,
    marginBottom: scale.vertical(4),
  },
  subtitle: {
    textAlign: 'center',
    ...typography.BodyRegular14,
  },
  searchContainer: {
    gap: scale.horizontal(8),
    paddingVertical: scale.vertical(12),
    paddingHorizontal: scale.horizontal(16),
    ...CommonStyles.alignCenterRow,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale.moderate(8),
    paddingHorizontal: scale.horizontal(12),
    paddingVertical: scale.vertical(10),
    ...typography.BodyRegular14,
  },
  searchButton: {
    paddingHorizontal: scale.horizontal(16),
    paddingVertical: scale.vertical(10),
    borderRadius: scale.moderate(8),
  },
  clearButton: {
    paddingHorizontal: scale.horizontal(12),
    paddingVertical: scale.vertical(10),
    borderRadius: scale.moderate(8),
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: scale.horizontal(16),
  },
  repositoryItem: {
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
    padding: scale.vertical(16),
    borderRadius: scale.moderate(12),
    marginBottom: scale.vertical(12),
  },
  repositoryHeader: {
    marginBottom: scale.vertical(8),
    ...CommonStyles.alignCenterJustifyBetweenRow,
  },
  arrow: {
    position: 'relative',
    bottom: 8,
  },
  repoName: {
    flex: 1,
    ...typography.HeadlineMedium16,
    marginRight: scale.horizontal(8),
  },
  repoLanguage: {
    ...typography.FootnoteBold12,
    paddingHorizontal: scale.horizontal(8),
    paddingVertical: scale.vertical(4),
    borderRadius: scale.moderate(4),
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  repoDescription: {
    ...typography.BodyRegular14,
    lineHeight: scale.vertical(20),
    marginBottom: scale.vertical(12),
  },
  repoStats: {
    gap: scale.horizontal(16),
    ...CommonStyles.alignCenterRow,
  },
  statItem: {
    gap: scale.horizontal(4),
    ...CommonStyles.alignCenterRow,
  },
  updatedText: {
    marginLeft: 'auto',
    ...typography.FootnoteRegular12,
  },
  footerLoader: {
    alignItems: 'center',
    gap: scale.vertical(8),
    paddingVertical: scale.vertical(20),
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    gap: scale.vertical(12),
    ...CommonStyles.alignJustifyCenter,
  },
  emptyState: {
    paddingVertical: scale.vertical(60),
    ...CommonStyles.flexAlignJustifyCenter,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: scale.vertical(16),
  },
  emptyTitle: {
    ...typography.HeadlineMedium16,
    marginBottom: scale.vertical(8),
  },
  emptyDescription: {
    textAlign: 'center',
    ...typography.BodyRegular14,
  },
  backButton: {
    gap: scale.horizontal(8),
    padding: scale.vertical(16),
    marginTop: scale.vertical(16),
    borderRadius: scale.moderate(8),
    marginHorizontal: scale.horizontal(16),
    ...CommonStyles.alignJustifyCenterRow,
  },
});
