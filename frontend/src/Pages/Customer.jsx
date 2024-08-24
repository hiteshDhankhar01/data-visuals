import React from 'react'
import NewCustomersChart from '../components/NewCustomersChart'
import GeographicalDistributionMap from '../components/GeographicalDistributionMap'
import RepeatCustomerLineChart from '../components/RepeatCustomerLineChart'

const Customer = () => {

    return (
        <div className="min-h-screen p-6">
            <h2 className="text-3xl font-bold mb-8 border-b border-gray-300 pb-2">Custmer</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg xl:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Daily New Customers</h3>
                    <NewCustomersChart period="daily" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Monthly New Customers</h3>
                    <NewCustomersChart period="monthly" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between">
                    <h3 className="text-xl font-semibold mb-4">Yearly New Customers</h3>
                    <NewCustomersChart period="yearly" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg xl:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Quarterly New Customers</h3>
                    <NewCustomersChart period="quarterly" />
                </div>
            </div>
            <div className='my-4'>
                <h2 className="text-3xl font-bold mb-8 border-b border-gray-300 pb-2">Customers on Map</h2>
                <GeographicalDistributionMap />
            </div>
            <h2 className="text-3xl font-bold mt-10 mb-8 border-b border-gray-300 pb-2"> Repeat Customers</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg xl:col-span-2 gap-4">
                    <h3 className="text-xl font-semibold mb-4">Yearly Repeat Customer</h3>
                    <RepeatCustomerLineChart period="yearly" />

                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Monthly Repeat Customer</h3>
                    <RepeatCustomerLineChart period="monthly" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">

                    <h3 className="text-xl font-semibold mb-4">Daily Repeat Customer</h3>
                    < RepeatCustomerLineChart period="daily" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Quarterly Repeat Customer</h3>
                    <RepeatCustomerLineChart period="quarterly" />
                </div>
            </div>
        </div>
    )
}

export default Customer
