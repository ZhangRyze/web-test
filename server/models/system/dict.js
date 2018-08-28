var format = require('date-format');
import db from '../../mongodb'
let userSchema = db.Schema({
    code: {
        type: String,
        required: true
    },
    codeName:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sort_no: {
        type: Number,
        required: true
    },
    remark: String,
    createTime: {
        type: String,
        default: () => {
            let _date = new Date()
            return format('yyyy-MM-dd hh:mm:ss', _date)
        }
    },
})
export default db.model('dictionary', userSchema);