import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-details.reducer';

export const UserDetailsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const userDetailsEntity = useAppSelector(state => state.userDetails.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userDetailsDetailsHeading">
          <Translate contentKey="imageAiApp.userDetails.detail.title">UserDetails</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userDetailsEntity.id}</dd>
          <dt>
            <span id="balance">
              <Translate contentKey="imageAiApp.userDetails.balance">Balance</Translate>
            </span>
          </dt>
          <dd>{userDetailsEntity.balance}</dd>
          <dt>
            <Translate contentKey="imageAiApp.userDetails.user">User</Translate>
          </dt>
          <dd>{userDetailsEntity.user ? userDetailsEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-details" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-details/${userDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserDetailsDetail;
