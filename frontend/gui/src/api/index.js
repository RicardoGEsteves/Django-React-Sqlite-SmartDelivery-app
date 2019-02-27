import axios from 'axios';

const url = 'http://127.0.0.1:8000/api';
export const fetchUsers = async () => {
    try {
        const res = await axios.get(`${url}/Users`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const fetchDeliveries = async () => {
    try {
        const res = await axios.get(`${url}/Deliveries`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
