import { Message } from 'element-ui'
const ToolsClass = {
    convertTree: (rows, pKey = 'pId', cKey = 'id') => {
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
    },
    showMessage: (message, type = 'success', duration = 1500) => {
        Message({
            dangerouslyUseHTMLString: true,
            showClose: true,
            message: message,
            duration: duration,
            type: type
        });
    }
}
export default ToolsClass