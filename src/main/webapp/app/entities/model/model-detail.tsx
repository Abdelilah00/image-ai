import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './model.reducer';

export const ModelDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const modelEntity = useAppSelector(state => state.model.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="modelDetailsHeading">
          <Translate contentKey="imageAiApp.model.detail.title">Model</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{modelEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="imageAiApp.model.name">Name</Translate>
            </span>
          </dt>
          <dd>{modelEntity.name}</dd>
          <dt>
            <span id="version">
              <Translate contentKey="imageAiApp.model.version">Version</Translate>
            </span>
          </dt>
          <dd>{modelEntity.version}</dd>
          <dt>
            <span id="feePerSecond">
              <Translate contentKey="imageAiApp.model.feePerSecond">Fee Per Second</Translate>
            </span>
          </dt>
          <dd>{modelEntity.feePerSecond}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="imageAiApp.model.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{modelEntity.displayName}</dd>
        </dl>
        <Button tag={Link} to="/model" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/model/${modelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ModelDetail;
