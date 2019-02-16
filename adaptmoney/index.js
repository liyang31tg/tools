/**
 *
 * @param {*} money
 * 将服务器存储的钱，比例1:10000
 * 在前段显示要显示到分1.00
 */
function AdaptMoney(money) {
  return (Number.parseInt(money / 100) / 100).toFixed(2);
}

function contains(arr, obj) {
  let i = arr.length;
  while (i--) {
    if (obj == arr[i]) {
      return true;
    }
  }
  return false;
}

function AdaptMoneyFromObj(obj, keyParams) {
  if (typeof obj == "object") {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] == "object") {
          AdaptMoneyFromObj(obj[i], keyParams);
        } else if (typeof obj[i] == "number") {
          obj[i] = AdaptMoney(obj[i]);
        }
      }
    } else {
      for (let k in obj) {
        if (contains(keyParams, k)) {
          let tmpObj = obj[k];
          if (typeof tmpObj == "object") {
            AdaptMoneyFromObj(tmpObj, keyParams);
          } else {
            obj[k] = AdaptMoney(tmpObj);
          }
        }
      }
    }
  }
}

//testing
let arr = [
  {
    key1: 100000,
    key2: 12000
  }
];
let obj = {
  key1: 19000,
  key3: 20000,
  key5: [
    {
      key1: 9000
    }
  ]
};
let keyParams = ["key1", "key2", "key5"];
AdaptMoneyFromObj(arr, keyParams);
AdaptMoneyFromObj(obj, keyParams);

let obj1 = [
  {
    BetAvg: 5450000,
    BetCount: 2,
    BetTotal: 10900000,
    D: -10900000,
    ID: 6063264,
    Time: "2019-02-16T10:34:26.772611239+08:00",
    Water: 0
  }
];

AdaptMoneyFromObj(obj1, ["BetAvg", "BetTotal", "D", "Water"]);

console.log("obj1:", obj1);

let arr2 = [[10000, 20000], [0, 4500, 60060]];

AdaptMoneyFromObj(arr2);

console.log(arr);
console.log(obj);
console.log(arr2);
