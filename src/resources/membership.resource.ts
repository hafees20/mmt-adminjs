//import clientResourceActions from '../utils/client.resource.js';

export const MemberResourceOptions = {
  navigation: {
    icon: 'Users',
  },
  //actions: {
  //  ...clientResourceActions,
  //},
  properties: {
    id: {
      isVisible: false,
    },
    name: {
      position: 1,
    },
    houseName: {
      position: 2,
    },
    familyName: {
      position: 3,
    },
    mobileNumber: {
      position: 4,
    },
    whatsappNumber: {
      position: 5,
    },
    occupation: {
      position: 6,
    },
  },
};
