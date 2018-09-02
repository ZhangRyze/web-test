var format = require('date-format');
import db from '../../mongodb'
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
    userType:{
        type: db.Schema.Types.ObjectId,
        ref: 'role'   
    },
    contact: Number,
    remark: String,
    state:{
        type: Number,
        default: 1
    },
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