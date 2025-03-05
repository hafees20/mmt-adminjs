import React from 'react';
import { Link } from 'react-router-dom';
import { cssClass, themeGet, Box } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import { ViewHelpers } from 'adminjs';
const EnhancedBranding = styled(Box) `
  ${cssClass('Logo')}
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${themeGet('space', 'xxl')} ${themeGet('space', 'xxl')}; /* Increased vertical padding */
  min-height: 80px; /* Added minimal height */
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  & .app-name {
    font-family: ${themeGet('font', 'sans')};
    font-weight: ${themeGet('fontWeights', 'bolder')};
    font-size: ${themeGet('fontSizes', 'xl')}; /* Increased size */
    color: ${themeGet('colors', 'grey80')};
    letter-spacing: 0.05em;
    transition: color 0.2s ease-in-out;
    line-height: 1.2; /* Better line spacing */
  }

  &:hover .app-name {
    color: ${themeGet('colors', 'primary100')};
  }

  @media (max-width: ${themeGet('breakpoints', 'tablet')}) {
    padding: ${themeGet('space', 'xl')} ${themeGet('space', 'lg')}; /* Adjusted mobile padding */
    min-height: 70px; /* Reduced height for mobile */
    
    .app-name {
      font-size: ${themeGet('fontSizes', 'xl')}; /* Responsive font size */
    }
  }

  @media (max-width: ${themeGet('breakpoints', 'sm')}) {
    padding: ${themeGet('space', 'lg')} ${themeGet('space', 'md')};
    min-height: 60px;
    
    .app-name {
      font-size: ${themeGet('fontSizes', 'lg')};
    }
  }
`;
const h = new ViewHelpers();
const SidebarBranding = ({ branding }) => {
    return (React.createElement(EnhancedBranding, { as: Link, to: h.dashboardUrl(), "data-css": "sidebar-logo" },
        React.createElement("span", { className: "app-name" }, branding.companyName)));
};
export default SidebarBranding;
