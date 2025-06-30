import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigator.types';
import { Routes } from 'router/routes';
import { useTheme } from 'theme/ThemeContext';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { CommonStyles } from 'theme/common.styles';
import { SvgImage } from 'components/SvgImage';

const listItems = [
  {
    id: 1,
    title: 'Item 1',
    description: 'Description for item 1',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Item 2',
    description: 'Description for item 2',
    status: 'Pending',
  },
  {
    id: 3,
    title: 'Item 3',
    description: 'Description for item 3',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Item 4',
    description: 'Description for item 4',
    status: 'Active',
  },
];

export const ListScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.LIST>
> = ({ navigation }) => {
  const { colors } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return colors.success || colors.primary;
      case 'Pending':
        return '#FFA500';
      case 'Completed':
        return '#007AFF';
      default:
        return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        style={CommonStyles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            List Screen
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Browse through the list of items and manage them efficiently.
          </Text>
        </View>

        <View style={styles.listContainer}>
          {listItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.listItem,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => navigation.navigate(Routes.DETAIL)}
              activeOpacity={0.8}
            >
              <View style={CommonStyles.flex}>
                <Text style={[styles.itemTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.itemDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  {item.description}
                </Text>
                <Text
                  style={[
                    typography.BodyMedium14,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  ● {item.status}
                </Text>
              </View>
              <Text
                style={[
                  typography.HeadlineRegular20,
                  { color: colors.textSecondary },
                ]}
              >
                →
              </Text>
            </TouchableOpacity>
          ))}
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
  container: {
    flex: 1,
    padding: scale.moderate(20),
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
    ...typography.BodyRegular14,
    textAlign: 'center',
    lineHeight: scale.vertical(20),
  },
  listContainer: {
    flex: 1,
    marginBottom: scale.vertical(20),
  },
  listItem: {
    ...CommonStyles.alignCenterRow,
    padding: scale.vertical(16),
    borderRadius: scale.moderate(12),
    marginBottom: scale.vertical(12),
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemTitle: {
    ...typography.HeadlineMedium16,
    marginBottom: scale.vertical(4),
  },
  itemDescription: {
    ...typography.BodyRegular14,
    marginBottom: scale.vertical(6),
    lineHeight: scale.vertical(18),
  },
  backButton: {
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
    ...CommonStyles.alignJustifyCenterRow,
    gap: scale.horizontal(12),
  },
  backButtonText: {
    textAlign: 'center',
    ...typography.HeadlineMedium16,
  },
  buttonText: {
    textAlign: 'center',
    ...typography.HeadlineMedium16,
  },
});
