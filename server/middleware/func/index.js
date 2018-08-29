import * as db_func from './db'
import * as util_func from './util'

export default () => {
    const func = Object.assign({}, util_func, db_func)
    return async (ctx, next) => {
        for (let v in func) {
            if (func.hasOwnProperty(v)) ctx[v] = func[v];
        }
        await next()
    }
}