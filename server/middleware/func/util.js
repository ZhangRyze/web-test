export const get_client_ip = ctx => {
    return ctx.request.headers['x-forwarded-for'] ||
        (ctx.request.connection && ctx.request.connection.remoteAddress) ||
        ctx.request.socket.remoteAddress ||
        (ctx.request.connection.socket && ctx.request.connection.socket.remoteAddress) || null
}

export const convertTree = (list, p = 'pId', c = 'id') => {
    list = Object.assign([], list)
    let rows = JSON.parse(JSON.stringify(list))
    
    function exists(rows, parentId) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][c] == parentId) return true;
        }
        return false;
    }
    let nodes = [];

    // get the top level nodes
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (!exists(rows, row[p])) {
            row.chooseIds = row[c];
            nodes.push(row);
        }
    }
    let toDo = Object.assign([], nodes);
    
    while (toDo.length) {
        let node = toDo.shift(); // the parent node
        // get the children nodes
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (row[p] == node[c]) {
                row.chooseIds = node.chooseIds ? (node.chooseIds + ',' + row[c] ) : row[c] 
                if (node.children) {
                    node.children.push(row);
                } else {
                    node.children = [row];
                }
                toDo.push(row);
            }
        }
    }
    return nodes;
}