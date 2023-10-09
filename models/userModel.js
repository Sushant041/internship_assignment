const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
        user_id: {type: String},
        user_name: {type: String},
        back_accounts: [
            {type: String}
        ],
        name: {type: String},
        accounts: {
            bank: {type: String, default: "HDFC BANK"},
            branch: {type: String, default: "THE AGS EMPLOYEES' CO-OP BANK LTD"},
            address: {type: String, default: "PARK HOUSE ROAD, BANGALORE 560001"},
            city: {type: String, default: "BANGALORE"},
            district: {type: String, default: "BANGALORE URBAN"},
            state:{type: String, default: "KARNATAKA"},
            bank_code: {type: String, default: "HDFC"},
            weather: {
                temp: {type: String, default: "25.5"},
                humidity: {type: String, default: "50"}
            }
        }
    }
)

const User = mongoose.model("user", userSchema);

module.exports = User;