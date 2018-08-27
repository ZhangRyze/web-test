var format = require('date-format');
import db from '../../mongodb'
let userSchema = db.Schema({
    name: {
        type: String,
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
export default db.model('auth', userSchema);