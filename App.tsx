/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Router from 'router';
import { Fragment } from 'react';
import { View } from 'react-native';
import { CommonStyles } from 'theme/common.styles';
import { ThemeProvider, useTheme } from 'theme/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBarManager } from 'components/StatusBarManager';

function AppContent() {
  const { colors } = useTheme();

  console.log(colors);

  return (
    <Fragment>
      <StatusBarManager />
      <View style={[CommonStyles.flex, { backgroundColor: colors.background }]}>
        <Router />
      </View>
    </Fragment>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
