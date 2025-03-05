import React, { FC } from 'react';
import { Navigation } from '@adminjs/design-system';
import { useTranslation, useNavigationResources, ResourceJSON } from 'adminjs';

type Props = {
	resources: Array<ResourceJSON>;
};

const SidebarResourceSection: FC<Props> = ({ resources }) => {
	const elements = useNavigationResources(resources);
	const { translateLabel } = useTranslation();

	const flattenedElements = elements.flatMap((element) => (
		element.elements ? element.elements : [element]
	));

	return (
		<Navigation
			label={translateLabel('navigation')}
			elements={flattenedElements}

		/>
	);
};

export default SidebarResourceSection
