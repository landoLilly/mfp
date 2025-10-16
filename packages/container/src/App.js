import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Header from './components/Header';
import Progress from './components/Progress'

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
          <div>
            <Header isSignedIn={isSignedIn} onSignOut={handleSignOut} />
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/auth">
                  <AuthLazy onSignIn={handleSignIn} />
                </Route>
                <Route path="/" component={MarketingLazy} />
              </Switch>
            </Suspense>
          </div>
      </StylesProvider>
    </BrowserRouter>
  );
};