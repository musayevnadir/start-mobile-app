import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SvgImage } from './SvgImage';
import { ReusableButton } from './ReusableButton';
import { scale } from 'theme/metrics';
import { Routes } from 'router/routes';
import { typography } from 'theme/typograpy';
import { useTheme } from 'theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NavigationParamList } from 'types/navigator.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  useAppDispatch,
  useAppSelector,
  selectLastOperationSuccess,
} from 'store';
import { login, clearLastOperationResult } from 'store/slices/authSlice';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const lastOperationSuccess = useAppSelector(selectLastOperationSuccess);

  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationParamList>>();

  const [email, setEmail] = useState('start.mobile.app@gmail.com');
  const [password, setPassword] = useState('Admin123!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (lastOperationSuccess === true && isLoggingIn) {
      setIsLoggingIn(false);
      Alert.alert(t('AUTH.SUCCESS'), t('AUTH.LOGIN_SUCCESS'));
      dispatch(clearLastOperationResult());
    } else if (lastOperationSuccess === false && isLoggingIn) {
      setIsLoggingIn(false);
      Alert.alert(t('AUTH.ERROR'), t('AUTH.INVALID_CREDENTIALS'));
      dispatch(clearLastOperationResult());
    }
  }, [lastOperationSuccess, isLoggingIn, t, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearLastOperationResult());
    };
  }, [dispatch]);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(t('AUTH.ERROR'), t('AUTH.FILL_ALL_FIELDS'));
      return;
    }
    setIsLoggingIn(true);
    dispatch(login({ email, password }));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t('AUTH.WELCOME_BACK')}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {t('AUTH.SIGN_IN_TO_CONTINUE')}
      </Text>
      <View style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: colors.backgroundSecondary,
            },
          ]}
          value={email}
          placeholder={t('AUTH.EMAIL')}
          placeholderTextColor={colors.textSecondary}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.passwordInput,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder={t('AUTH.PASSWORD')}
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="off"
            textContentType="none"
            passwordRules=""
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.eyeButton}
            onPress={togglePasswordVisibility}
          >
            <SvgImage
              width={24}
              height={24}
              color={colors.textSecondary}
              source={
                !showPassword
                  ? require('assets/vectors/eye.svg')
                  : require('assets/vectors/eye-off.svg')
              }
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={[typography.BodyRegular14, { color: colors.primary }]}>
            {t('AUTH.FORGOT_PASSWORD')}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <ReusableButton
            fullWidth={false}
            onPress={handleLogin}
            title={t('AUTH.SIGN_IN')}
          />
          <ReusableButton
            variant="outline"
            title={t('AUTH.CREATE_ACCOUNT')}
            onPress={() => navigation.navigate(Routes.REGISTER)}
          />
        </View>
        <View style={styles.hintContainer}>
          <Text style={[styles.hintText, { color: colors.textSecondary }]}>
            💡 Для входа используйте: start.mobile.app@gmail.com / Admin123!
          </Text>
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
  passwordContainer: {
    position: 'relative',
    marginBottom: scale.vertical(16),
  },
  passwordInput: {
    borderWidth: 1,
    borderRadius: scale.moderate(8),
    paddingHorizontal: scale.horizontal(16),
    paddingVertical: scale.vertical(12),
    paddingRight: scale.horizontal(50),
    ...typography.BodyRegular16,
  },
  eyeButton: {
    position: 'absolute',
    top: scale.vertical(10),
    right: scale.horizontal(16),
    padding: scale.moderate(4),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: scale.vertical(16),
  },
  buttonContainer: {
    gap: scale.vertical(12),
    marginTop: scale.vertical(8),
  },
  hintContainer: {
    marginTop: scale.vertical(20),
    padding: scale.vertical(12),
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: scale.moderate(8),
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  hintText: {
    textAlign: 'center',
    ...typography.FootnoteRegular12,
  },
});
