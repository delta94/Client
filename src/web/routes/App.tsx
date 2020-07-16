import React from 'react';
import { Route, Switch, HashRouter, BrowserRouter } from 'react-router-dom';
import config from '@shared/project.config';
import { TMemo } from '@shared/components/TMemo';
import ErrorBoundary from '@web/containers/ErrorBoundary';
import { AppBanner } from '@web/components/AppBanner';
import GlobalUI from '@web/containers/GlobalUI';
import NetworkIndicator from '@web/components/NetworkIndicator';
import { LaunchRoute } from './Launch';

// 新版Web页面

const Router: any =
  config.platform === 'web' || config.environment === 'development'
    ? BrowserRouter
    : HashRouter;

export const App = TMemo(() => {
  return (
    <Router>
      <ErrorBoundary>
        <GlobalUI />
        <div className="app">
          <Switch>
            <Route name="index" path="/" component={LaunchRoute} />
          </Switch>
          {config.platform === 'web' ? <NetworkIndicator /> : null}
          <div className="version">当前版本号v{config.version}</div>
          <AppBanner />
        </div>
      </ErrorBoundary>
    </Router>
  );
});
App.displayName = 'App';
