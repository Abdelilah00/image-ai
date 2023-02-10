import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Status from './status';
import StatusDetail from './status-detail';
import StatusUpdate from './status-update';
import StatusDeleteDialog from './status-delete-dialog';

const StatusRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Status />} />
    <Route path="new" element={<StatusUpdate />} />
    <Route path=":id">
      <Route index element={<StatusDetail />} />
      <Route path="edit" element={<StatusUpdate />} />
      <Route path="delete" element={<StatusDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StatusRoutes;
