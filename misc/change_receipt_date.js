const fs = require('fs');

let receipts = JSON.parse(fs.readFileSync('receipts.json', 'utf8'));

receipts.forEach(receipt => {
    if(receipt.date === "01/08/2022") {receipt.date = "20/02/2023"}
    else if(receipt.date === "25/02/2023") {receipt.date = "25/02/2023"}
    else if(receipt.date === "25/01/2022") {receipt.date = "15/02/2023"}
    else {console.log(receipt.date)}
});

//also change person on receipt
receipts.forEach(receipt => {receipt._id = {"$oid":"63ff3abb7a74defef8cf5afe"}});

console.log(receipts.map(receipt => receipt.date));

fs.writeFileSync('receipts_updated.json', JSON.stringify(receipts));