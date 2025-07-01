/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Router from 'router';
import { store } from 'store';
import { useAppDispatch } from 'store';
import { Provider } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { CommonStyles } from 'theme/common.styles';
import { Platform, StatusBar, View } from 'react-native';
import { ThemeProvider, useTheme } from 'theme/ThemeContext';
import { loadUserFromStorage } from 'store/slices/authSlice';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function AppContent() {
  const { colors, isDark } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <Fragment>
      <StatusBar
        translucent
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={
          Platform.OS === 'android' ? colors.background : undefined
        }
      />
      <View style={[CommonStyles.flex, { backgroundColor: colors.background }]}>
        <Router />
      </View>
    </Fragment>
  );
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
