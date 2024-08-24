const Customer = require('../models/customer');


exports.getAllCustomer  = async(req,res) =>{
try {
    const customer = await Customer.find().limit(10)
    res.json({customer})
} catch (error) {
    console.log(error)
}
}

exports.getTotalCustomer  = async(req,res) =>{
try {
    const customer = await Customer.find()
    const totalCustomer = customer.length;
    res.json({totalCustomer:totalCustomer})
} catch (error) {
    console.log(error)
}
}

exports.getNewCustomersOverTime = async (req, res) => {
    try {
        const { period } = req.query; // 'daily', 'monthly', 'quarterly', 'yearly'
        
        // Fetch all customers
        const customers = await Customer.find();
        
        let newCustomersData = {};
        
        if (period === 'daily') {
            // Calculate new customers per day
            newCustomersData = customers.reduce((acc, customer) => {
                const dayIndex = new Date(customer.created_at).getDate();
                acc[dayIndex] = (acc[dayIndex] || 0) + 1;
                return acc;
            }, {});
            
            // Prepare graph data for each day of the month
            newCustomersData = Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                return { name: `Day ${day}`, newCustomers: newCustomersData[day] || 0 };
            });

        } else if (period === 'monthly') {
            // Calculate new customers per month
            newCustomersData = customers.reduce((acc, customer) => {
                const monthIndex = new Date(customer.created_at).getMonth();
                acc[monthIndex] = (acc[monthIndex] || 0) + 1;
                return acc;
            }, {});
            
            // Prepare graph data for each month of the year
            newCustomersData = Array.from({ length: 12 }, (_, i) => {
                const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i));
                return { name: month, newCustomers: newCustomersData[i] || 0 };
            });

        } else if (period === 'quarterly') {
            newCustomersData = customers.reduce((acc, customer) => {
                const date = new Date(customer.created_at);
                const year = date.getFullYear();
                const quarter = Math.floor(date.getMonth() / 3) + 1;
                const key = `${year}-Q${quarter}`;
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});
            
            // Prepare graph data for each quarter of the year
            newCustomersData = Object.keys(newCustomersData).map(key => {
                return { name: key, newCustomers: newCustomersData[key] || 0 };
            });
            
            // Sort the data by year and quarter
            newCustomersData.sort((a, b) => {
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
            // Calculate new customers per year
            newCustomersData = customers.reduce((acc, customer) => {
                const year = new Date(customer.created_at).getFullYear();
                acc[year] = (acc[year] || 0) + 1;
                return acc;
            }, {});
            
            // Prepare graph data for each year
            newCustomersData = Object.keys(newCustomersData).map(year => {
                return { name: year, newCustomers: newCustomersData[year] || 0 };
            });

        } else {
            return res.status(400).json({ error: "Invalid period specified. Choose from 'daily', 'monthly', 'quarterly', or 'yearly'." });
        }

        // Send response
        res.json(newCustomersData);
    } catch (error) {
        console.error("Error in getNewCustomersData:", error);
        res.status(500).json({ error: error.message });
    }
};

const getTimeFrameKey = (date, period) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, pad with zero
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with zero
    const quarter = Math.floor(date.getMonth() / 3) + 1;

    switch (period) {
        case 'daily':
            return `${year}-${month}-${day}`;
        case 'monthly':
            return `${year}-${month}`;
        case 'quarterly':
            return `${year}-Q${quarter}`;
        case 'yearly':
            return `${year}`;
        default:
            throw new Error('Invalid period specified');
    }
};

// Route to get repeat customer data
exports.getRepeatCustomers = async (req, res) => {

    const { period } = req.query; // 'daily', 'monthly', 'quarterly', 'yearly'

    try {
        const customers = await Customer.find({}).lean();
        const repeatCustomersData = {};

        // Identify repeat customers
        const repeatCustomers = customers.reduce((acc, customer) => {
            const purchases = customer.orders_count || 0;
            if (purchases > 1) {
                const date = new Date(customer.created_at);
                const key = getTimeFrameKey(date, period);

                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(customer);
            }
            return acc;
        }, {});

        // Aggregate data by time frame
        for (const [key, customers] of Object.entries(repeatCustomers)) {
            repeatCustomersData[key] = customers.length;
        }

        res.json(repeatCustomersData);
    } catch (err) {
        console.error('Error fetching repeat customers:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getGeographicalDistribution = async (req, res) => {
    try {
        const distribution = await Customer.aggregate([
            { $group: { _id: '$default_address.city', count: { $sum: 1 } } }
        ]);

        res.json(distribution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCustomerLifetimeValueByCohorts = async (req, res) => {
    try {
        const cohorts = await Customer.aggregate([
            { $group: {
                _id: {
                    year: { $year: '$created_at' },
                    month: { $month: '$created_at' }
                },
                total_spent: { $sum: { $toDouble: '$total_spent' } } // Ensure total_spent is numeric
            } },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);
        res.json(cohorts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
