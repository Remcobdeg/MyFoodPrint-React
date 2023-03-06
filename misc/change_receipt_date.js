const fs = require('fs');

let receipts = JSON.parse(fs.readFileSync('receipts_UXtest_processed_all3.json', 'utf8'));

receipts.forEach(receipt => {
    if(receipt.date === "2022-08-01") {receipt.date = "20-02-2023"}
    else if(receipt.date === "2023-02-25") {receipt.date = "25-02-2023"}
    else if(receipt.date === "2022-01-25") {receipt.date = "15-02-2023"}
});

//also change person on receipt
receipts.forEach(receipt => {receipt.user = {"$oid":"63ff3abb7a74defef8cf5afe"}});

console.log(receipts.map(receipt => receipt.date));

fs.writeFileSync('receipts_updated.json', JSON.stringify(receipts));