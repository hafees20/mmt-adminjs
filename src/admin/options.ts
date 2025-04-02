import { AdminJSOptions } from 'adminjs';

import componentLoader, { Components } from './component-loader.js';
//import { locales as AdminJSLocales } from 'adminjs';
import { dark, light } from '@adminjs/themes';
import { Member } from '../db/models/membership.model.js';
import { Location } from '../db/models/location.model.js';
import { createLocationResource } from '../resources/location.resource.js';
import { UserResourceOptions } from '../resources/user.resource.js';
import { User } from '../db/models/user.model.js';
import { MemberResourceOptions } from '../resources/membership.resource.js';

const options: AdminJSOptions = {
  defaultTheme: dark.id,
  availableThemes: [light, dark],
  locale: {
    language: 'en',
    localeDetection: true,
    translations: {
      en: {
        components: {
          Login: {
            welcomeHeader: 'Welcome',
            welcomeMessage: 'Membership Management',
            properties: {
              email: 'Email',
              password: 'Password',
            },
            loginButton: 'Login',
          },
        },
      },
    },
    //availableLanguages: Object.keys(AdminJSLocales),
  },
  componentLoader,
  rootPath: '/',
  branding: {
    logo: false,
    //favicon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Favicon.ico',
    companyName: 'COMPANY NAME',
    withMadeWithLove: false,
  },
  resources: [
    { resource: User, options: UserResourceOptions },
    { resource: Member, options: MemberResourceOptions },
    createLocationResource(Location),
  ],
  databases: [],
  assets: {
    //styles: ['/public/hide.css'],
    styles: ['/public/styles.css'],
    //scripts: ['/public/overrideIllustration.js'],
  },
  dashboard: {
    component: Components.Dashboard,
  },
};

export default options;
