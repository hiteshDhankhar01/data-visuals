const shopifyOrders = require('../models/order');

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await shopifyOrders.find().limit(10);
        res.json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: error.message });
    }
};


// Get orders by date range
exports.getOrdersByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const orders = await shopifyOrders.find({
            created_at: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get orders by customer email
exports.getOrdersByCustomerEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const orders = await shopifyOrders.find({ email });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get total sales for a given period

exports.getTotalSales = async (req, res) => {
    try {
        await connectToDB(); // Ensure the database connection

        let { period } = req.query; // 'daily', 'monthly', 'yearly'
        let match = {};

        if (period === 'daily') {
            match['created_at'] = {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lt: new Date(new Date().setHours(24, 0, 0, 0)),
            };
        } else if (period === 'monthly') {
            const start = new Date();
            start.setDate(1);
            match['created_at'] = {
                $gte: start,
                $lt: new Date(start.setMonth(start.getMonth() + 1)),
            };
        } else if (period === 'yearly') {
            const start = new Date();
            start.setMonth(0, 1);
            match['created_at'] = {
                $gte: start,
                $lt: new Date(start.setFullYear(start.getFullYear() + 1)),
            };
        }

        const sales = await Order.aggregate([
            { $match: match },
            { $group: { _id: null, totalSales: { $sum: { $toDouble: '$total_price' } } } },
        ]);

        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTotalSales = async (req, res) => {
    try {
        ; // Ensure the database connection
        const orders = await shopifyOrders.find()
        // let { period } = req.query; // 'daily', 'monthly', 'yearly'
        let period = "monthly"
        let match = {};

        if (period === 'daily') {
            match['created_at'] = {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lt: new Date(new Date().setHours(24, 0, 0, 0)),
            };
        } else if (period === 'monthly') {
            const start = new Date();
            start.setDate(1);
            match['created_at'] = {
                $gte: start,
                $lt: new Date(start.setMonth(start.getMonth() + 1)),
            };
        } else if (period === 'yearly') {
            const start = new Date();
            start.setMonth(0, 1);
            match['created_at'] = {
                $gte: start,
                $lt: new Date(start.setFullYear(start.getFullYear() + 1)),
            };
        }

        const sales = await Order.aggregate([
            { $match: match },
            { $group: { _id: null, totalSales: { $sum: { $toDouble: '$total_price' } } } },
        ]);

        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSalesData = async (req, res) => {
    try {
        const { period } = req.query; // 'daily', 'monthly', 'yearly'

        // Fetch all orders
        const orders = await shopifyOrders.find();

        let salesData = {};

        if (period === 'daily') {
            // Calculate sales per day
            salesData = orders.reduce((acc, order) => {
                const dayIndex = new Date(order.created_at).getDate();
                acc[dayIndex] = (acc[dayIndex] || 0) + parseFloat(order.total_price);
                return acc;
            }, {});

            // Prepare graph data for each day of the month
            salesData = Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                return { name: `Day ${day}`, sales: salesData[day] || 0 };
            });

        } else if (period === 'monthly') {
            // Calculate sales per month
            salesData = orders.reduce((acc, order) => {
                const monthIndex = new Date(order.created_at).getMonth();
                acc[monthIndex] = (acc[monthIndex] || 0) + parseFloat(order.total_price);
                return acc;
            }, {});

            // Prepare graph data for each month of the year
            salesData = Array.from({ length: 12 }, (_, i) => {
                const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i));
                return { name: month, sales: salesData[i] || 0 };
            });

        } else if (period === 'quarterly') {
             // Calculate sales per quarter
             salesData = orders.reduce((acc, order) => {
                const date = new Date(order.created_at);
                const year = date.getFullYear();
                const quarter = Math.floor(date.getMonth() / 3) + 1;
                const key = `${year}-Q${quarter}`;
                acc[key] = (acc[key] || 0) + parseFloat(order.total_price);
                return acc;
            }, {});

            // Prepare graph data for each quarter of the year
            salesData = Object.keys(salesData).map(key => {
                return { name: key, sales: salesData[key] || 0 };
            });

            // Sort the sales data by year and quarter
            salesData.sort((a, b) => {
                const [yearA, quarterA] = a.name.split('-Q');
                const [yearB, quarterB] = b.name.split('-Q');
                
                // Convert quarter to integer for comparison
                const qA = parseInt(quarterA);
                const qB = parseInt(quarterB);
                
                // Compare years first
                if (yearA !== yearB) return yearA - yearB;
                
                // If years are the same, compare quarters
                return qA - qB;
            });

        } else if (period === 'yearly') {
            // Calculate sales per year
            salesData = orders.reduce((acc, order) => {
                const year = new Date(order.created_at).getFullYear();
                acc[year] = (acc[year] || 0) + parseFloat(order.total_price);
                return acc;
            }, {});

            // Prepare graph data for each year
            salesData = Object.keys(salesData).map(year => {
                return { name: year, sales: salesData[year] || 0 };
            });

        } else {
            return res.status(400).json({ error: "Invalid period specified. Choose from 'daily', 'monthly', or 'yearly'." });
        }

        res.json(salesData);
    } catch (error) {
        console.error("Error in getSalesData:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getTotalRevenue = async (req, res) => {
    try {
        // Fetch all orders and sum the total_price
        const orders = await shopifyOrders.find({});
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((total, order) => {
            const amount = parseFloat(order.total_price_set.shop_money.amount) || 0;
            return total + amount;
        }, 0);

        res.json({ totalRevenue: totalRevenue, totalOrders: totalOrders });
    } catch (err) {
        console.error('Error calculating total revenue:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCustomerRepeatPurchases = async (req, res) => {
    try {
        const { period } = req.query; // 'daily', 'monthly', 'quarterly', 'yearly'

        // Fetch all orders
        const orders = await shopifyOrders.find();

        let repeatCustomers = [];

        if (period === 'daily') {
            repeatCustomers = await shopifyOrders.aggregate([
                {
                    $addFields: {
                        created_at_date: { $toDate: "$created_at" }
                    }
                },
                {
                    $group: {
                        _id: {
                            email: '$email',
                            day: { $dayOfYear: '$created_at_date' },
                            year: { $year: '$created_at_date' },
                        },
                        purchaseCount: { $sum: 1 },
                    }
                },
                {
                    $match: {
                        purchaseCount: { $gt: 1 }
                    }
                }
            ]);

        } else if (period === 'monthly') {
            repeatCustomers = await shopifyOrders.aggregate([
                {
                    $addFields: {
                        created_at_date: { $toDate: "$created_at" }
                    }
                },
                {
                    $group: {
                        _id: {
                            email: '$email',
                            month: { $month: '$created_at_date' },
                            year: { $year: '$created_at_date' },
                        },
                        purchaseCount: { $sum: 1 },
                    }
                },
                {
                    $match: {
                        purchaseCount: { $gt: 1 }
                    }
                }
            ]);

        } else if (period === 'quarterly') {
            repeatCustomers = await shopifyOrders.aggregate([
                {
                    $addFields: {
                        created_at_date: { $toDate: "$created_at" }
                    }
                },
                {
                    $group: {
                        _id: {
                            email: '$email',
                            quarter: { $ceil: { $divide: [{ $month: '$created_at_date' }, 3] } },
                            year: { $year: '$created_at_date' },
                        },
                        purchaseCount: { $sum: 1 },
                    }
                },
                {
                    $match: {
                        purchaseCount: { $gt: 1 }
                    }
                }
            ]);

        } else if (period === 'yearly') {
            repeatCustomers = await shopifyOrders.aggregate([
                {
                    $addFields: {
                        created_at_date: { $toDate: "$created_at" }
                    }
                },
                {
                    $group: {
                        _id: {
                            email: '$email',
                            year: { $year: '$created_at_date' },
                        },
                        purchaseCount: { $sum: 1 },
                    }
                },
                {
                    $match: {
                        purchaseCount: { $gt: 1 }
                    }
                }
            ]);

        } else {
            return res.status(400).json({ error: "Invalid period specified. Choose from 'daily', 'monthly', 'quarterly', or 'yearly'." });
        }

        res.json(repeatCustomers);
    } catch (error) {
        console.error("Error in getCustomerRepeatPurchases:", error);
        res.status(500).json({ error: error.message });
    }
};
