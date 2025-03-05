import React from 'react';
import { Box, Button, H2, H5, Illustration, Text } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import { useTranslation } from 'adminjs';
const pageHeaderHeight = 300;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;
export const DashboardHeader = () => {
    const { translateMessage } = useTranslation();
    return (React.createElement(Box, { "data-css": "default-dashboard" },
        React.createElement(Box, { position: "relative", overflow: "hidden", bg: "white", height: pageHeaderHeight, py: pageHeaderPaddingY, px: ['default', 'lg', pageHeaderPaddingX] },
            React.createElement(Box, { position: "absolute", top: 30, left: 0, opacity: 0.9, animate: true, display: ['none', 'none', 'none', 'block'] }),
            React.createElement(Text, { textAlign: "center", color: "grey100" },
                React.createElement(H2, { fontWeight: "bold" }, translateMessage('welcomeOnBoard_title')),
                React.createElement(Text, { opacity: 0.8 }, translateMessage('welcomeOnBoard_subtitle'))))));
};
const membershipCards = ({ translateMessage }) => [
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
const Card = styled(Box) `
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
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
export const Dashboard = () => {
    const { translateMessage, translateButton } = useTranslation();
    return (React.createElement(Box, null,
        React.createElement(DashboardHeader, null),
        React.createElement(Box, { mt: ['xl', 'xl', '-100px'], mb: "xl", mx: [0, 0, 0, 'auto'], px: ['default', 'lg', 'xxl', '0'], position: "relative", flex: true, flexDirection: "row", flexWrap: "wrap", width: [1, 1, 1, 1024] },
            membershipCards({ translateMessage }).map((card, index) => (React.createElement(Box, { key: index, width: [1, 1 / 2, 1 / 2, 1 / 3], p: "lg" },
                React.createElement(Card, { as: "a", href: card.href },
                    React.createElement(Text, { textAlign: "center" },
                        React.createElement(Illustration, { variant: card.variant, width: 100, height: 70 }),
                        React.createElement(H5, { mt: "md" }, card.title),
                        React.createElement(Text, null, card.subtitle)))))),
            React.createElement(Card, { width: 1, m: "lg" },
                React.createElement(Text, { textAlign: "center" },
                    React.createElement(Illustration, { variant: "AdminJSLogo" }),
                    React.createElement(H5, null, "Need Help?"),
                    React.createElement(Text, null, "Contact our support team for assistance."),
                    React.createElement(Text, { mt: "xxl" },
                        React.createElement(Button, { as: "a", variant: "contained", href: "/support", target: "_blank" }, "Contact Support")))),
            React.createElement(Box, { width: [1, 1, 1 / 2], p: "lg" },
                React.createElement(Card, { as: "a", flex: true, href: "/community" },
                    React.createElement(Box, { flexShrink: 0, className: "dsc-icon" }),
                    React.createElement(Box, { ml: "xl" },
                        React.createElement(H5, null, "Join Our Community"),
                        React.createElement(Text, null, "Connect with other membership managers.")))),
            React.createElement(Box, { width: [1, 1, 1 / 2], p: "lg" },
                React.createElement(Card, { as: "a", flex: true, href: "/feedback" },
                    React.createElement(Box, { flexShrink: 0, className: "gh-icon" },
                        React.createElement(Illustration, { variant: "GithubLogo" })),
                    React.createElement(Box, { ml: "xl" },
                        React.createElement(H5, null, "Feedback & Suggestions"),
                        React.createElement(Text, null, "Share your feedback to help us improve.")))))));
};
export default Dashboard;
