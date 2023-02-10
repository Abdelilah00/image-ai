import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserDetails from './user-details';
import UserDetailsDetail from './user-details-detail';
import UserDetailsUpdate from './user-details-update';
import UserDetailsDeleteDialog from './user-details-delete-dialog';

const UserDetailsRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UserDetails />} />
    <Route path="new" element={<UserDetailsUpdate />} />
    <Route path=":id">
      <Route index element={<UserDetailsDetail />} />
      <Route path="edit" element={<UserDetailsUpdate />} />
      <Route path="delete" element={<UserDetailsDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserDetailsRoutes;
