var format = require('date-format');
import db from '../../mongodb'
let userSchema = db.Schema({
    parent: {
        type: String,
        default: null,
    },
    code: {
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
    createTime: {
        type: String,
        default: () => {
            let _date = new Date()
            return format('yyyy-MM-dd hh:mm:ss', _date)
        }
    },
})
export default db.model('dictionary', userSchema);