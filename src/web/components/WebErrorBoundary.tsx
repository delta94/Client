import React, { useCallback } from 'react';
import { TMemo } from '@shared/components/TMemo';
import ErrorBoundary, {
  RenderErrorComponent,
  HandleCatchErrorFn,
} from '@shared/components/ErrorBoundary';
import config from '@shared/project.config';
import { sendErrorReport } from '@shared/utils/error-report';

/**
 * web页面通用的错误处理容器
 * 应当给 web portal playground 通用
 */
export const WebErrorBoundary: React.FC<{
  renderError: RenderErrorComponent;
}> = TMemo((props) => {
  const handleCatchError: HandleCatchErrorFn = useCallback((error, info) => {
    console.warn('捕获错误, 等待发送错误报告\n', error, info);
    sendErrorReport({
      message: String(error),
      stack: String(info.componentStack),
      version: config.version,
    });
    import('../utils/sentry').then((module) => module.error(error));
  }, []);

  return (
    <ErrorBoundary
      onCatchError={handleCatchError}
      renderError={props.renderError}
    >
      {props.children}
    </ErrorBoundary>
  );
});
WebErrorBoundary.displayName = 'WebErrorBoundary';
