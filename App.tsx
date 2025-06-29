/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Router from 'router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from 'theme/ThemeContext';
import { StatusBarManager } from 'components/StatusBarManager';
import { Fragment } from 'react';

function AppContent() {
  const { colors } = useTheme();

  console.log(colors);

  return (
    <Fragment>
      <StatusBarManager />
      <View style={[styles.root, { backgroundColor: colors.background }]}>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
