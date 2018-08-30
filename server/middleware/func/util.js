export const get_client_ip = ctx => {
    return ctx.request.headers['x-forwarded-for'] ||
        (ctx.request.connection && ctx.request.connection.remoteAddress) ||
        ctx.request.socket.remoteAddress ||
        (ctx.request.connection.socket && ctx.request.connection.socket.remoteAddress) || null
}

export const convertTree = (list, pKey = 'pId', cKey = 'id') => {
    list = Object.assign([], list)
    let rows = JSON.parse(JSON.stringify(list))
    
    function exists(rows, parentId) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][cKey] == parentId) return true;
        }
        return false;
    }
    let nodes = [];

    // get the top level nodes
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (!exists(rows, row[pKey])) {
            nodes.push(row);
        }
    }
    let toDo = Object.assign([], nodes);
    
    while (toDo.length) {
        let node = toDo.shift(); // the parent node
        // get the children nodes
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (row[pKey] == node[cKey]) {
                let child = row;
                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    console.log(nodes);
    
    return nodes;
}