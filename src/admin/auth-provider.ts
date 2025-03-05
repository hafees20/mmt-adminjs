import { DefaultAuthProvider } from 'adminjs';

import componentLoader from './component-loader.js';
import { DEFAULT_ADMIN } from './constants.js';
import { User } from '../db/models/user.model.js';

/**
 * Make sure to modify "authenticate" to be a proper authentication method
 */
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return { email, role: 'admin' };
    }

    const user = await User.findOne({ where: { email: email, password: password } });
    if (user) {
      return { email, role: 'client' };
    }

    return null;
  },
});

export default provider;
