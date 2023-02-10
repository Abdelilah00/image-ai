import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/user-details">
        <Translate contentKey="global.menu.entities.userDetails" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/model">
        <Translate contentKey="global.menu.entities.model" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/history">
        <Translate contentKey="global.menu.entities.history" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/status">
        <Translate contentKey="global.menu.entities.status" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
