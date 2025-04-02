(function (React, designSystem, reactFeather, styledComponents, adminjs, reactRouterDom) {
	'use strict';

	function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

	var React__default = /*#__PURE__*/_interopDefault(React);

	const formatCoordinate = (coord, isLatitude) => {
	  const direction = isLatitude ? coord >= 0 ? 'N' : 'S' : coord >= 0 ? 'E' : 'W';
	  const absoluteValue = Math.abs(coord).toFixed(6);
	  return `${absoluteValue}° ${direction}`;
	};
	const GeogDisplay = ({
	  record
	}) => {
	  const latLng = record?.params?.geog;
	  if (!latLng) {
	    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	      variant: "body",
	      color: "grey60"
	    }, "No location data available"));
	  }
	  try {
	    const [latitude, longitude] = latLng.split(', ').map(Number);
	    if (isNaN(latitude) || isNaN(longitude)) {
	      throw new Error('Invalid coordinates');
	    }
	    const maps = {
	      osm: `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15`
	      //google: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
	      //apple: `https://maps.apple.com/?ll=${latitude},${longitude}&z=15`
	    };
	    const handleMapClick = url => e => {
	      e.preventDefault();
	      e.stopPropagation();
	      window.open(url, '_blank', 'noopener,noreferrer');
	    };
	    return /*#__PURE__*/React__default.default.createElement(designSystem.Box
	    //onClick={(e) => e.stopPropagation()}
	    //onTouchStart={(e) => e.stopPropagation()}
	    //style={{ touchAction: 'manipulation' }}
	    , null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	      mb: "xl"
	    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "GPS Coordinates"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	      mt: "sm",
	      display: "flex",
	      alignItems: "center",
	      gap: "sm"
	    }, /*#__PURE__*/React__default.default.createElement(reactFeather.Compass, {
	      size: 16
	    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	      variant: "body",
	      fontFamily: "monospace"
	    }, formatCoordinate(latitude, true), ", ", formatCoordinate(longitude, false)))));
	  } catch (error) {
	    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	      color: "danger"
	    }, "Invalid location format: ", latLng), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	      mt: "sm",
	      variant: "caption"
	    }, "Expected format: \"latitude, longitude\""));
	  }
	};

	const pageHeaderHeight = 300;
	const pageHeaderPaddingY = 74;
	const pageHeaderPaddingX = 250;

	// Dashboard Header
	const DashboardHeader = () => {
	  const {
	    translateMessage
	  } = adminjs.useTranslation();
	  return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    "data-css": "default-dashboard"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    position: "relative",
	    overflow: "hidden",
	    bg: "white",
	    height: pageHeaderHeight,
	    py: pageHeaderPaddingY,
	    px: ['default', 'lg', pageHeaderPaddingX]
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    position: "absolute",
	    top: 30,
	    left: 0,
	    opacity: 0.9,
	    animate: true,
	    display: ['none', 'none', 'none', 'block']
	  }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	    textAlign: "center",
	    color: "grey100"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
	    fontWeight: "bold"
	  }, translateMessage('welcomeOnBoard_title')), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	    opacity: 0.8
	  }, translateMessage('welcomeOnBoard_subtitle')))));
	};

	// Membership Card Data
	const membershipCards = ({
	  translateMessage
	}) => [{
	  variant: 'Details',
	  title: 'Manage Members',
	  subtitle: 'Add, edit, or remove members from your database.',
	  href: '/resources/Members'
	}, {
	  variant: 'Docs',
	  title: 'Subscription Plans',
	  subtitle: 'Create and manage subscription plans for members.',
	  href: '/subscriptions'
	}, {
	  variant: 'Plug',
	  title: 'Payment Tracking',
	  subtitle: 'Track payments and generate invoices for members.',
	  href: '/payments'
	}, {
	  variant: 'Cup',
	  title: 'Member Analytics',
	  subtitle: 'View insights and reports on member activity.',
	  href: '/analytics'
	}, {
	  variant: 'Photos',
	  title: 'Communication Tools',
	  subtitle: 'Send emails and notifications to members.',
	  href: '/communication'
	}, {
	  variant: 'IdentityCard',
	  title: 'Role Management',
	  subtitle: 'Assign roles and permissions to members.',
	  href: '/roles'
	}];

	// Styled Card Component
	const Card = styledComponents.styled(designSystem.Box)`
  display: ${({
  flex
}) => flex ? 'flex' : 'block'};
  color: ${({
  theme
}) => theme.colors.grey100};
  height: 100%;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: ${({
  theme
}) => theme.space.md};
  transition: all 0.1s ease-in;

  &:hover {
    border: 1px solid ${({
  theme
}) => theme.colors.primary60};
    box-shadow: ${({
  theme
}) => theme.shadows.cardHover};
  }

  & .dsc-icon svg,
  .gh-icon svg {
    width: 64px;
    height: 64px;
  }
`;
	Card.defaultProps = {
	  variant: 'container',
	  boxShadow: 'card'
	};

	// Dashboard Component
	const Dashboard = () => {
	  const {
	    translateMessage,
	    translateButton
	  } = adminjs.useTranslation();
	  return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(DashboardHeader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    mt: ['xl', 'xl', '-100px'],
	    mb: "xl",
	    mx: [0, 0, 0, 'auto'],
	    px: ['default', 'lg', 'xxl', '0'],
	    position: "relative",
	    flex: true,
	    flexDirection: "row",
	    flexWrap: "wrap",
	    width: [1, 1, 1, 1024]
	  }, membershipCards({
	    translateMessage
	  }).map((card, index) => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    key: index,
	    width: [1, 1 / 2, 1 / 2, 1 / 3],
	    p: "lg"
	  }, /*#__PURE__*/React__default.default.createElement(Card, {
	    as: "a",
	    href: card.href
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	    textAlign: "center"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
	    variant: card.variant,
	    width: 100,
	    height: 70
	  }), /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
	    mt: "md"
	  }, card.title), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, card.subtitle))))), /*#__PURE__*/React__default.default.createElement(Card, {
	    width: 1,
	    m: "lg"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	    textAlign: "center"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
	    variant: "AdminJSLogo"
	  }), /*#__PURE__*/React__default.default.createElement(designSystem.H5, null, "Need Help?"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Contact our support team for assistance."), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
	    mt: "xxl"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
	    as: "a",
	    variant: "contained",
	    href: "/support",
	    target: "_blank"
	  }, "Contact Support")))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    width: [1, 1, 1 / 2],
	    p: "lg"
	  }, /*#__PURE__*/React__default.default.createElement(Card, {
	    as: "a",
	    flex: true,
	    href: "/community"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    flexShrink: 0,
	    className: "dsc-icon"
	  }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    ml: "xl"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, null, "Join Our Community"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Connect with other membership managers.")))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    width: [1, 1, 1 / 2],
	    p: "lg"
	  }, /*#__PURE__*/React__default.default.createElement(Card, {
	    as: "a",
	    flex: true,
	    href: "/feedback"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    flexShrink: 0,
	    className: "gh-icon"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.Illustration, {
	    variant: "GithubLogo"
	  })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
	    ml: "xl"
	  }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, null, "Feedback & Suggestions"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Share your feedback to help us improve."))))));
	};

	const SidebarResourceSection = ({
	  resources
	}) => {
	  const elements = adminjs.useNavigationResources(resources);
	  const {
	    translateLabel
	  } = adminjs.useTranslation();
	  const flattenedElements = elements.flatMap(element => element.elements ? element.elements : [element]);
	  return /*#__PURE__*/React__default.default.createElement(designSystem.Navigation, {
	    label: translateLabel('navigation'),
	    elements: flattenedElements
	  });
	};

	const EnhancedBranding = styledComponents.styled(designSystem.Box)`
  ${designSystem.cssClass('Logo')}
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${designSystem.themeGet('space', 'xxl')} ${designSystem.themeGet('space', 'xxl')}; /* Increased vertical padding */
  min-height: 80px; /* Added minimal height */
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  & .app-name {
    font-family: ${designSystem.themeGet('font', 'sans')};
    font-weight: ${designSystem.themeGet('fontWeights', 'bolder')};
    font-size: ${designSystem.themeGet('fontSizes', 'xl')}; /* Increased size */
    color: ${designSystem.themeGet('colors', 'grey80')};
    letter-spacing: 0.05em;
    transition: color 0.2s ease-in-out;
    line-height: 1.2; /* Better line spacing */
  }

  &:hover .app-name {
    color: ${designSystem.themeGet('colors', 'primary100')};
  }

  @media (max-width: ${designSystem.themeGet('breakpoints', 'tablet')}) {
    padding: ${designSystem.themeGet('space', 'xl')} ${designSystem.themeGet('space', 'lg')}; /* Adjusted mobile padding */
    min-height: 70px; /* Reduced height for mobile */
    
    .app-name {
      font-size: ${designSystem.themeGet('fontSizes', 'xl')}; /* Responsive font size */
    }
  }

  @media (max-width: ${designSystem.themeGet('breakpoints', 'sm')}) {
    padding: ${designSystem.themeGet('space', 'lg')} ${designSystem.themeGet('space', 'md')};
    min-height: 60px;
    
    .app-name {
      font-size: ${designSystem.themeGet('fontSizes', 'lg')};
    }
  }
`;
	const h = new adminjs.ViewHelpers();
	const SidebarBranding = ({
	  branding
	}) => {
	  return /*#__PURE__*/React__default.default.createElement(EnhancedBranding, {
	    as: reactRouterDom.Link,
	    to: h.dashboardUrl(),
	    "data-css": "sidebar-logo"
	  }, /*#__PURE__*/React__default.default.createElement("span", {
	    className: "app-name"
	  }, branding.companyName));
	};

	AdminJS.UserComponents = {};
	AdminJS.UserComponents.GeogDisplay = GeogDisplay;
	AdminJS.UserComponents.Dashboard = Dashboard;
	AdminJS.UserComponents.SidebarResourceSection = SidebarResourceSection;
	AdminJS.UserComponents.SidebarBranding = SidebarBranding;

})(React, AdminJSDesignSystem, FeatherIcons, styled, AdminJS, ReactRouterDOM);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9HZW9nRGlzcGxheS50c3giLCIuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvU2lkZWJhclJlc291cmNlcy50c3giLCIuLi9zcmMvY29tcG9uZW50cy9TaWRlYmFyQnJhbmRpbmcudHN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgU2hvd1Byb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgQm94LCBMYWJlbCwgQnV0dG9uLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcbmltcG9ydCB7IE1hcFBpbiwgQ29tcGFzcywgRXh0ZXJuYWxMaW5rIH0gZnJvbSAncmVhY3QtZmVhdGhlcidcblxuY29uc3QgZm9ybWF0Q29vcmRpbmF0ZSA9IChjb29yZDogbnVtYmVyLCBpc0xhdGl0dWRlOiBib29sZWFuKTogc3RyaW5nID0+IHtcblx0Y29uc3QgZGlyZWN0aW9uID0gaXNMYXRpdHVkZVxuXHRcdD8gY29vcmQgPj0gMCA/ICdOJyA6ICdTJ1xuXHRcdDogY29vcmQgPj0gMCA/ICdFJyA6ICdXJ1xuXG5cdGNvbnN0IGFic29sdXRlVmFsdWUgPSBNYXRoLmFicyhjb29yZCkudG9GaXhlZCg2KVxuXHRyZXR1cm4gYCR7YWJzb2x1dGVWYWx1ZX3CsCAke2RpcmVjdGlvbn1gXG59XG5cbmNvbnN0IEdlb2dEaXNwbGF5OiBSZWFjdC5GQzxTaG93UHJvcGVydHlQcm9wcz4gPSAoeyByZWNvcmQgfSkgPT4ge1xuXHRjb25zdCBsYXRMbmcgPSByZWNvcmQ/LnBhcmFtcz8uZ2VvZ1xuXG5cdGlmICghbGF0TG5nKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxCb3g+XG5cdFx0XHRcdDxUZXh0IHZhcmlhbnQ9XCJib2R5XCIgY29sb3I9XCJncmV5NjBcIj5ObyBsb2NhdGlvbiBkYXRhIGF2YWlsYWJsZTwvVGV4dD5cblx0XHRcdDwvQm94PlxuXHRcdClcblx0fVxuXG5cdHRyeSB7XG5cdFx0Y29uc3QgW2xhdGl0dWRlLCBsb25naXR1ZGVdID0gbGF0TG5nLnNwbGl0KCcsICcpLm1hcChOdW1iZXIpXG5cblx0XHRpZiAoaXNOYU4obGF0aXR1ZGUpIHx8IGlzTmFOKGxvbmdpdHVkZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb29yZGluYXRlcycpXG5cdFx0fVxuXG5cdFx0Y29uc3QgbWFwcyA9IHtcblx0XHRcdG9zbTogYGh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnLz9tbGF0PSR7bGF0aXR1ZGV9Jm1sb249JHtsb25naXR1ZGV9Jnpvb209MTVgLFxuXHRcdFx0Ly9nb29nbGU6IGBodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvc2VhcmNoLz9hcGk9MSZxdWVyeT0ke2xhdGl0dWRlfSwke2xvbmdpdHVkZX1gLFxuXHRcdFx0Ly9hcHBsZTogYGh0dHBzOi8vbWFwcy5hcHBsZS5jb20vP2xsPSR7bGF0aXR1ZGV9LCR7bG9uZ2l0dWRlfSZ6PTE1YFxuXHRcdH1cblxuXHRcdGNvbnN0IGhhbmRsZU1hcENsaWNrID0gKHVybDogc3RyaW5nKSA9PiAoZTogUmVhY3QuTW91c2VFdmVudCB8IFJlYWN0LlRvdWNoRXZlbnQpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFx0d2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKVxuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8Qm94XG5cdFx0XHQvL29uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuXHRcdFx0Ly9vblRvdWNoU3RhcnQ9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuXHRcdFx0Ly9zdHlsZT17eyB0b3VjaEFjdGlvbjogJ21hbmlwdWxhdGlvbicgfX1cblx0XHRcdD5cblx0XHRcdFx0PEJveCBtYj1cInhsXCI+XG5cdFx0XHRcdFx0PExhYmVsPkdQUyBDb29yZGluYXRlczwvTGFiZWw+XG5cdFx0XHRcdFx0PEJveCBtdD1cInNtXCIgZGlzcGxheT1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZ2FwPVwic21cIj5cblx0XHRcdFx0XHRcdDxDb21wYXNzIHNpemU9ezE2fSAvPlxuXHRcdFx0XHRcdFx0PFRleHQgdmFyaWFudD1cImJvZHlcIiBmb250RmFtaWx5PVwibW9ub3NwYWNlXCI+XG5cdFx0XHRcdFx0XHRcdHtmb3JtYXRDb29yZGluYXRlKGxhdGl0dWRlLCB0cnVlKX0sIHtmb3JtYXRDb29yZGluYXRlKGxvbmdpdHVkZSwgZmFsc2UpfVxuXHRcdFx0XHRcdFx0PC9UZXh0PlxuXHRcdFx0XHRcdDwvQm94PlxuXHRcdFx0XHQ8L0JveD5cblxuXHRcdFx0XHR7Lyo8Qm94PlxuXHRcdFx0XHRcdDxMYWJlbD5WaWV3IG9uIE1hcDwvTGFiZWw+XG5cdFx0XHRcdFx0PEJveFxuXHRcdFx0XHRcdFx0bXQ9XCJzbVwiXG5cdFx0XHRcdFx0XHRkaXNwbGF5PVwiZmxleFwiXG5cdFx0XHRcdFx0XHRmbGV4RGlyZWN0aW9uPXtbJ2NvbHVtbicsICdyb3cnXX0gLy8gU3RhY2sgdmVydGljYWxseSBvbiBtb2JpbGVcblx0XHRcdFx0XHRcdGdhcD1cIm1kXCJcblx0XHRcdFx0XHRcdGZsZXhXcmFwPVwid3JhcFwiXG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0e09iamVjdC5lbnRyaWVzKG1hcHMpLm1hcCgoW3NlcnZpY2UsIHVybF0pID0+IChcblx0XHRcdFx0XHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRcdFx0XHRcdGtleT17c2VydmljZX1cblx0XHRcdFx0XHRcdFx0XHR2YXJpYW50PVwib3V0bGluZWRcIlxuXHRcdFx0XHRcdFx0XHRcdHB5PVwiZGVmYXVsdFwiXG5cdFx0XHRcdFx0XHRcdFx0d2lkdGg9e1snMTAwJScsICdhdXRvJ119IC8vIEZ1bGwgd2lkdGggb24gbW9iaWxlXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17aGFuZGxlTWFwQ2xpY2sodXJsKX1cblx0XHRcdFx0XHRcdFx0XHRvblRvdWNoRW5kPXtoYW5kbGVNYXBDbGljayh1cmwpfVxuXHRcdFx0XHRcdFx0XHRcdHN0eWxlPXt7XG5cdFx0XHRcdFx0XHRcdFx0XHRtaW5XaWR0aDogJzE0MHB4Jyxcblx0XHRcdFx0XHRcdFx0XHRcdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcblx0XHRcdFx0XHRcdFx0XHRcdFdlYmtpdFRhcEhpZ2hsaWdodENvbG9yOiAndHJhbnNwYXJlbnQnXG5cdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdDxCb3hcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk9XCJmbGV4XCJcblx0XHRcdFx0XHRcdFx0XHRcdGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0Z2FwPVwic21cIlxuXHRcdFx0XHRcdFx0XHRcdFx0d2lkdGg9XCIxMDAlXCJcblx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPXt7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScgLy8gUHJldmVudCBuZXN0ZWQgZWxlbWVudCBpbnRlcmZlcmVuY2Vcblx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PE1hcFBpbiBzaXplPXsxNH0gLz5cblx0XHRcdFx0XHRcdFx0XHRcdDxUZXh0IGZvbnRTaXplPVwic21cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0e3NlcnZpY2UgPT09ICdvc20nICYmICdPcGVuU3RyZWV0TWFwJ31cblx0XHRcdFx0XHRcdFx0XHRcdFx0e3NlcnZpY2UgPT09ICdnb29nbGUnICYmICdHb29nbGUgTWFwcyd9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtzZXJ2aWNlID09PSAnYXBwbGUnICYmICdBcHBsZSBNYXBzJ31cblx0XHRcdFx0XHRcdFx0XHRcdDwvVGV4dD5cblx0XHRcdFx0XHRcdFx0XHRcdDxFeHRlcm5hbExpbmsgc2l6ZT17MTJ9IC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9Cb3g+XG5cdFx0XHRcdFx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0XHRcdFx0KSl9XG5cdFx0XHRcdFx0PC9Cb3g+XG5cdFx0XHRcdDwvQm94PiovfVxuXHRcdFx0PC9Cb3g+XG5cdFx0KVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8Qm94PlxuXHRcdFx0XHQ8VGV4dCBjb2xvcj1cImRhbmdlclwiPkludmFsaWQgbG9jYXRpb24gZm9ybWF0OiB7bGF0TG5nfTwvVGV4dD5cblx0XHRcdFx0PFRleHQgbXQ9XCJzbVwiIHZhcmlhbnQ9XCJjYXB0aW9uXCI+RXhwZWN0ZWQgZm9ybWF0OiBcImxhdGl0dWRlLCBsb25naXR1ZGVcIjwvVGV4dD5cblx0XHRcdDwvQm94PlxuXHRcdClcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBHZW9nRGlzcGxheVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBIMiwgSDUsIElsbHVzdHJhdGlvbiwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbS9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBwYWdlSGVhZGVySGVpZ2h0ID0gMzAwO1xuY29uc3QgcGFnZUhlYWRlclBhZGRpbmdZID0gNzQ7XG5jb25zdCBwYWdlSGVhZGVyUGFkZGluZ1ggPSAyNTA7XG5cbi8vIERhc2hib2FyZCBIZWFkZXJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmRIZWFkZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuXHRjb25zdCB7IHRyYW5zbGF0ZU1lc3NhZ2UgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG5cdHJldHVybiAoXG5cdFx0PEJveCBkYXRhLWNzcz1cImRlZmF1bHQtZGFzaGJvYXJkXCI+XG5cdFx0XHQ8Qm94XG5cdFx0XHRcdHBvc2l0aW9uPVwicmVsYXRpdmVcIlxuXHRcdFx0XHRvdmVyZmxvdz1cImhpZGRlblwiXG5cdFx0XHRcdGJnPVwid2hpdGVcIlxuXHRcdFx0XHRoZWlnaHQ9e3BhZ2VIZWFkZXJIZWlnaHR9XG5cdFx0XHRcdHB5PXtwYWdlSGVhZGVyUGFkZGluZ1l9XG5cdFx0XHRcdHB4PXtbJ2RlZmF1bHQnLCAnbGcnLCBwYWdlSGVhZGVyUGFkZGluZ1hdfVxuXHRcdFx0PlxuXHRcdFx0XHQ8Qm94IHBvc2l0aW9uPVwiYWJzb2x1dGVcIiB0b3A9ezMwfSBsZWZ0PXswfSBvcGFjaXR5PXswLjl9IGFuaW1hdGUgZGlzcGxheT17Wydub25lJywgJ25vbmUnLCAnbm9uZScsICdibG9jayddfT5cblx0XHRcdFx0XHR7Lyo8Um9ja2V0U1ZHIC8+Ki99XG5cdFx0XHRcdDwvQm94PlxuXHRcdFx0XHQ8VGV4dCB0ZXh0QWxpZ249XCJjZW50ZXJcIiBjb2xvcj1cImdyZXkxMDBcIj5cblx0XHRcdFx0XHQ8SDIgZm9udFdlaWdodD1cImJvbGRcIj57dHJhbnNsYXRlTWVzc2FnZSgnd2VsY29tZU9uQm9hcmRfdGl0bGUnKX08L0gyPlxuXHRcdFx0XHRcdDxUZXh0IG9wYWNpdHk9ezAuOH0+e3RyYW5zbGF0ZU1lc3NhZ2UoJ3dlbGNvbWVPbkJvYXJkX3N1YnRpdGxlJyl9PC9UZXh0PlxuXHRcdFx0XHQ8L1RleHQ+XG5cdFx0XHQ8L0JveD5cblx0XHQ8L0JveD5cblx0KTtcbn07XG5cbi8vIE1lbWJlcnNoaXAgQ2FyZCBEYXRhXG5jb25zdCBtZW1iZXJzaGlwQ2FyZHMgPSAoeyB0cmFuc2xhdGVNZXNzYWdlIH0pOiBBcnJheTx7XG5cdHZhcmlhbnQ6IHN0cmluZztcblx0dGl0bGU6IHN0cmluZztcblx0c3VidGl0bGU6IHN0cmluZztcblx0aHJlZjogc3RyaW5nO1xufT4gPT4gW1xuXHRcdHtcblx0XHRcdHZhcmlhbnQ6ICdEZXRhaWxzJyxcblx0XHRcdHRpdGxlOiAnTWFuYWdlIE1lbWJlcnMnLFxuXHRcdFx0c3VidGl0bGU6ICdBZGQsIGVkaXQsIG9yIHJlbW92ZSBtZW1iZXJzIGZyb20geW91ciBkYXRhYmFzZS4nLFxuXHRcdFx0aHJlZjogJy9yZXNvdXJjZXMvTWVtYmVycycsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR2YXJpYW50OiAnRG9jcycsXG5cdFx0XHR0aXRsZTogJ1N1YnNjcmlwdGlvbiBQbGFucycsXG5cdFx0XHRzdWJ0aXRsZTogJ0NyZWF0ZSBhbmQgbWFuYWdlIHN1YnNjcmlwdGlvbiBwbGFucyBmb3IgbWVtYmVycy4nLFxuXHRcdFx0aHJlZjogJy9zdWJzY3JpcHRpb25zJyxcblx0XHR9LFxuXHRcdHtcblx0XHRcdHZhcmlhbnQ6ICdQbHVnJyxcblx0XHRcdHRpdGxlOiAnUGF5bWVudCBUcmFja2luZycsXG5cdFx0XHRzdWJ0aXRsZTogJ1RyYWNrIHBheW1lbnRzIGFuZCBnZW5lcmF0ZSBpbnZvaWNlcyBmb3IgbWVtYmVycy4nLFxuXHRcdFx0aHJlZjogJy9wYXltZW50cycsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR2YXJpYW50OiAnQ3VwJyxcblx0XHRcdHRpdGxlOiAnTWVtYmVyIEFuYWx5dGljcycsXG5cdFx0XHRzdWJ0aXRsZTogJ1ZpZXcgaW5zaWdodHMgYW5kIHJlcG9ydHMgb24gbWVtYmVyIGFjdGl2aXR5LicsXG5cdFx0XHRocmVmOiAnL2FuYWx5dGljcycsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR2YXJpYW50OiAnUGhvdG9zJyxcblx0XHRcdHRpdGxlOiAnQ29tbXVuaWNhdGlvbiBUb29scycsXG5cdFx0XHRzdWJ0aXRsZTogJ1NlbmQgZW1haWxzIGFuZCBub3RpZmljYXRpb25zIHRvIG1lbWJlcnMuJyxcblx0XHRcdGhyZWY6ICcvY29tbXVuaWNhdGlvbicsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR2YXJpYW50OiAnSWRlbnRpdHlDYXJkJyxcblx0XHRcdHRpdGxlOiAnUm9sZSBNYW5hZ2VtZW50Jyxcblx0XHRcdHN1YnRpdGxlOiAnQXNzaWduIHJvbGVzIGFuZCBwZXJtaXNzaW9ucyB0byBtZW1iZXJzLicsXG5cdFx0XHRocmVmOiAnL3JvbGVzJyxcblx0XHR9LFxuXHRdO1xuXG4vLyBTdHlsZWQgQ2FyZCBDb21wb25lbnRcbmNvbnN0IENhcmQgPSBzdHlsZWQoQm94KWBcbiAgZGlzcGxheTogJHsoeyBmbGV4IH0pOiBzdHJpbmcgPT4gKGZsZXggPyAnZmxleCcgOiAnYmxvY2snKX07XG4gIGNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5ncmV5MTAwfTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLnNwYWNlLm1kfTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMXMgZWFzZS1pbjtcblxuICAmOmhvdmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5wcmltYXJ5NjB9O1xuICAgIGJveC1zaGFkb3c6ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuc2hhZG93cy5jYXJkSG92ZXJ9O1xuICB9XG5cbiAgJiAuZHNjLWljb24gc3ZnLFxuICAuZ2gtaWNvbiBzdmcge1xuICAgIHdpZHRoOiA2NHB4O1xuICAgIGhlaWdodDogNjRweDtcbiAgfVxuYDtcblxuQ2FyZC5kZWZhdWx0UHJvcHMgPSB7XG5cdHZhcmlhbnQ6ICdjb250YWluZXInLFxuXHRib3hTaGFkb3c6ICdjYXJkJyxcbn07XG5cbi8vIERhc2hib2FyZCBDb21wb25lbnRcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ6IFJlYWN0LkZDID0gKCkgPT4ge1xuXHRjb25zdCB7IHRyYW5zbGF0ZU1lc3NhZ2UsIHRyYW5zbGF0ZUJ1dHRvbiB9ID0gdXNlVHJhbnNsYXRpb24oKTtcblxuXHRyZXR1cm4gKFxuXHRcdDxCb3g+XG5cdFx0XHQ8RGFzaGJvYXJkSGVhZGVyIC8+XG5cdFx0XHQ8Qm94XG5cdFx0XHRcdG10PXtbJ3hsJywgJ3hsJywgJy0xMDBweCddfVxuXHRcdFx0XHRtYj1cInhsXCJcblx0XHRcdFx0bXg9e1swLCAwLCAwLCAnYXV0byddfVxuXHRcdFx0XHRweD17WydkZWZhdWx0JywgJ2xnJywgJ3h4bCcsICcwJ119XG5cdFx0XHRcdHBvc2l0aW9uPVwicmVsYXRpdmVcIlxuXHRcdFx0XHRmbGV4XG5cdFx0XHRcdGZsZXhEaXJlY3Rpb249XCJyb3dcIlxuXHRcdFx0XHRmbGV4V3JhcD1cIndyYXBcIlxuXHRcdFx0XHR3aWR0aD17WzEsIDEsIDEsIDEwMjRdfVxuXHRcdFx0PlxuXHRcdFx0XHR7bWVtYmVyc2hpcENhcmRzKHsgdHJhbnNsYXRlTWVzc2FnZSB9KS5tYXAoKGNhcmQsIGluZGV4KSA9PiAoXG5cdFx0XHRcdFx0PEJveCBrZXk9e2luZGV4fSB3aWR0aD17WzEsIDEgLyAyLCAxIC8gMiwgMSAvIDNdfSBwPVwibGdcIj5cblx0XHRcdFx0XHRcdDxDYXJkIGFzPVwiYVwiIGhyZWY9e2NhcmQuaHJlZn0+XG5cdFx0XHRcdFx0XHRcdDxUZXh0IHRleHRBbGlnbj1cImNlbnRlclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxJbGx1c3RyYXRpb24gdmFyaWFudD17Y2FyZC52YXJpYW50IGFzIGFueX0gd2lkdGg9ezEwMH0gaGVpZ2h0PXs3MH0gLz5cblx0XHRcdFx0XHRcdFx0XHQ8SDUgbXQ9XCJtZFwiPntjYXJkLnRpdGxlfTwvSDU+XG5cdFx0XHRcdFx0XHRcdFx0PFRleHQ+e2NhcmQuc3VidGl0bGV9PC9UZXh0PlxuXHRcdFx0XHRcdFx0XHQ8L1RleHQ+XG5cdFx0XHRcdFx0XHQ8L0NhcmQ+XG5cdFx0XHRcdFx0PC9Cb3g+XG5cdFx0XHRcdCkpfVxuXHRcdFx0XHQ8Q2FyZCB3aWR0aD17MX0gbT1cImxnXCI+XG5cdFx0XHRcdFx0PFRleHQgdGV4dEFsaWduPVwiY2VudGVyXCI+XG5cdFx0XHRcdFx0XHQ8SWxsdXN0cmF0aW9uIHZhcmlhbnQ9XCJBZG1pbkpTTG9nb1wiIC8+XG5cdFx0XHRcdFx0XHQ8SDU+TmVlZCBIZWxwPzwvSDU+XG5cdFx0XHRcdFx0XHQ8VGV4dD5Db250YWN0IG91ciBzdXBwb3J0IHRlYW0gZm9yIGFzc2lzdGFuY2UuPC9UZXh0PlxuXHRcdFx0XHRcdFx0PFRleHQgbXQ9XCJ4eGxcIj5cblx0XHRcdFx0XHRcdFx0PEJ1dHRvbiBhcz1cImFcIiB2YXJpYW50PVwiY29udGFpbmVkXCIgaHJlZj1cIi9zdXBwb3J0XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG5cdFx0XHRcdFx0XHRcdFx0Q29udGFjdCBTdXBwb3J0XG5cdFx0XHRcdFx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9UZXh0PlxuXHRcdFx0XHRcdDwvVGV4dD5cblx0XHRcdFx0PC9DYXJkPlxuXHRcdFx0XHQ8Qm94IHdpZHRoPXtbMSwgMSwgMSAvIDJdfSBwPVwibGdcIj5cblx0XHRcdFx0XHQ8Q2FyZCBhcz1cImFcIiBmbGV4IGhyZWY9XCIvY29tbXVuaXR5XCI+XG5cdFx0XHRcdFx0XHQ8Qm94IGZsZXhTaHJpbms9ezB9IGNsYXNzTmFtZT1cImRzYy1pY29uXCI+XG5cdFx0XHRcdFx0XHRcdHsvKlxuXHRcdFx0XHRcdFx0XHQ8RGlzY29yZExvZ28gLz5cblx0XHRcdFx0XHRcdFx0Ki99XG5cdFx0XHRcdFx0XHQ8L0JveD5cblx0XHRcdFx0XHRcdDxCb3ggbWw9XCJ4bFwiPlxuXHRcdFx0XHRcdFx0XHQ8SDU+Sm9pbiBPdXIgQ29tbXVuaXR5PC9INT5cblx0XHRcdFx0XHRcdFx0PFRleHQ+Q29ubmVjdCB3aXRoIG90aGVyIG1lbWJlcnNoaXAgbWFuYWdlcnMuPC9UZXh0PlxuXHRcdFx0XHRcdFx0PC9Cb3g+XG5cdFx0XHRcdFx0PC9DYXJkPlxuXHRcdFx0XHQ8L0JveD5cblx0XHRcdFx0PEJveCB3aWR0aD17WzEsIDEsIDEgLyAyXX0gcD1cImxnXCI+XG5cdFx0XHRcdFx0PENhcmQgYXM9XCJhXCIgZmxleCBocmVmPVwiL2ZlZWRiYWNrXCI+XG5cdFx0XHRcdFx0XHQ8Qm94IGZsZXhTaHJpbms9ezB9IGNsYXNzTmFtZT1cImdoLWljb25cIj5cblx0XHRcdFx0XHRcdFx0PElsbHVzdHJhdGlvbiB2YXJpYW50PVwiR2l0aHViTG9nb1wiIC8+XG5cdFx0XHRcdFx0XHQ8L0JveD5cblx0XHRcdFx0XHRcdDxCb3ggbWw9XCJ4bFwiPlxuXHRcdFx0XHRcdFx0XHQ8SDU+RmVlZGJhY2sgJiBTdWdnZXN0aW9uczwvSDU+XG5cdFx0XHRcdFx0XHRcdDxUZXh0PlNoYXJlIHlvdXIgZmVlZGJhY2sgdG8gaGVscCB1cyBpbXByb3ZlLjwvVGV4dD5cblx0XHRcdFx0XHRcdDwvQm94PlxuXHRcdFx0XHRcdDwvQ2FyZD5cblx0XHRcdFx0PC9Cb3g+XG5cdFx0XHQ8L0JveD5cblx0XHQ8L0JveD5cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcbiIsImltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5hdmlnYXRpb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uLCB1c2VOYXZpZ2F0aW9uUmVzb3VyY2VzLCBSZXNvdXJjZUpTT04gfSBmcm9tICdhZG1pbmpzJztcblxudHlwZSBQcm9wcyA9IHtcblx0cmVzb3VyY2VzOiBBcnJheTxSZXNvdXJjZUpTT04+O1xufTtcblxuY29uc3QgU2lkZWJhclJlc291cmNlU2VjdGlvbjogRkM8UHJvcHM+ID0gKHsgcmVzb3VyY2VzIH0pID0+IHtcblx0Y29uc3QgZWxlbWVudHMgPSB1c2VOYXZpZ2F0aW9uUmVzb3VyY2VzKHJlc291cmNlcyk7XG5cdGNvbnN0IHsgdHJhbnNsYXRlTGFiZWwgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG5cblx0Y29uc3QgZmxhdHRlbmVkRWxlbWVudHMgPSBlbGVtZW50cy5mbGF0TWFwKChlbGVtZW50KSA9PiAoXG5cdFx0ZWxlbWVudC5lbGVtZW50cyA/IGVsZW1lbnQuZWxlbWVudHMgOiBbZWxlbWVudF1cblx0KSk7XG5cblx0cmV0dXJuIChcblx0XHQ8TmF2aWdhdGlvblxuXHRcdFx0bGFiZWw9e3RyYW5zbGF0ZUxhYmVsKCduYXZpZ2F0aW9uJyl9XG5cdFx0XHRlbGVtZW50cz17ZmxhdHRlbmVkRWxlbWVudHN9XG5cblx0XHQvPlxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2lkZWJhclJlc291cmNlU2VjdGlvblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBjc3NDbGFzcywgdGhlbWVHZXQsIEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5pbXBvcnQgeyBzdHlsZWQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtL3N0eWxlZC1jb21wb25lbnRzJ1xuaW1wb3J0IHsgVmlld0hlbHBlcnMgfSBmcm9tICdhZG1pbmpzJ1xuXG50eXBlIFByb3BzID0ge1xuXHRicmFuZGluZzogYW55O1xufVxuXG5jb25zdCBFbmhhbmNlZEJyYW5kaW5nID0gc3R5bGVkKEJveClgXG4gICR7Y3NzQ2xhc3MoJ0xvZ28nKX1cbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogJHt0aGVtZUdldCgnc3BhY2UnLCAneHhsJyl9ICR7dGhlbWVHZXQoJ3NwYWNlJywgJ3h4bCcpfTsgLyogSW5jcmVhc2VkIHZlcnRpY2FsIHBhZGRpbmcgKi9cbiAgbWluLWhlaWdodDogODBweDsgLyogQWRkZWQgbWluaW1hbCBoZWlnaHQgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcblxuICAmIC5hcHAtbmFtZSB7XG4gICAgZm9udC1mYW1pbHk6ICR7dGhlbWVHZXQoJ2ZvbnQnLCAnc2FucycpfTtcbiAgICBmb250LXdlaWdodDogJHt0aGVtZUdldCgnZm9udFdlaWdodHMnLCAnYm9sZGVyJyl9O1xuICAgIGZvbnQtc2l6ZTogJHt0aGVtZUdldCgnZm9udFNpemVzJywgJ3hsJyl9OyAvKiBJbmNyZWFzZWQgc2l6ZSAqL1xuICAgIGNvbG9yOiAke3RoZW1lR2V0KCdjb2xvcnMnLCAnZ3JleTgwJyl9O1xuICAgIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XG4gICAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLWluLW91dDtcbiAgICBsaW5lLWhlaWdodDogMS4yOyAvKiBCZXR0ZXIgbGluZSBzcGFjaW5nICovXG4gIH1cblxuICAmOmhvdmVyIC5hcHAtbmFtZSB7XG4gICAgY29sb3I6ICR7dGhlbWVHZXQoJ2NvbG9ycycsICdwcmltYXJ5MTAwJyl9O1xuICB9XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7dGhlbWVHZXQoJ2JyZWFrcG9pbnRzJywgJ3RhYmxldCcpfSkge1xuICAgIHBhZGRpbmc6ICR7dGhlbWVHZXQoJ3NwYWNlJywgJ3hsJyl9ICR7dGhlbWVHZXQoJ3NwYWNlJywgJ2xnJyl9OyAvKiBBZGp1c3RlZCBtb2JpbGUgcGFkZGluZyAqL1xuICAgIG1pbi1oZWlnaHQ6IDcwcHg7IC8qIFJlZHVjZWQgaGVpZ2h0IGZvciBtb2JpbGUgKi9cbiAgICBcbiAgICAuYXBwLW5hbWUge1xuICAgICAgZm9udC1zaXplOiAke3RoZW1lR2V0KCdmb250U2l6ZXMnLCAneGwnKX07IC8qIFJlc3BvbnNpdmUgZm9udCBzaXplICovXG4gICAgfVxuICB9XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7dGhlbWVHZXQoJ2JyZWFrcG9pbnRzJywgJ3NtJyl9KSB7XG4gICAgcGFkZGluZzogJHt0aGVtZUdldCgnc3BhY2UnLCAnbGcnKX0gJHt0aGVtZUdldCgnc3BhY2UnLCAnbWQnKX07XG4gICAgbWluLWhlaWdodDogNjBweDtcbiAgICBcbiAgICAuYXBwLW5hbWUge1xuICAgICAgZm9udC1zaXplOiAke3RoZW1lR2V0KCdmb250U2l6ZXMnLCAnbGcnKX07XG4gICAgfVxuICB9XG5gXG5cbmNvbnN0IGggPSBuZXcgVmlld0hlbHBlcnMoKVxuXG5jb25zdCBTaWRlYmFyQnJhbmRpbmc6IFJlYWN0LkZDPFByb3BzPiA9ICh7IGJyYW5kaW5nIH0pID0+IHtcblx0cmV0dXJuIChcblx0XHQ8RW5oYW5jZWRCcmFuZGluZ1xuXHRcdFx0YXM9e0xpbmt9XG5cdFx0XHR0bz17aC5kYXNoYm9hcmRVcmwoKX1cblx0XHRcdGRhdGEtY3NzPVwic2lkZWJhci1sb2dvXCJcblx0XHQ+XG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJhcHAtbmFtZVwiPlxuXHRcdFx0XHR7YnJhbmRpbmcuY29tcGFueU5hbWV9XG5cdFx0XHQ8L3NwYW4+XG5cdFx0PC9FbmhhbmNlZEJyYW5kaW5nPlxuXHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZGViYXJCcmFuZGluZ1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgR2VvZ0Rpc3BsYXkgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvR2VvZ0Rpc3BsYXknXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkdlb2dEaXNwbGF5ID0gR2VvZ0Rpc3BsYXlcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBTaWRlYmFyUmVzb3VyY2VTZWN0aW9uIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1NpZGViYXJSZXNvdXJjZXMnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlNpZGViYXJSZXNvdXJjZVNlY3Rpb24gPSBTaWRlYmFyUmVzb3VyY2VTZWN0aW9uXG5pbXBvcnQgU2lkZWJhckJyYW5kaW5nIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1NpZGViYXJCcmFuZGluZydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuU2lkZWJhckJyYW5kaW5nID0gU2lkZWJhckJyYW5kaW5nIl0sIm5hbWVzIjpbImZvcm1hdENvb3JkaW5hdGUiLCJjb29yZCIsImlzTGF0aXR1ZGUiLCJkaXJlY3Rpb24iLCJhYnNvbHV0ZVZhbHVlIiwiTWF0aCIsImFicyIsInRvRml4ZWQiLCJHZW9nRGlzcGxheSIsInJlY29yZCIsImxhdExuZyIsInBhcmFtcyIsImdlb2ciLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJUZXh0IiwidmFyaWFudCIsImNvbG9yIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJzcGxpdCIsIm1hcCIsIk51bWJlciIsImlzTmFOIiwiRXJyb3IiLCJtYXBzIiwib3NtIiwiaGFuZGxlTWFwQ2xpY2siLCJ1cmwiLCJlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJ3aW5kb3ciLCJvcGVuIiwibWIiLCJMYWJlbCIsIm10IiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJnYXAiLCJDb21wYXNzIiwic2l6ZSIsImZvbnRGYW1pbHkiLCJlcnJvciIsInBhZ2VIZWFkZXJIZWlnaHQiLCJwYWdlSGVhZGVyUGFkZGluZ1kiLCJwYWdlSGVhZGVyUGFkZGluZ1giLCJEYXNoYm9hcmRIZWFkZXIiLCJ0cmFuc2xhdGVNZXNzYWdlIiwidXNlVHJhbnNsYXRpb24iLCJwb3NpdGlvbiIsIm92ZXJmbG93IiwiYmciLCJoZWlnaHQiLCJweSIsInB4IiwidG9wIiwibGVmdCIsIm9wYWNpdHkiLCJhbmltYXRlIiwidGV4dEFsaWduIiwiSDIiLCJmb250V2VpZ2h0IiwibWVtYmVyc2hpcENhcmRzIiwidGl0bGUiLCJzdWJ0aXRsZSIsImhyZWYiLCJDYXJkIiwic3R5bGVkIiwiZmxleCIsInRoZW1lIiwiY29sb3JzIiwiZ3JleTEwMCIsInNwYWNlIiwibWQiLCJwcmltYXJ5NjAiLCJzaGFkb3dzIiwiY2FyZEhvdmVyIiwiZGVmYXVsdFByb3BzIiwiYm94U2hhZG93IiwiRGFzaGJvYXJkIiwidHJhbnNsYXRlQnV0dG9uIiwibXgiLCJmbGV4RGlyZWN0aW9uIiwiZmxleFdyYXAiLCJ3aWR0aCIsImNhcmQiLCJpbmRleCIsImtleSIsInAiLCJhcyIsIklsbHVzdHJhdGlvbiIsIkg1IiwibSIsIkJ1dHRvbiIsInRhcmdldCIsImZsZXhTaHJpbmsiLCJjbGFzc05hbWUiLCJtbCIsIlNpZGViYXJSZXNvdXJjZVNlY3Rpb24iLCJyZXNvdXJjZXMiLCJlbGVtZW50cyIsInVzZU5hdmlnYXRpb25SZXNvdXJjZXMiLCJ0cmFuc2xhdGVMYWJlbCIsImZsYXR0ZW5lZEVsZW1lbnRzIiwiZmxhdE1hcCIsImVsZW1lbnQiLCJOYXZpZ2F0aW9uIiwibGFiZWwiLCJFbmhhbmNlZEJyYW5kaW5nIiwiY3NzQ2xhc3MiLCJ0aGVtZUdldCIsImgiLCJWaWV3SGVscGVycyIsIlNpZGViYXJCcmFuZGluZyIsImJyYW5kaW5nIiwiTGluayIsInRvIiwiZGFzaGJvYXJkVXJsIiwiY29tcGFueU5hbWUiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Q0FLQSxNQUFNQSxnQkFBZ0IsR0FBR0EsQ0FBQ0MsS0FBYSxFQUFFQyxVQUFtQixLQUFhO0NBQ3hFLEVBQUEsTUFBTUMsU0FBUyxHQUFHRCxVQUFVLEdBQ3pCRCxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQ3RCQSxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHO0NBRXpCLEVBQUEsTUFBTUcsYUFBYSxHQUFHQyxJQUFJLENBQUNDLEdBQUcsQ0FBQ0wsS0FBSyxDQUFDLENBQUNNLE9BQU8sQ0FBQyxDQUFDLENBQUM7Q0FDaEQsRUFBQSxPQUFPLENBQUdILEVBQUFBLGFBQWEsQ0FBS0QsRUFBQUEsRUFBQUEsU0FBUyxDQUFFLENBQUE7Q0FDeEMsQ0FBQztDQUVELE1BQU1LLFdBQXdDLEdBQUdB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
