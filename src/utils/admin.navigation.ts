import { ModelStatic } from 'sequelize';
import { Member } from '../db/models/membership.model.js';
import { User } from '../db/models/user.model.js';

export const UserNav = {
  name: 'Users',
  icon: false,
};
export const MembersNav = {
  name: 'Members',
  icon: false,
};
export const LocationNav = {
  name: 'Locations',
  icon: false,
};

export const navigationDecider = (resource: ModelStatic<any>) => {
  if (resource === User) {
    return UserNav;
  }
  if (resource === Member) {
    return MembersNav;
  }
  return LocationNav;
};
