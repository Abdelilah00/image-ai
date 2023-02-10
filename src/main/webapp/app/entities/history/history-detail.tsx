import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './history.reducer';

export const HistoryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const historyEntity = useAppSelector(state => state.history.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="historyDetailsHeading">
          <Translate contentKey="imageAiApp.history.detail.title">History</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{historyEntity.id}</dd>
          <dt>
            <span id="imageSource">
              <Translate contentKey="imageAiApp.history.imageSource">Image Source</Translate>
            </span>
          </dt>
          <dd>{historyEntity.imageSource}</dd>
          <dt>
            <span id="imageDestination">
              <Translate contentKey="imageAiApp.history.imageDestination">Image Destination</Translate>
            </span>
          </dt>
          <dd>{historyEntity.imageDestination}</dd>
          <dt>
            <span id="duration">
              <Translate contentKey="imageAiApp.history.duration">Duration</Translate>
            </span>
          </dt>
          <dd>{historyEntity.duration}</dd>
          <dt>
            <Translate contentKey="imageAiApp.history.user">User</Translate>
          </dt>
          <dd>{historyEntity.user ? historyEntity.user.login : ''}</dd>
          <dt>
            <Translate contentKey="imageAiApp.history.model">Model</Translate>
          </dt>
          <dd>{historyEntity.model ? historyEntity.model.id : ''}</dd>
          <dt>
            <Translate contentKey="imageAiApp.history.status">Status</Translate>
          </dt>
          <dd>{historyEntity.status ? historyEntity.status.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/history" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/history/${historyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default HistoryDetail;
