//import { Location } from '../db/models/location.model.js';
//import { override } from '@adminjs/design-system';
//
//interface RecordParams {
//	[key: string]: any;
//	'geog.coordinates.0'?: number;
//	'geog.coordinates.1'?: number;
//}
//
//interface AdminResponseRecord {
//	params: RecordParams;
//	// Add other record properties if needed
//}
//
//interface OriginalResponse {
//	records?: AdminResponseRecord[];
//}
//
//// Custom component to render clickable links in table cells
//const MapLinkComponent = override?.TableCell?.map((TableCell) => (props) => {
//	const { property, record } = props;
//
//	if (property.name === 'geog') {
//		const url = record.params.geog;
//		if (!url) return null;
//
//		return (
//			<TableCell
//				{...props}
//				onClick={(e) => e.stopPropagation()} // Prevent row click propagation
//			>
//				<a
//					href={url}
//					target="_blank"
//					rel="noopener noreferrer"
//					onClick={(e) => e.stopPropagation()}
//				>
//					View on Map
//				</a>
//			</TableCell>
//		);
//	}
//	return <TableCell {...props} />;
//});
//
//export const afterNewLocation = async (originalResponse: OriginalResponse) => {
//	if (!originalResponse?.records?.length) return originalResponse;
//
//	const formattedRecords = originalResponse.records.map(record => {
//		const lng = record.params['geog.coordinates.0'];
//		const lat = record.params['geog.coordinates.1'];
//
//		return {
//			...record,
//			params: {
//				...record.params,
//				geog: generateMapLink(lat, lng),
//			},
//		};
//	});
//
//	return {
//		...originalResponse,
//		records: formattedRecords
//	};
//};
//
//const generateMapLink = (latitude?: number, longitude?: number): string | null => {
//	if (typeof latitude !== 'number' || typeof longitude !== 'number') return null;
//	return `https://www.openstreetmap.org/#map=15/${latitude}/${longitude}`;
//};
//
//export const createLocationResource = (resource: typeof Location) => ({
//	resource,
//	options: {
//		properties: {
//			geog: {
//				isVisible: {
//					list: true,
//					show: true,
//					edit: false,
//					filter: false
//				},
//				custom: {
//					label: 'Map Link',
//					components: {
//						list: MapLinkComponent,
//						show: MapLinkComponent
//					}
//				}
//			}
//		},
//		actions: {
//			list: { after: [afterNewLocation] }
//		}
//	}
//});
