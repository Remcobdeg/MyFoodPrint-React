fs = require('fs');

let data = fs.readFileSync('debug1677505814016.json', 'utf8');
data = JSON.parse(data);
data = data.ExpenseDocuments[0];

console.log(data.LineItemGroups[0].LineItems);
// console.log(JSON.stringify(data, null, 2));