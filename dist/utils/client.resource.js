import { clientCheck } from './admin.check.js';
const ClientAccessible = { isAccessible: clientCheck };
const clientResourceActions = {
    list: ClientAccessible,
    edit: ClientAccessible,
    filter: ClientAccessible,
    new: ClientAccessible,
    search: ClientAccessible,
    show: ClientAccessible,
    delete: ClientAccessible,
};
export default clientResourceActions;
