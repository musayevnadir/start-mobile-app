import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'router/routes';
import { NavigationParamList } from 'types/navigator.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'theme/ThemeContext';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { CommonStyles } from 'theme/common.styles';

export const LoginForm: React.FC = () => {
  const { colors } = useTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here you can add login logic
    // For now, we'll navigate to MAIN_ROUTER
    navigation.navigate(Routes.MAIN_ROUTER);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Sign in to continue
      </Text>
      <View style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          value={email}
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          onChangeText={setEmail}
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
          placeholder="Password"
          placeholderTextColor={colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={[typography.BodyRegular14, { color: colors.primary }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={handleLogin}
          >
            <Text
              style={[typography.HeadlineMedium16, { color: colors.surface }]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.registerButton,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => navigation.navigate(Routes.REGISTER)}
          >
            <Text
              style={[typography.HeadlineMedium16, { color: colors.primary }]}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale.vertical(20),
    borderRadius: scale.moderate(12),
    margin: scale.vertical(16),
  },
  title: {
    textAlign: 'center',
    ...typography.HeadlineBold18,
    marginBottom: scale.vertical(8),
  },
  subtitle: {
    textAlign: 'center',
    ...typography.BodyRegular16,
    marginBottom: scale.vertical(24),
  },
  formContainer: {
    marginTop: scale.vertical(8),
  },
  input: {
    borderWidth: 1,
    borderRadius: scale.moderate(8),
    marginBottom: scale.vertical(16),
    paddingHorizontal: scale.horizontal(16),
    paddingVertical: scale.vertical(12),
    ...typography.BodyRegular16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: scale.vertical(16),
  },
  buttonContainer: {
    gap: scale.vertical(12),
    marginTop: scale.vertical(8),
  },
  loginButton: {
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
    ...CommonStyles.flexAlignJustifyCenter,
  },
  registerButton: {
    borderWidth: 1,
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
    ...CommonStyles.flexAlignJustifyCenter,
  },
});
