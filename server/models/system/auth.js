var format = require('date-format');
import db from '../../mongodb'
let authSchema = db.Schema({
    parent: {
        type: String,
        default: null
    },
    parentIds:{
        type: String,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    auth: {
        type: String,
        required: true
    },
    authIcon: String,
    sort_no: {
        type: Number,
        required: true
    },
    state:{
        type: Number,
        default: 1
    },
    symbol: String,
    remark: String,
    createTime: {
        type: String,
        default: () => {
            let _date = new Date()
            return format('yyyy-MM-dd hh:mm:ss', _date)
        }
    },
})
export default db.model('auth', authSchema);