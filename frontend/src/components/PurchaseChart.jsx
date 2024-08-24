import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchRepeatCustomersData } from '../services/api';
import GraphLoader from './GraphLoader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PurchaseChart = ({ period }) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchRepeatCustomersData(period);
                const data = response.data;

                let periodPurchaseData = {};

                if (period === 'yearly') {
                    periodPurchaseData = data.reduce((acc, item) => {
                        const year = item._id.year;
                        acc[year] = (acc[year] || 0) + item.purchaseCount;
                        return acc;
                    }, {});
                } else if (period === 'monthly') {
                    periodPurchaseData = data.reduce((acc, item) => {
                        const month = `${item._id.year}-${item._id.month}`;
                        acc[month] = (acc[month] || 0) + item.purchaseCount;
                        return acc;
                    }, {});
                } else if (period === 'daily') {
                    periodPurchaseData = data.reduce((acc, item) => {
                        const day = `${item._id.year}-${item._id.month}-${item._id.day}`;
                        acc[day] = (acc[day] || 0) + item.purchaseCount;
                        return acc;
                    }, {});
                } else if (period === 'quarterly') {
                    periodPurchaseData = data.reduce((acc, item) => {
                        const quarter = `Q${item._id.quarter} ${item._id.year}`;
                        acc[quarter] = (acc[quarter] || 0) + item.purchaseCount;
                        return acc;
                    }, {});
                }

                const chartData = {
                    labels: Object.keys(periodPurchaseData),
                    datasets: [
                        {
                            label: `Purchase Count (${period})`,
                            data: Object.values(periodPurchaseData),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                setChartData(chartData);
            } catch (error) {
                console.error("Error fetching repeat customer data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [period]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Purchases by ${period.charAt(0).toUpperCase() + period.slice(1)}`,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: period.charAt(0).toUpperCase() + period.slice(1),
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Purchase Count',
                },
            },
        },
    };

    return (
        <div className="max-w-lg mx-auto p-4 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Purchase Count by {period.charAt(0).toUpperCase() + period.slice(1)}</h2>
            {loading ? (
                <GraphLoader />
            ) : (
                <Bar data={chartData} options={options} />
            )}
        </div>
    );
};

export default PurchaseChart;