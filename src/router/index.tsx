import React from 'react';
import { MainRouter } from './Main.Router';
import { AuthRouter } from './Auth.Router';
import { NavigationContainer } from '@react-navigation/native';

const profile = true;

const Router = () => {
  return (
    <NavigationContainer>
      {profile ? <MainRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
};

export default Router;
