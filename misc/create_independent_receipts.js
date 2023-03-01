const fs = require('fs');

let receipts = JSON.parse(fs.readFileSync('receipts_updated.json', 'utf8'));

let dates = receipts.map(receipt => receipt.date);
dates = [...new Set(dates)];

dates.forEach((element,i) => {
    console.log(element);
    console.log(typeof element)
    singleReceipt = receipts.filter(receipt => receipt.date === element);
    fs.writeFileSync('receipts'+i+'.json', JSON.stringify(singleReceipt));
});
