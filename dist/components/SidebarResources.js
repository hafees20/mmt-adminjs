import React from 'react';
import { Navigation } from '@adminjs/design-system';
import { useTranslation, useNavigationResources } from 'adminjs';
const SidebarResourceSection = ({ resources }) => {
    const elements = useNavigationResources(resources);
    const { translateLabel } = useTranslation();
    const flattenedElements = elements.flatMap((element) => (element.elements ? element.elements : [element]));
    return (React.createElement(Navigation, { label: translateLabel('navigation'), elements: flattenedElements }));
};
export default SidebarResourceSection;
