import React, { useContext } from 'react';
import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';
import { useAuth } from '../contexts/auth';

const Routes = () => {
const { signed } = useAuth();
    return signed ? <OtherRoutes /> : <SignRoutes />;
};

export default Routes;