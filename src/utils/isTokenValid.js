import { jwtDecode } from "jwt-decode";



export default function isTokenValid(token) {
    if (!token) return;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return {
        email: decodedToken.email,
        validity: decodedToken.exp > currentTime
    }
};