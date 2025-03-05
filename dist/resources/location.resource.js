import { Components } from '../admin/component-loader.js';
export const afterLocationList = async (originalResponse) => {
    if (!originalResponse?.records?.length)
        return originalResponse;
    const formattedRecords = originalResponse.records.map((record) => {
        const lng = record.params['geog.coordinates.0'];
        const lat = record.params['geog.coordinates.1'];
        return {
            ...record,
            params: {
                membership_id: record.params.membership_id,
                member: record.params.membership_id,
                geog: formatCoordinates(lng, lat),
                createdAt: record.params.createdAt,
                updatedAt: record.params.updatedAt,
            },
        };
    });
    return {
        ...originalResponse,
        records: formattedRecords,
    };
};
const formatCoordinates = (longitude, latitude) => {
    if (typeof longitude !== 'number' || typeof latitude !== 'number') {
        return 'Invalid coordinates';
    }
    return `${latitude.toFixed(6)} ,   ${longitude.toFixed(6)}`;
};
export const afterLocationShow = async (originalRes) => {
    const { record } = originalRes;
    const lng = record.params['geog.coordinates.0'];
    const lat = record.params['geog.coordinates.1'];
    return {
        ...originalRes,
        record: {
            ...record,
            params: {
                ...record.params,
                geog: formatCoordinates(lng, lat),
            },
        },
    };
};
export const createLocationResource = (resource) => ({
    resource,
    options: {
        navigation: {
            icon: 'Navigation',
        },
        actions: {
            list: { after: [afterLocationList] },
            show: { after: [afterLocationShow] },
        },
        properties: {
            id: {
                isVisible: false,
            },
            geog: {
                position: 1,
                isTitle: true,
                components: {
                    list: Components.GeogDisplay,
                    show: Components.GeogDisplay,
                },
            },
            membership_id: {
                position: 2,
            },
        },
    },
});
