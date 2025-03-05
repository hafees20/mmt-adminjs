import React from 'react'
import { ShowPropertyProps } from 'adminjs'
import { Box, Label, Button, Text } from '@adminjs/design-system'
import { MapPin, Compass, ExternalLink } from 'react-feather'

const formatCoordinate = (coord: number, isLatitude: boolean): string => {
	const direction = isLatitude
		? coord >= 0 ? 'N' : 'S'
		: coord >= 0 ? 'E' : 'W'

	const absoluteValue = Math.abs(coord).toFixed(6)
	return `${absoluteValue}° ${direction}`
}

const GeogDisplay: React.FC<ShowPropertyProps> = ({ record }) => {
	const latLng = record?.params?.geog

	if (!latLng) {
		return (
			<Box>
				<Text variant="body" color="grey60">No location data available</Text>
			</Box>
		)
	}

	try {
		const [latitude, longitude] = latLng.split(', ').map(Number)

		if (isNaN(latitude) || isNaN(longitude)) {
			throw new Error('Invalid coordinates')
		}

		const maps = {
			osm: `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15`,
			//google: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
			//apple: `https://maps.apple.com/?ll=${latitude},${longitude}&z=15`
		}

		const handleMapClick = (url: string) => (e: React.MouseEvent | React.TouchEvent) => {
			e.preventDefault()
			e.stopPropagation()
			window.open(url, '_blank', 'noopener,noreferrer')
		}

		return (
			<Box
			//onClick={(e) => e.stopPropagation()}
			//onTouchStart={(e) => e.stopPropagation()}
			//style={{ touchAction: 'manipulation' }}
			>
				<Box mb="xl">
					<Label>GPS Coordinates</Label>
					<Box mt="sm" display="flex" alignItems="center" gap="sm">
						<Compass size={16} />
						<Text variant="body" fontFamily="monospace">
							{formatCoordinate(latitude, true)}, {formatCoordinate(longitude, false)}
						</Text>
					</Box>
				</Box>

				{/*<Box>
					<Label>View on Map</Label>
					<Box
						mt="sm"
						display="flex"
						flexDirection={['column', 'row']} // Stack vertically on mobile
						gap="md"
						flexWrap="wrap"
					>
						{Object.entries(maps).map(([service, url]) => (
							<Button
								key={service}
								variant="outlined"
								py="default"
								width={['100%', 'auto']} // Full width on mobile
								onClick={handleMapClick(url)}
								onTouchEnd={handleMapClick(url)}
								style={{
									minWidth: '140px',
									justifyContent: 'center',
									WebkitTapHighlightColor: 'transparent'
								}}
							>
								<Box
									display="flex"
									alignItems="center"
									gap="sm"
									width="100%"
									style={{
										whiteSpace: 'nowrap',
										pointerEvents: 'none' // Prevent nested element interference
									}}
								>
									<MapPin size={14} />
									<Text fontSize="sm">
										{service === 'osm' && 'OpenStreetMap'}
										{service === 'google' && 'Google Maps'}
										{service === 'apple' && 'Apple Maps'}
									</Text>
									<ExternalLink size={12} />
								</Box>
							</Button>
						))}
					</Box>
				</Box>*/}
			</Box>
		)
	} catch (error) {
		return (
			<Box>
				<Text color="danger">Invalid location format: {latLng}</Text>
				<Text mt="sm" variant="caption">Expected format: "latitude, longitude"</Text>
			</Box>
		)
	}
}

export default GeogDisplay
