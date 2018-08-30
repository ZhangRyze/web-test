var format = require('date-format');
import db from '../../mongodb'
let roleSchema = db.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    auths: [{
        type: db.Schema.Types.ObjectId,
        ref: 'auth'
    }],
    createTime: {
        type: String,
        default: () => {
            let _date = new Date()
            return format('yyyy-MM-dd hh:mm:ss', _date)
        }
    },
})
export default db.model('role', roleSchema);