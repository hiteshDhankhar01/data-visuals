import React from 'react';
import SalesChart from '../components/SalesChart';
import RepeatCustomerLineChart from '../components/RepeatCustomerLineChart';

const Sales = () => {
    return (
        <div className="min-h-screen p-6">
            <h2 className="text-3xl font-bold mb-8">Sales Dashboard</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg xl:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Daily Sales</h3>
                    <SalesChart period="daily" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Monthly Sales</h3>
                    <SalesChart period="monthly" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Yearly Sales</h3>
                    <SalesChart period="yearly" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Quarterly Sales</h3>
                    <SalesChart period="quarterly" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg xl:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Yearly Sales</h3>
                    <RepeatCustomerLineChart period="yearly" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Monthly Sales</h3>
                    <RepeatCustomerLineChart period="monthly" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Daily Sales</h3>
                    < RepeatCustomerLineChart period="daily" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Quarterly Sales</h3>
                    <RepeatCustomerLineChart period="quarterly" />
                </div>
            </div>
        </div>
    );
}

export default Sales;