import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainRouter } from './Main.Router';
import { AuthRouter } from './Auth.Router';

const profile = true;

const Router = () => {
  return (
    <NavigationContainer>
      {profile ? <MainRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
};

export default Router;
