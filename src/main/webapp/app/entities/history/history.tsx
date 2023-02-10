import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IHistory } from 'app/shared/model/history.model';
import { getEntities } from './history.reducer';

export const History = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const historyList = useAppSelector(state => state.history.entities);
  const loading = useAppSelector(state => state.history.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="history-heading" data-cy="HistoryHeading">
        <Translate contentKey="imageAiApp.history.home.title">Histories</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="imageAiApp.history.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/history/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="imageAiApp.history.home.createLabel">Create new History</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {historyList && historyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="imageAiApp.history.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.history.imageSource">Image Source</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.history.imageDestination">Image Destination</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.history.duration">Duration</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.history.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.history.model">Model</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.history.status">Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {historyList.map((history, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/history/${history.id}`} color="link" size="sm">
                      {history.id}
                    </Button>
                  </td>
                  <td>{history.imageSource}</td>
                  <td>{history.imageDestination}</td>
                  <td>{history.duration}</td>
                  <td>{history.user ? history.user.login : ''}</td>
                  <td>{history.model ? <Link to={`/model/${history.model.id}`}>{history.model.id}</Link> : ''}</td>
                  <td>{history.status ? <Link to={`/status/${history.status.id}`}>{history.status.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/history/${history.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/history/${history.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/history/${history.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="imageAiApp.history.home.notFound">No Histories found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default History;
