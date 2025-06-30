import React, { useState } from 'react';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useTheme, type ThemeMode } from 'theme/ThemeContext';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'router/routes';
import { NavigationParamList } from 'types/navigator.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonStyles } from 'theme/common.styles';

interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: string;
}

const themeOptions: ThemeOption[] = [
  { mode: 'light', label: 'Light', icon: '☀️' },
  { mode: 'dark', label: 'Dark', icon: '🌙' },
  { mode: 'system', label: 'System', icon: '⚙️' },
];

export const ThemeToggle: React.FC = () => {
  const { colors, mode, setThemeMode } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleThemeChange = (selectedMode: ThemeMode) => {
    setThemeMode(selectedMode);
  };

  const handleRegister = () => {
    navigation.navigate(Routes.REGISTER);
  };

  const handleLogin = () => {
    // Here you can add login logic
    // For now, we'll navigate to MAIN_ROUTER
    navigation.navigate(Routes.MAIN_ROUTER);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Theme Preference
      </Text>
      <View style={styles.optionsContainer}>
        {themeOptions.map(option => (
          <TouchableOpacity
            key={option.mode}
            style={[
              styles.option,
              {
                backgroundColor:
                  mode === option.mode
                    ? colors.primary
                    : colors.backgroundSecondary,
                borderColor: colors.border,
              },
            ]}
            onPress={() => handleThemeChange(option.mode)}
          >
            <Text style={styles.icon}>{option.icon}</Text>
            <Text
              style={[
                typography.FootnoteBold12,
                {
                  color: mode === option.mode ? colors.surface : colors.text,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.registerButton,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.primary,
              },
            ]}
            onPress={handleRegister}
          >
            <Text
              style={[typography.HeadlineMedium16, { color: colors.primary }]}
            >
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={handleLogin}
          >
            <Text
              style={[typography.HeadlineMedium16, { color: colors.surface }]}
            >
              Login
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
    ...typography.HeadlineBold18,
    marginBottom: scale.vertical(16),
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: scale.vertical(12),
  },
  option: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
  },
  icon: {
    ...typography.HeadlineRegular24,
    marginBottom: scale.vertical(8),
  },
  formContainer: {
    marginTop: scale.vertical(24),
  },
  input: {
    borderWidth: 1,
    borderRadius: scale.moderate(8),
    marginBottom: scale.vertical(12),
    paddingHorizontal: scale.horizontal(16),
    paddingVertical: scale.vertical(12),
    ...typography.BodyRegular16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: scale.horizontal(12),
    marginTop: scale.vertical(8),
  },
  button: {
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
    ...CommonStyles.flexAlignJustifyCenter,
  },
  registerButton: {
    borderWidth: 1,
  },
});
