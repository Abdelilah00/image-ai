import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUserDetails } from 'app/shared/model/user-details.model';
import { getEntities } from './user-details.reducer';

export const UserDetails = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const userDetailsList = useAppSelector(state => state.userDetails.entities);
  const loading = useAppSelector(state => state.userDetails.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="user-details-heading" data-cy="UserDetailsHeading">
        <Translate contentKey="imageAiApp.userDetails.home.title">User Details</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="imageAiApp.userDetails.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/user-details/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="imageAiApp.userDetails.home.createLabel">Create new User Details</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userDetailsList && userDetailsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="imageAiApp.userDetails.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.userDetails.balance">Balance</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.userDetails.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userDetailsList.map((userDetails, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/user-details/${userDetails.id}`} color="link" size="sm">
                      {userDetails.id}
                    </Button>
                  </td>
                  <td>{userDetails.balance}</td>
                  <td>{userDetails.user ? userDetails.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/user-details/${userDetails.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/user-details/${userDetails.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/user-details/${userDetails.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="imageAiApp.userDetails.home.notFound">No User Details found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserDetails;
