import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IModel } from 'app/shared/model/model.model';
import { getEntities as getModels } from 'app/entities/model/model.reducer';
import { IStatus } from 'app/shared/model/status.model';
import { getEntities as getStatuses } from 'app/entities/status/status.reducer';
import { IHistory } from 'app/shared/model/history.model';
import { getEntity, updateEntity, createEntity, reset } from './history.reducer';

export const HistoryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const models = useAppSelector(state => state.model.entities);
  const statuses = useAppSelector(state => state.status.entities);
  const historyEntity = useAppSelector(state => state.history.entity);
  const loading = useAppSelector(state => state.history.loading);
  const updating = useAppSelector(state => state.history.updating);
  const updateSuccess = useAppSelector(state => state.history.updateSuccess);

  const handleClose = () => {
    navigate('/history');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getModels({}));
    dispatch(getStatuses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...historyEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
      model: models.find(it => it.id.toString() === values.model.toString()),
      status: statuses.find(it => it.id.toString() === values.status.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...historyEntity,
          user: historyEntity?.user?.id,
          model: historyEntity?.model?.id,
          status: historyEntity?.status?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="imageAiApp.history.home.createOrEditLabel" data-cy="HistoryCreateUpdateHeading">
            <Translate contentKey="imageAiApp.history.home.createOrEditLabel">Create or edit a History</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="history-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('imageAiApp.history.imageSource')}
                id="history-imageSource"
                name="imageSource"
                data-cy="imageSource"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('imageAiApp.history.imageDestination')}
                id="history-imageDestination"
                name="imageDestination"
                data-cy="imageDestination"
                type="text"
              />
              <ValidatedField
                label={translate('imageAiApp.history.duration')}
                id="history-duration"
                name="duration"
                data-cy="duration"
                type="text"
              />
              <ValidatedField
                id="history-user"
                name="user"
                data-cy="user"
                label={translate('imageAiApp.history.user')}
                type="select"
                required
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField id="history-model" name="model" data-cy="model" label={translate('imageAiApp.history.model')} type="select">
                <option value="" key="0" />
                {models
                  ? models.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="history-status"
                name="status"
                data-cy="status"
                label={translate('imageAiApp.history.status')}
                type="select"
              >
                <option value="" key="0" />
                {statuses
                  ? statuses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/history" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HistoryUpdate;
