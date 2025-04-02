export const adminCheck = ({ currentAdmin }) => {
    return currentAdmin.role === 'admin';
};
export const clientCheck = ({ currentAdmin }) => {
    return currentAdmin.role === 'client';
};
