import { adminCheck } from './admin.check.js';

const AdminAccessible = { isAccessible: adminCheck };

const adminResourceActions = {
  list: AdminAccessible,
  edit: AdminAccessible,
  filter: AdminAccessible,
  new: AdminAccessible,
  search: AdminAccessible,
  show: AdminAccessible,
  delete: AdminAccessible,
};

export default adminResourceActions;
