'use strict';

const PORT = process.env.PORT || 8080;

const USD_TO_EUR = [
    {"value": 0.90},
    {"value": 0.91},
    {"value": 0.92},
    {"value": 0.93},
    {"value": 0.92},
    {"value": 0.91},
    {"value": 0.95},
];

const EUR_TO_USD = [
    {"value": 1.11},
    {"value": 1.1},
    {"value": 1.09},
    {"value": 1.08},
    {"value": 1.09},
    {"value": 1.1},
    {"value": 1.05},
];

module.exports = {
    PORT : PORT,
    EUR_TO_USD: EUR_TO_USD,
    USD_TO_EUR: USD_TO_EUR,
};
