import React from 'react';
import { Box, Label, Text } from '@adminjs/design-system';
import { Compass } from 'react-feather';
const formatCoordinate = (coord, isLatitude) => {
    const direction = isLatitude
        ? coord >= 0 ? 'N' : 'S'
        : coord >= 0 ? 'E' : 'W';
    const absoluteValue = Math.abs(coord).toFixed(6);
    return `${absoluteValue}° ${direction}`;
};
const GeogDisplay = ({ record }) => {
    const latLng = record?.params?.geog;
    if (!latLng) {
        return (React.createElement(Box, null,
            React.createElement(Text, { variant: "body", color: "grey60" }, "No location data available")));
    }
    try {
        const [latitude, longitude] = latLng.split(', ').map(Number);
        if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error('Invalid coordinates');
        }
        const maps = {
            osm: `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15`,
        };
        const handleMapClick = (url) => (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(url, '_blank', 'noopener,noreferrer');
        };
        return (React.createElement(Box, null,
            React.createElement(Box, { mb: "xl" },
                React.createElement(Label, null, "GPS Coordinates"),
                React.createElement(Box, { mt: "sm", display: "flex", alignItems: "center", gap: "sm" },
                    React.createElement(Compass, { size: 16 }),
                    React.createElement(Text, { variant: "body", fontFamily: "monospace" },
                        formatCoordinate(latitude, true),
                        ", ",
                        formatCoordinate(longitude, false))))));
    }
    catch (error) {
        return (React.createElement(Box, null,
            React.createElement(Text, { color: "danger" },
                "Invalid location format: ",
                latLng),
            React.createElement(Text, { mt: "sm", variant: "caption" }, "Expected format: \"latitude, longitude\"")));
    }
};
export default GeogDisplay;
