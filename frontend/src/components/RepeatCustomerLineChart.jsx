import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchRepeatCustomersData } from '../services/api'; 
import 'tailwindcss/tailwind.css';
import GraphLoader from './GraphLoader';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RepeatCustomerBarChart = ({ period }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchRepeatCustomersData(period);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [period]);

    if (loading) return <GraphLoader />;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    const chartData = {
        labels: data.map(item => item._id.year),
        datasets: [{
            label: 'Repeat Customers',
            data: data.map(item => item.purchaseCount),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Repeat Customers Over Time',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Repeat Customers',
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default RepeatCustomerBarChart;