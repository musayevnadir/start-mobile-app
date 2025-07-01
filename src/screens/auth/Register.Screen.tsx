import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from 'router/routes';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useTheme } from 'theme/ThemeContext';
import { CommonStyles } from 'theme/common.styles';
import { NavigationParamList } from 'types/navigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  useAppDispatch,
  useAppSelector,
  selectLastOperationSuccess,
} from 'store';
import { register, clearLastOperationResult } from 'store/slices/authSlice';
import { SvgImage } from 'components/SvgImage';
import { ReusableButton } from 'components/ReusableButton';

export const RegisterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.REGISTER>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const lastOperationSuccess = useAppSelector(selectLastOperationSuccess);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (lastOperationSuccess === true && isRegistering) {
      setIsRegistering(false);
      Alert.alert(t('AUTH.SUCCESS'), t('AUTH.REGISTRATION_SUCCESS'), [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearLastOperationResult());
          },
        },
      ]);
    }
  }, [lastOperationSuccess, isRegistering, t, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearLastOperationResult());
    };
  }, [dispatch]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    if (!formData.firstName.trim()) {
      Alert.alert(t('AUTH.ERROR'), t('AUTH.ENTER_FIRST_NAME'));
      return;
    }

    if (!formData.lastName.trim()) {
      Alert.alert(t('AUTH.ERROR'), t('AUTH.ENTER_LAST_NAME'));
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert(t('AUTH.ERROR'), t('AUTH.ENTER_EMAIL'));
      return;
    }

    if (!formData.password.trim()) {
      Alert.alert(t('AUTH.ERROR'), t('AUTH.ENTER_PASSWORD'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert(t('AUTH.ERROR'), t('AUTH.PASSWORDS_DO_NOT_MATCH'));
      return;
    }

    setIsRegistering(true);
    dispatch(
      register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }),
    );
  };

  return (
    <ScrollView
      style={[CommonStyles.flex, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.formCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t('AUTH.CREATE_ACCOUNT')}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t('AUTH.SIGN_UP_TO_GET_STARTED')}
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
            placeholder={t('AUTH.FIRST_NAME')}
            placeholderTextColor={colors.textSecondary}
            onChangeText={value => handleInputChange('firstName', value)}
            autoCapitalize="words"
            autoComplete="name-given"
            textContentType="givenName"
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
            autoCapitalize="words"
            autoComplete="name-family"
            textContentType="familyName"
            value={formData.lastName}
            placeholder={t('AUTH.LAST_NAME')}
            placeholderTextColor={colors.textSecondary}
            onChangeText={value => handleInputChange('lastName', value)}
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
            autoCapitalize="none"
            autoComplete="email"
            value={formData.email}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder={t('AUTH.EMAIL')}
            placeholderTextColor={colors.textSecondary}
            onChangeText={value => handleInputChange('email', value)}
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
              passwordRules=""
              autoComplete="off"
              textContentType="none"
              value={formData.password}
              placeholder={t('AUTH.PASSWORD')}
              placeholderTextColor={colors.textSecondary}
              onChangeText={value => handleInputChange('password', value)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={togglePasswordVisibility}
              activeOpacity={0.7}
            >
              <SvgImage
                color={colors.textSecondary}
                width={24}
                height={24}
                source={
                  !showPassword
                    ? require('assets/vectors/eye.svg')
                    : require('assets/vectors/eye-off.svg')
                }
              />
            </TouchableOpacity>
          </View>
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
              passwordRules=""
              autoComplete="off"
              textContentType="none"
              value={formData.confirmPassword}
              placeholder={t('AUTH.CONFIRM_PASSWORD')}
              placeholderTextColor={colors.textSecondary}
              onChangeText={value =>
                handleInputChange('confirmPassword', value)
              }
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={toggleConfirmPasswordVisibility}
              activeOpacity={0.7}
            >
              <SvgImage
                color={colors.textSecondary}
                width={24}
                height={24}
                source={
                  !showConfirmPassword
                    ? require('assets/vectors/eye.svg')
                    : require('assets/vectors/eye-off.svg')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ReusableButton
            variant="primary"
            onPress={handleRegister}
            title={t('AUTH.CREATE_ACCOUNT')}
          />
          <ReusableButton
            variant="outline"
            title={t('AUTH.BACK_TO_LOGIN')}
            onPress={() => navigation.goBack()}
          />
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
    right: scale.horizontal(16),
    top: scale.vertical(10),
    padding: scale.moderate(4),
  },
  buttonContainer: {
    gap: scale.vertical(12),
  },
});
