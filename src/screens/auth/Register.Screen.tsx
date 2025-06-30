import React, { useState } from 'react';
import { Routes } from 'router/routes';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useTheme } from 'theme/ThemeContext';
import { CommonStyles } from 'theme/common.styles';
import { NavigationParamList } from 'types/navigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const RegisterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.REGISTER>
> = ({ navigation }) => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    // Add registration logic here
    console.log('Register:', formData);
    // Navigate to login or main app
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[CommonStyles.flex, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.formCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Create Account
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sign up to get started
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            value={formData.firstName}
            placeholder="First Name"
            placeholderTextColor={colors.textSecondary}
            onChangeText={value => handleInputChange('firstName', value)}
            autoCapitalize="words"
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            value={formData.lastName}
            placeholder="Last Name"
            placeholderTextColor={colors.textSecondary}
            onChangeText={value => handleInputChange('lastName', value)}
            autoCapitalize="words"
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            value={formData.email}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            onChangeText={value => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            value={formData.password}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            onChangeText={value => handleInputChange('password', value)}
            secureTextEntry
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor={colors.textSecondary}
            onChangeText={value => handleInputChange('confirmPassword', value)}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.registerButton,
              {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={handleRegister}
          >
            <Text
              style={[typography.HeadlineMedium16, { color: colors.surface }]}
            >
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.loginButton,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={[typography.HeadlineMedium16, { color: colors.primary }]}
            >
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: scale.horizontal(16),
  },
  formCard: {
    padding: scale.vertical(24),
    borderRadius: scale.moderate(12),
  },
  title: {
    textAlign: 'center',
    ...typography.HeadlineBold18,
    marginBottom: scale.vertical(8),
  },
  subtitle: {
    ...typography.BodyRegular16,
    textAlign: 'center',
    marginBottom: scale.vertical(24),
  },
  inputContainer: {
    marginBottom: scale.vertical(24),
  },
  input: {
    borderWidth: 1,
    borderRadius: scale.moderate(8),
    marginBottom: scale.vertical(16),
    paddingHorizontal: scale.horizontal(16),
    paddingVertical: scale.vertical(12),
    ...typography.BodyRegular16,
  },
  buttonContainer: {
    gap: scale.vertical(12),
  },
  registerButton: {
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
    ...CommonStyles.flexAlignJustifyCenter,
  },
  loginButton: {
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
    borderWidth: 1,
    ...CommonStyles.flexAlignJustifyCenter,
  },
});
