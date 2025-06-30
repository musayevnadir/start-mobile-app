import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { palette } from 'theme/colors';
import { CommonStyles } from 'theme/common.styles';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';

export const ThemeLoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={palette.blue500}
        style={styles.spinner}
      />
      <Text style={styles.text}>Loading theme...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    ...CommonStyles.flexAlignJustifyCenter,
  },
  spinner: {
    marginBottom: scale.vertical(16),
  },
  text: {
    ...typography.FootnoteRegular12,
    color: palette.gray600,
  },
});
