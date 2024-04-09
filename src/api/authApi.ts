import axios from 'axios';

const url = 'http://canodrom.onrender.com/auth/login';

export const login = (email: string, password: string) => axios.post(url, {
        email, password
});

