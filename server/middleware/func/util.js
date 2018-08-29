export const get_client_ip = ctx => {
    return ctx.request.headers['x-forwarded-for'] ||
        (ctx.request.connection && ctx.request.connection.remoteAddress) ||
        ctx.request.socket.remoteAddress ||
        (ctx.request.connection.socket && ctx.request.connection.socket.remoteAddress) || null
}

export const convertTree = (rows, pKey = 'pId', cKey = 'id') => {
    function exists(rows, parentId) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i][cKey] == parentId) return true;
        }
        return false;
    }
    var nodes = [];
    // get the top level nodes
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!exists(rows, row[pKey])) {
            nodes.push(row);
        }
    }
    var toDo = [];
    for (var i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i]);
    }
    while (toDo.length) {
        var node = toDo.shift(); // the parent node
        // get the children nodes
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row[pKey] == node[cKey]) {
                var child = row;
                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    return nodes;
}