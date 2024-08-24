import React, { useEffect, useState } from 'react';
import { IndianRupee, ShoppingBag, UserRound } from 'lucide-react';
import SalesChart from '../components/SalesChart';
import { fetchTotalCustomer, fetchTotalRevenue } from '../services/api';
import CountUp from 'react-countup';
import Select from 'react-select';

const options = [
    { value: 'daily', label: 'Daily' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
];

const Dashboard = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [selectedOption, setSelectedOption] = useState(options[0]); // Set 'Daily' as default

    useEffect(() => {
        const getTotalRevenue = async () => {
            try {
                const response = await fetchTotalRevenue();
                const revenue = Math.floor(response.data.totalRevenue);
                setTotalOrders(response.data.totalOrders);
                setTotalRevenue(revenue);
            } catch (err) {
                console.error(err);
            }
        };
        const getTotalCustomer = async () => {
            try {
                const response = await fetchTotalCustomer();
                setTotalCustomer(response.data.totalCustomer);
            } catch (err) {
                console.error(err);
            }
        };

        getTotalRevenue();
        getTotalCustomer();
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <p className="text-4xl font-bold mb-8">Dashboard</p>
            <div className="bg-gray-700 h-px my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                    <header className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Total Revenue</h3>
                        <IndianRupee className="text-2xl" />
                    </header>
                    <div>
                        <p className="text-3xl font-bold">
                            ₹ <CountUp end={totalRevenue} duration={3} />
                        </p>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                    <header className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Total Orders</h3>
                        <ShoppingBag className="text-2xl" />
                    </header>
                    <div>
                        <p className="text-3xl font-bold">
                            <CountUp end={totalOrders} duration={3} />
                        </p>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                    <header className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Total Customers</h3>
                        <UserRound className="text-2xl" />
                    </header>
                    <div>
                        <p className="text-3xl font-bold">
                            <CountUp end={totalCustomer} duration={3} />
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-10 bg-gray-800 rounded-lg shadow-lg p-6">
                <header className="mb-4 flex justify-between">
                    <h3 className="text-xl font-semibold">Sales Chart (₹)</h3>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: '#2d3748', // gray-800
                            }),
                            menu: (provided) => ({
                                ...provided,
                                backgroundColor: '#2d3748', // gray-800
                            }),
                            option: (provided) => ({
                                ...provided,
                                backgroundColor: '#2d3748', // gray-800
                                color: 'white',
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: 'white',
                            }),
                        }}
                    />
                </header>
                <div>
                    <SalesChart period={selectedOption.value} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;