import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserDetails from './user-details';
import Model from './model';
import History from './history';
import Status from './status';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="user-details/*" element={<UserDetails />} />
        <Route path="model/*" element={<Model />} />
        <Route path="history/*" element={<History />} />
        <Route path="status/*" element={<Status />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
