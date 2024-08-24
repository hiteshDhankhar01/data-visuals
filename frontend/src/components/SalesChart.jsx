import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { fetchSalesData } from '../services/api';
import 'tailwindcss/tailwind.css';
import GraphLoader from './GraphLoader';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const SalesChart = ({ period }) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSalesData = async () => {
            try {
                setLoading(true);
                const response = await fetchSalesData(period);
                const data = response.data;

                setChartData({
                    labels: data.map(item => item.name), // X-axis labels
                    datasets: [
                        {
                            label: 'Sales',
                            data: data.map(item => item.sales), 
                            borderColor: '#4A90E2', 
                            backgroundColor: 'rgba(74, 144, 226, 0.2)',
                            borderWidth: 2,
                            tension: 0.3, 
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching sales data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSalesData();
    }, [period]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: '',
                labels: {
                    color: '#333', 
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                backgroundColor: '#333', 
                titleColor: '#fff', 
                bodyColor: '#fff', 
                callbacks: {
                    label: (tooltipItem) => {
                        return `Sales: ₹${tooltipItem.raw.toLocaleString()}`; 
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#555', 
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#e5e7eb', 
                },
                ticks: {
                    color: '#555', 
                },
            },
        },
    };

    return (
        <div className="w-full amax-w-lg mx-auto p-2  shadow-md rounded-lg relative">
            {loading ? (
                <GraphLoader/>
            ) : (
                <div className="h-60 w-auto"> 
                    <Line data={chartData} options={options} />
                </div>
            )}
        </div>
    );
};

export default SalesChart;