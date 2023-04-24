const fs = require('fs');

let receipts = JSON.parse(fs.readFileSync('to_add_uid_receipts.json', 'utf8'));

receipts.forEach((receipt) => {
    receipt.user = 
    (
        new Date(receipt.date_recorded.$date) > new Date('2023-04-01')
    ) ? {
        "$oid": "644562dce03a186463df54fd"
      } : {
        "$oid": "63ff3abb7a74defef8cf5afe"
      },
      receipt.__v++;

});

console.log(receipts[receipts.length - 1]);
console.log("#receipts = "+receipts.length);

fs.writeFileSync('receipts_with_uid.json', JSON.stringify(receipts));


