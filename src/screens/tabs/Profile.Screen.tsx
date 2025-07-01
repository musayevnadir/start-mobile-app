import React from 'react';
import { Routes } from 'router/routes';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useTheme } from 'theme/ThemeContext';
import { logout } from 'store/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { CommonStyles } from 'theme/common.styles';
import { ThemeToggle } from 'components/ThemeToggle';
import { ReusableButton } from 'components/ReusableButton';
import { NavigationParamList } from 'types/navigator.types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector, selectUser } from 'store';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const ProfileScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.PROFILE>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    Alert.alert(t('AUTH.LOG_OUT'), t('AUTH.LOG_OUT_CONFIRMATION'), [
      {
        text: t('COMMON.CANCEL'),
        style: 'cancel',
      },
      {
        text: t('AUTH.LOG_OUT'),
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

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
            {t('MAIN.PROFILE_SCREEN')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {user
              ? `${user.firstName} ${user.lastName}`
              : t('MAIN.MANAGE_YOUR_PROFILE')}
          </Text>
          {user && (
            <Text style={[styles.email, { color: colors.textSecondary }]}>
              {user.email}
            </Text>
          )}
        </View>
        <ThemeToggle />
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
        <View>
          <ReusableButton
            variant="secondary"
            title={t('AUTH.LOG_OUT')}
            onPress={handleLogout}
            customStyles={{
              container: {
                borderWidth: 1,
                borderColor: colors.border,
                marginTop: scale.vertical(24),
              },
            }}
          />
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
  email: {
    textAlign: 'center',
    ...typography.FootnoteRegular12,
    marginTop: scale.vertical(4),
    opacity: 0.8,
  },
  buttonsContainer: {
    gap: scale.vertical(16),
    marginTop: scale.vertical(16),
  },
});
