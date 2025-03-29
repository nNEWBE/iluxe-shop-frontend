import { jwtDecode, JwtPayload } from 'jwt-decode';
import { userType } from '../layout/DashBoard';

export const verifyToken = (token: string) => {
    return jwtDecode(token) as JwtPayload & userType; 
};