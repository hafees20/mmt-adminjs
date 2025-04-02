import componentLoader, { Components } from './component-loader.js';
import { dark, light } from '@adminjs/themes';
import { Member } from '../db/models/membership.model.js';
import { Location } from '../db/models/location.model.js';
import { createLocationResource } from '../resources/location.resource.js';
import { UserResourceOptions } from '../resources/user.resource.js';
import { User } from '../db/models/user.model.js';
import { MemberResourceOptions } from '../resources/membership.resource.js';
const options = {
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
    },
    componentLoader,
    rootPath: '/',
    branding: {
        logo: false,
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
        styles: ['/public/styles.css'],
    },
    dashboard: {
        component: Components.Dashboard,
    },
};
export default options;
