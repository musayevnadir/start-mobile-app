import React, { Fragment } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from 'theme/ThemeContext';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { SvgImage } from './SvgImage';
import { CommonStyles } from 'theme/common.styles';

export interface ReusableButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'large' | 'back';
  icon?: NodeJS.Require | string;
  subtitle?: string;
  customStyles?: {
    container?: ViewStyle;
    text?: TextStyle;
    subtitle?: TextStyle;
  };
  fullWidth?: boolean;
}

export const ReusableButton: React.FC<ReusableButtonProps> = ({
  title,
  icon,
  style,
  subtitle,
  disabled,
  customStyles,
  fullWidth = true,
  variant = 'primary',
  ...props
}) => {
  const { colors } = useTheme();

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      opacity: disabled ? 0.6 : 1,
      borderRadius: scale.moderate(8),
      paddingVertical: scale.vertical(16),
      paddingHorizontal: scale.horizontal(16),
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          ...CommonStyles.alignJustifyCenter,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.backgroundSecondary,
          ...CommonStyles.alignJustifyCenter,
        };
      case 'outline':
        return {
          ...baseStyle,
          borderWidth: 1,
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.primary,
          ...CommonStyles.alignJustifyCenter,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          paddingVertical: scale.vertical(8),
          ...CommonStyles.alignJustifyCenter,
        };
      case 'large':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          paddingVertical: scale.vertical(20),
          borderRadius: scale.moderate(12),
          minHeight: scale.vertical(100),
          ...CommonStyles.alignJustifyCenter,
        };
      case 'back':
        return {
          ...baseStyle,
          gap: scale.horizontal(8),
          backgroundColor: colors.primary,
          paddingVertical: scale.vertical(16),
          paddingHorizontal: scale.horizontal(16),
          minHeight: scale.vertical(48),
          ...CommonStyles.alignJustifyCenterRow,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          ...CommonStyles.alignJustifyCenter,
        };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'large':
      case 'back':
        return colors.surface;
      case 'secondary':
        return colors.textSecondary;
      case 'outline':
        return colors.primary;
      case 'text':
        return colors.primary;
      default:
        return colors.surface;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      color: getTextColor(),
    };

    if (variant === 'large') {
      return {
        ...baseTextStyle,
        ...typography.HeadlineMedium16,
        textAlign: 'center',
      };
    }

    return { ...baseTextStyle, ...typography.HeadlineMedium16 };
  };

  const getSubtitleStyle = (): TextStyle => {
    return {
      color: getTextColor(),
      ...typography.FootnoteRegular12,
      opacity: 0.9,
      textAlign: 'center',
      marginTop: scale.vertical(4),
    };
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      return (
        <Text style={[styles.buttonIcon, { color: getTextColor() }]}>
          {icon}
        </Text>
      );
    }

    return (
      <SvgImage source={icon} width={16} height={16} color={getTextColor()} />
    );
  };

  const renderContent = () => {
    if (variant === 'large') {
      return (
        <Fragment>
          {renderIcon()}
          <Text style={[getTextStyle(), customStyles?.text]}>{title}</Text>
          {subtitle && (
            <Text style={[getSubtitleStyle(), customStyles?.subtitle]}>
              {subtitle}
            </Text>
          )}
        </Fragment>
      );
    }

    if (variant === 'back') {
      return (
        <Fragment>
          {renderIcon()}
          <Text style={[getTextStyle(), customStyles?.text]}>{title}</Text>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {renderIcon()}
        <Text style={[getTextStyle(), customStyles?.text]}>{title}</Text>
        {subtitle && (
          <Text style={[getSubtitleStyle(), customStyles?.subtitle]}>
            {subtitle}
          </Text>
        )}
      </Fragment>
    );
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyles(),
        fullWidth && styles.fullWidth,
        customStyles?.container,
        style,
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  buttonIcon: {
    textAlign: 'center',
    ...typography.HeadlineRegular24,
    marginBottom: scale.vertical(8),
  },
});
