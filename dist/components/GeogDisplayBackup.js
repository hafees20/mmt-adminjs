import React from 'react';
import { Box, Label, Button, Text } from '@adminjs/design-system';
import { MapPin, Compass, ExternalLink } from 'react-feather';
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
            google: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
            apple: `https://maps.apple.com/?ll=${latitude},${longitude}&z=15`
        };
        const handleMapClick = (url) => (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(url, '_blank', 'noopener,noreferrer');
        };
        return (React.createElement(Box, { onClick: (e) => e.stopPropagation(), onTouchStart: (e) => e.stopPropagation(), style: { touchAction: 'manipulation' } },
            React.createElement(Box, { mb: "xl" },
                React.createElement(Label, null, "GPS Coordinates"),
                React.createElement(Box, { mt: "sm", display: "flex", alignItems: "center", gap: "sm" },
                    React.createElement(Compass, { size: 16 }),
                    React.createElement(Text, { variant: "body", fontFamily: "monospace" },
                        formatCoordinate(latitude, true),
                        ", ",
                        formatCoordinate(longitude, false)))),
            React.createElement(Box, null,
                React.createElement(Label, null, "View on Map"),
                React.createElement(Box, { mt: "sm", display: "flex", flexDirection: ['column', 'row'], gap: "md", flexWrap: "wrap" }, Object.entries(maps).map(([service, url]) => (React.createElement(Button, { key: service, variant: "outlined", py: "default", width: ['100%', 'auto'], onClick: handleMapClick(url), onTouchEnd: handleMapClick(url), style: {
                        minWidth: '140px',
                        justifyContent: 'center',
                        WebkitTapHighlightColor: 'transparent'
                    } },
                    React.createElement(Box, { display: "flex", alignItems: "center", gap: "sm", width: "100%", style: {
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none'
                        } },
                        React.createElement(MapPin, { size: 14 }),
                        React.createElement(Text, { fontSize: "sm" },
                            service === 'osm' && 'OpenStreetMap',
                            service === 'google' && 'Google Maps',
                            service === 'apple' && 'Apple Maps'),
                        React.createElement(ExternalLink, { size: 12 })))))))));
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
