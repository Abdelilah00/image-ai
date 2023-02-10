import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IModel } from 'app/shared/model/model.model';
import { getEntities } from './model.reducer';

export const Model = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const modelList = useAppSelector(state => state.model.entities);
  const loading = useAppSelector(state => state.model.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="model-heading" data-cy="ModelHeading">
        <Translate contentKey="imageAiApp.model.home.title">Models</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="imageAiApp.model.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/model/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="imageAiApp.model.home.createLabel">Create new Model</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {modelList && modelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="imageAiApp.model.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.model.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.model.version">Version</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.model.feePerSecond">Fee Per Second</Translate>
                </th>
                <th>
                  <Translate contentKey="imageAiApp.model.displayName">Display Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {modelList.map((model, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/model/${model.id}`} color="link" size="sm">
                      {model.id}
                    </Button>
                  </td>
                  <td>{model.name}</td>
                  <td>{model.version}</td>
                  <td>{model.feePerSecond}</td>
                  <td>{model.displayName}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/model/${model.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/model/${model.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/model/${model.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="imageAiApp.model.home.notFound">No Models found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Model;
