import axios from 'axios';

const url = 'http://localhost:3000/auth/login';

export const login = (email: string, password: string) => axios.post(url, {
        email, password
});

