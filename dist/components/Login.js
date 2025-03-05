import { Box, Button, FormGroup, H2, H5, Illustration, Input, Label, MadeWithLove, MessageBox, Text, } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'adminjs';
const LoginWrapper = styled(Box) `
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.grey20};
`;
const LoginCard = styled(Box) `
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.space.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 95%;
    margin: 0 auto;
  }
`;
const AuthIllustration = styled(Illustration) `
  [stroke='#3B3552'] {
    stroke: ${({ theme }) => theme.colors.primary20};
  }
  [fill='#3040D6'] {
    fill: ${({ theme }) => theme.colors.primary100};
  }
`;
const AuthForm = styled.form `
  padding: ${({ theme }) => theme.space.xxl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;
const BrandHeader = styled(H5) `
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.xxl};
  img {
    max-height: 48px;
  }
`;
const AuthButton = styled(Button) `
  width: 100%;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-1px);
  }
`;
export const Login = () => {
    const props = window.__APP_STATE__;
    const { action, errorMessage: message } = props;
    const { translateComponent, translateMessage } = useTranslation();
    const branding = useSelector((state) => state.branding);
    return (React.createElement(LoginWrapper, { flex: true, variant: "grey", className: "login__Wrapper" },
        React.createElement(LoginCard, { flex: true, boxShadow: "login" },
            React.createElement(Box, { bg: "primary20", p: "xxl", display: ['none', 'none', 'flex'], flexDirection: "column", alignItems: "center", justifyContent: "center", width: "380px" },
                React.createElement(H2, { fontWeight: "400", color: "primary100" }, translateComponent('Login.welcomeHeader')),
                React.createElement(Text, { mt: "lg", color: "grey80", lineHeight: "lg" }, translateComponent('Login.welcomeMessage')),
                React.createElement(Box, { mt: "xxl", display: "flex", gap: "xl" },
                    React.createElement(AuthIllustration, { variant: "Planet", width: 82, height: 91 }),
                    React.createElement(AuthIllustration, { variant: "Astronaut", width: 82, height: 91 }))),
            React.createElement(AuthForm, { action: action, method: "POST" },
                React.createElement(BrandHeader, null, branding.logo ? (React.createElement("img", { src: branding.logo, alt: branding.companyName })) : (branding.companyName)),
                message && (React.createElement(MessageBox, { my: "lg", message: message.split(' ').length > 1 ? message : translateMessage(message), variant: "danger" })),
                React.createElement(FormGroup, null,
                    React.createElement(Label, { required: true }, translateComponent('Login.properties.email')),
                    React.createElement(Input, { name: "email", placeholder: translateComponent('Login.properties.email'), variant: "xl" })),
                React.createElement(FormGroup, null,
                    React.createElement(Label, { required: true }, translateComponent('Login.properties.password')),
                    React.createElement(Input, { type: "password", name: "password", placeholder: translateComponent('Login.properties.password'), autoComplete: "new-password", variant: "xl" })),
                React.createElement(AuthButton, { variant: "contained", type: "submit" }, translateComponent('Login.loginButton')))),
        branding.withMadeWithLove && (React.createElement(Box, { mt: "xxl" },
            React.createElement(MadeWithLove, null)))));
};
export default Login;
