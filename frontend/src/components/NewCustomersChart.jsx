// SalesGrowthRateChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import GraphLoader from './GraphLoader';
import { fetchNewCustomersData } from '../services/api';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const NewCustomersChart = ({ period }) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSalesData = async () => {
            try {
                setLoading(true);
                const responce = await fetchNewCustomersData(period);
                const data = responce.data

                // Prepare data for Chart.js
                const chartData = {
                    labels: data.map(item => item.name),
                    datasets: [
                        {
                            label: 'New Customers',
                            data: data.map(item => item.newCustomers),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error("Error loading sales data:", error);
                setLoading(false);
            }
        };

        loadSalesData();
    }, [period]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Quarter'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of New Customers'
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            {loading ? <GraphLoader /> : <Bar data={chartData} options={options} />}
        </div>
    );
};

export default NewCustomersChart;