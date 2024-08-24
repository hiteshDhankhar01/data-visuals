// services/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api'; // replace with your actual backend URL

export const fetchSalesData = async (period) => {
    try {
        return await axios.get(`${API_BASE_URL}/orders/sales-data?period=${period}`);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw error;
    }
};

export const fetchNewCustomersData = async (period) => {
    try {
        return await axios.get(`${API_BASE_URL}/customers/new-customers?period=${period}`);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw error;
    }
};

export const fetchRepeatCustomersData = async (period) => {
    try {
        return await axios.get(`${API_BASE_URL}/orders/repeat-customers?period=${period}`);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw error;
    }
};

export const fetchTotalRevenue = async () => {
    try {
        return await axios.get(`${API_BASE_URL}/orders/revenue`);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw error;
    }
};

export const fetchTotalCustomer = async () => {
    try {
        return await axios.get(`${API_BASE_URL}/customers/total-customers`);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw error;
    }
};

export const fetchGeoDistribution = async () => {
    return await axios.get(`${API_BASE_URL}/customers/geographical-distribution`);
};












export const fetchSalesGrowthRate = async () => {
    return await axios.get(`${API_BASE_URL}/sales-growth-rate`);
};

export const fetchNewCustomers = async () => {
    return await axios.get(`${API_BASE_URL}/new-customers`);
};

export const fetchRepeatCustomers = async (interval) => {
    return await axios.get(`${API_BASE_URL}/repeat-customers?interval=${interval}`);
};


export const fetchLifetimeValue = async () => {
    return await axios.get(`${API_BASE_URL}/lifetime-value`);
};
