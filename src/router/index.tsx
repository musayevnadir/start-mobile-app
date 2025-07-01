import React from 'react';
import { MainRouter } from './Main.Router';
import { AuthRouter } from './Auth.Router';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector, selectIsAuthenticated, selectIsLoading } from 'store';
import { ThemeLoadingScreen } from 'components/ThemeLoadingScreen';

const Router = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <NavigationContainer>
      {isLoading ? (
        <ThemeLoadingScreen />
      ) : isAuthenticated ? (
        <MainRouter />
      ) : (
        <AuthRouter />
      )}
    </NavigationContainer>
  );
};

export default Router;
