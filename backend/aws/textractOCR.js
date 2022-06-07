const moment = require('moment');

var resultOCR = {};
var items = [];

function createResult(objList) {
    filterObj(objList.SummaryFields, "VENDOR_NAME");
    getResult(objList.LineItemGroups[0]);
    add(resultOCR, "ITEMS", items);
    return resultOCR;
}

function getResult(objList) {
    var count = 0;
    return objList.LineItems.filter(function (obj) {
        count++;
        var itemSingleArr = [];
        obj.LineItemExpenseFields.filter(function (item) {
            var itemSingle = {};
            if (item.Type.Text == "ITEM") {
                add(itemSingle, "NAME", item.ValueDetection.Text)
                add(itemSingle, "CONFIDENCE", item.ValueDetection.Confidence)
                itemSingleArr.push(itemSingle);
            }
            else if (item.Type.Text == "QUANTITY") {
                add(itemSingle, "QUANTITY", item.ValueDetection.Text)
                add(itemSingle, "CONFIDENCE", item.ValueDetection.Confidence)
                itemSingleArr.push(itemSingle);
            }
            else if (item.Type.Text == "PRICE") {
                add(itemSingle, "PRICE", item.ValueDetection.Text)
                add(itemSingle, "CONFIDENCE", item.ValueDetection.Confidence)
                itemSingleArr.push(itemSingle);
            }
        });
        var itemExpense = {};
        add(itemExpense, "ITEM" + count, itemSingleArr);
        items.push(itemExpense);
    });
}

async function getDate(objList) {
    let value = "NA", time = "";
    await objList.Blocks.filter(function (obj) {
        if (obj.BlockType == "LINE") {
            let words = [];
            words = obj.Text.split(" ");
            for (let word of words) {
                const regex = /([0-9]{2}\w\w\w[0-9]{4})/g;
                if(word.match(regex)) {
                    word = (word.slice(0, 2)+' '+word.slice(2, 5).replace('0', 'O')+' '+word.slice(5, 9));
                }
                if (isGoodDate(word)) {
                    value = word;
                }
                if (isGoodTime(word)) {
                    time = word;
                }
            }
        }
    });
    if (time === "")
        return value;
    else
        return value + " && " + time;
}

function filterObj(objList, filterName) {
    return objList.filter(function (item) {
        if (item.Type.Text == filterName)
            add(resultOCR, item.Type.Text, item.ValueDetection.Text)
    });
}

function add(itemList, key, value) {
    itemList[key] = value;
}

function isGoodDate(dt) {
    var allowedDateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'MM-DD-YYYY',
        'DD-MM-YYYY', 'YYYY-MM-DD', 'YYYY-DD-MM',
        'MM/DD/YY', 'DD/MM/YY', 'YY/MM/DD', 'MM-DD-YY', 'DD-MM-YY', 'YY-MM-DD', 'YY-DD-MM',
        'D/MM/YYYY', 'D/M/YYYY', 'DD.MM.YYYY', 'D.M.YYYY',
        'MMM-DD-YY', 'DD-MMM-YY', 'YY-MMM-DD', 'YY-DD-MMM',
        'MMM/DD/YYYY', 'DD/MMM/YYYY', 'YYYY/MMM/DD', 'MMM-DD-YYYY', 'DD-MMM-YYYY', 'YYYY-MMM-DD', 'YYYY-DD-MMM',
        'MMMM Do, YYYY', 'MMMM D, YYYY', 'D MMM YYYY', 'DD MMM YYYY',
        'DDMMMYYYY'];

    return moment(dt.trim(), allowedDateFormats, true).isValid();
}

function isGoodTime(dt) {
    var allowedTimeFormats = ['HH:mm', 'hh:mm a', 'HH:mm:ss', 'hh:mm:ss a'];
    return moment(dt.trim(), allowedTimeFormats, true).isValid();
}

module.exports = { createResult, getDate };