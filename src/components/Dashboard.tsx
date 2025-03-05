import React from 'react';
import { Box, Button, H2, H5, Illustration, Text } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import { useTranslation } from 'adminjs';

const pageHeaderHeight = 300;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

// Dashboard Header
export const DashboardHeader: React.FC = () => {
	const { translateMessage } = useTranslation();
	return (
		<Box data-css="default-dashboard">
			<Box
				position="relative"
				overflow="hidden"
				bg="white"
				height={pageHeaderHeight}
				py={pageHeaderPaddingY}
				px={['default', 'lg', pageHeaderPaddingX]}
			>
				<Box position="absolute" top={30} left={0} opacity={0.9} animate display={['none', 'none', 'none', 'block']}>
					{/*<RocketSVG />*/}
				</Box>
				<Text textAlign="center" color="grey100">
					<H2 fontWeight="bold">{translateMessage('welcomeOnBoard_title')}</H2>
					<Text opacity={0.8}>{translateMessage('welcomeOnBoard_subtitle')}</Text>
				</Text>
			</Box>
		</Box>
	);
};

// Membership Card Data
const membershipCards = ({ translateMessage }): Array<{
	variant: string;
	title: string;
	subtitle: string;
	href: string;
}> => [
		{
			variant: 'Details',
			title: 'Manage Members',
			subtitle: 'Add, edit, or remove members from your database.',
			href: '/resources/Members',
		},
		{
			variant: 'Docs',
			title: 'Subscription Plans',
			subtitle: 'Create and manage subscription plans for members.',
			href: '/subscriptions',
		},
		{
			variant: 'Plug',
			title: 'Payment Tracking',
			subtitle: 'Track payments and generate invoices for members.',
			href: '/payments',
		},
		{
			variant: 'Cup',
			title: 'Member Analytics',
			subtitle: 'View insights and reports on member activity.',
			href: '/analytics',
		},
		{
			variant: 'Photos',
			title: 'Communication Tools',
			subtitle: 'Send emails and notifications to members.',
			href: '/communication',
		},
		{
			variant: 'IdentityCard',
			title: 'Role Management',
			subtitle: 'Assign roles and permissions to members.',
			href: '/roles',
		},
	];

// Styled Card Component
const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
  color: ${({ theme }) => theme.colors.grey100};
  height: 100%;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.space.md};
  transition: all 0.1s ease-in;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary60};
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }

  & .dsc-icon svg,
  .gh-icon svg {
    width: 64px;
    height: 64px;
  }
`;

Card.defaultProps = {
	variant: 'container',
	boxShadow: 'card',
};

// Dashboard Component
export const Dashboard: React.FC = () => {
	const { translateMessage, translateButton } = useTranslation();

	return (
		<Box>
			<DashboardHeader />
			<Box
				mt={['xl', 'xl', '-100px']}
				mb="xl"
				mx={[0, 0, 0, 'auto']}
				px={['default', 'lg', 'xxl', '0']}
				position="relative"
				flex
				flexDirection="row"
				flexWrap="wrap"
				width={[1, 1, 1, 1024]}
			>
				{membershipCards({ translateMessage }).map((card, index) => (
					<Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
						<Card as="a" href={card.href}>
							<Text textAlign="center">
								<Illustration variant={card.variant as any} width={100} height={70} />
								<H5 mt="md">{card.title}</H5>
								<Text>{card.subtitle}</Text>
							</Text>
						</Card>
					</Box>
				))}
				<Card width={1} m="lg">
					<Text textAlign="center">
						<Illustration variant="AdminJSLogo" />
						<H5>Need Help?</H5>
						<Text>Contact our support team for assistance.</Text>
						<Text mt="xxl">
							<Button as="a" variant="contained" href="/support" target="_blank">
								Contact Support
							</Button>
						</Text>
					</Text>
				</Card>
				<Box width={[1, 1, 1 / 2]} p="lg">
					<Card as="a" flex href="/community">
						<Box flexShrink={0} className="dsc-icon">
							{/*
							<DiscordLogo />
							*/}
						</Box>
						<Box ml="xl">
							<H5>Join Our Community</H5>
							<Text>Connect with other membership managers.</Text>
						</Box>
					</Card>
				</Box>
				<Box width={[1, 1, 1 / 2]} p="lg">
					<Card as="a" flex href="/feedback">
						<Box flexShrink={0} className="gh-icon">
							<Illustration variant="GithubLogo" />
						</Box>
						<Box ml="xl">
							<H5>Feedback & Suggestions</H5>
							<Text>Share your feedback to help us improve.</Text>
						</Box>
					</Card>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
