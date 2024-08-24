const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    email: String,
    closed_at: Date,
    created_at: Date,
    updated_at: Date,
    number: Number,
    note: String,
    token: String,
    gateway: String,
    test: Boolean,
    total_price: String,
    subtotal_price: String,
    total_weight: Number,
    total_tax: String,
    taxes_included: Boolean,
    currency: String,
    financial_status: String,
    confirmed: Boolean,
    total_discounts: String,
    buyer_accepts_marketing: Boolean,
    name: String,
    referring_site: String,
    landing_site: String,
    cancelled_at: Date,
    cancel_reason: String,
    reference: String,
    user_id: String,
    location_id: String,
    source_identifier: String,
    source_url: String,
    device_id: String,
    phone: String,
    customer_locale: String,
    app_id: Number,
    browser_ip: String,
    landing_site_ref: String,
    order_number: String,
    discount_applications: [Object],
    discount_codes: [Object],
    note_attributes: [Object],
    payment_gateway_names: [String],
    processing_method: String,
    source_name: String,
    fulfillment_status: String,
    tax_lines: [Object],
    tags: String,
    contact_email: String,
    order_status_url: String,
    presentment_currency: String,
    total_line_items_price_set: {
        shop_money: {
            amount: Number,
            currency_code: String,
        },
        presentment_money: {
            amount: Number,
            currency_code: String,
        }
    },
    total_discounts_set: {
        shop_money: {
            amount: Number,
            currency_code: String,
        },
        presentment_money: {
            amount: Number,
            currency_code: String,
        }
    },
    total_shipping_price_set: {
        shop_money: {
            amount: Number,
            currency_code: String,
        },
        presentment_money: {
            amount: Number,
            currency_code: String,
        }
    },
    subtotal_price_set: {
        shop_money: {
            amount: Number,
            currency_code: String,
        },
        presentment_money: {
            amount: Number,
            currency_code: String,
        }
    },
    total_price_set: {
        shop_money: {
            amount: Number,
            currency_code: String,
        },
        presentment_money: {
            amount: Number,
            currency_code: String,
        }
    },
    total_tax_set: {
        shop_money: {
            amount: Number,
            currency_code: String,
        },
        presentment_money: {
            amount: Number,
            currency_code: String,
        }
    },
    line_items: [Object],
    shipping_lines: [Object],
    billing_address: Object,
    shipping_address: Object,
    fulfillments: [Object],
    client_details: Object,
    refunds: [Object],
    customer: {
        total_line_items_price: String
    }
});

module.exports = mongoose.model('shopifyOrders', OrderSchema, 'shopifyOrders');
