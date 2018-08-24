var format = require('date-format');
import db from '../mongodb'
let userSchema = db.Schema({
    loginName: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
    },
    contact: Number,
    remark: String,
    createTime: {
        type: String,
        default: () => {
            let _date = new Date()
            return format('yyyy-MM-dd hh:mm:ss', _date)
        }
    },
    loginTime: Date
})
export default db.model('user', userSchema);