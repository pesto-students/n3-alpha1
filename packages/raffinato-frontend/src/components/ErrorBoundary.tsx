/* eslint-disable react/no-unused-state */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/state-in-constructor */
import React, { Component, ErrorInfo, ReactNode, Requireable } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import { Extras } from '@sentry/types';

import './error-boundary.scss';

class ErrorBoundary extends Component {
  static propTypes: {
    children: Requireable<ReactNode>;
  };

  state = {
    error: '',
    eventId: '',
    errorInfo: '',
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras((errorInfo as unknown) as Extras);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId, errorInfo });
    });
  }

  render() {
    const { hasError, eventId } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="error-boundary-wrapper">
          <div>
            <p>
              An error has occurred in this component.{' '}
              <span
                style={{ cursor: 'pointer', color: '#0077FF' }}
                onClick={() => {
                  window.location.reload();
                }}
                onKeyDown={() => {
                  window.location.reload();
                }}
                tabIndex={0}
                role="button"
              >
                Reload this page
              </span>{' '}
            </p>
          </div>

          <button onClick={() => Sentry.showReportDialog({ eventId })}>
            Report feedback
          </button>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
