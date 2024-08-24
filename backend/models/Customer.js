const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    created_at: Date,
    updated_at: Date,
    currency: String,
    default_address: {
        email: String,
        phone: String,
        state: String,
        // Add other relevant fields from the default_address object
    },
    last_order_id: mongoose.Schema.Types.Mixed, // Or you can use a specific type if known
    last_order_name: String,
    orders_count: Number,
    total_spent: String, // Change to Number if you plan to perform arithmetic operations
    state: String,
    tags: String,
    tax_exempt: Boolean,
    verified_email: Boolean,
    email_marketing_consent: mongoose.Schema.Types.Mixed, // Adjust type if known
    sms_marketing_consent: mongoose.Schema.Types.Mixed, // Adjust type if known
    multipass_identifier: String,
    note: String,
    admin_graphql_api_id: String,
    tax_exemptions: [mongoose.Schema.Types.Mixed], // Array of objects or specify type
});

module.exports = mongoose.model('shopifyCustomers', CustomerSchema, 'shopifyCustomers');