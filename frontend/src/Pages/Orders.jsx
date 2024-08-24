import React from 'react'
import PurchaseChart from '../components/PurchaseChart'

const Orders = () => {
    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg xl:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Daily Orders</h3>
                    < PurchaseChart period="daily" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Monthly Orders</h3>
                    <PurchaseChart period="monthly" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Yearly Orders</h3>
                    <PurchaseChart period="yearly" />

                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Quarterly Orders</h3>
                    <PurchaseChart period="quarterly" />
                </div>
            </div>
        </div>
    )
}

export default Orders
