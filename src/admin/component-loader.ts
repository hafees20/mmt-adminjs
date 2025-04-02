import { ComponentLoader } from 'adminjs';
import path from 'path';

const componentLoader = new ComponentLoader();

const Components = {
  GeogDisplay: componentLoader.add('GeogDisplay', path.resolve('src/components/GeogDisplay')),
  Dashboard: componentLoader.add('Dashboard', path.resolve('src/components/Dashboard')),
  SidebarResourceSection: componentLoader.override(
    'SidebarResourceSection',
    path.resolve('src/components/SidebarResources')
  ),
  SidebarBranding: componentLoader.override('SidebarBranding', path.resolve('src/components/SidebarBranding')),
  //Login: componentLoader.override('Login', path.resolve('src/components/Login')),
};

export default componentLoader;
export { Components };
