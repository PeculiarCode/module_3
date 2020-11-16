const { REGISTER_INSTANCE } = require("ts-node")

function diff(arr) {
    //数组拷贝
    const copy = arr.slice()
    //数组排序从小到大
    arr.sort((a, b) => {
        return a - b
    })
    const len = arr.length - 1
    //找到数组元素最小值这个值就是买入的值
    let min = arr[0]
    let max = arr[len]
    //找到原始数组对应最小值的索引(不考虑重复值)
    let index_min = copy.indexOf(min)
    let index_max = copy.indexOf(max)

    //最小值在最后
    if (index_min === len) {
        //最大值的在第一位
        if (index_max === 0) {
            let newArr = copy.slice(1, len)
            newArr.sort((a, b) => {
                return a - b
            })
            min = newArr[0]
            max = newArr[newArr.length - 1]
            return max - min
        } else {
            //最大值不在第一位
            let newArr = copy.slice(0, len)
            newArr.sort((a, b) => {
                return a - b
            })
            min = newArr[0]
            max = newArr[newArr.length - 1]
            return max - min
        }
    } else if (index_max === 0 && index_min !== len) {
        let newArr = copy.slice(1, len + 1)
        newArr.sort((a, b) => {
            return a - b
        })
        min = newArr[0]
        max = newArr[newArr.length - 1]
        return max - min
    } else {
        return max - min
    }
}


function getMaxProfit(prices) {
    // 最小的价格
    let minPrice = Number.MAX_SAFE_INTEGER
    // 最大的利益
    let maxProfile = 0;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] <= minPrice) {
            minPrice = Math.min(minPrice, prices[i])//更新最小价格
        } else {
            // 更新最大收益
            maxProfile = Math.max(prices[i] - minPrice, maxProfile)
        }
    }
    return maxProfile;
}
const arr = [15, 4, 1, 5, 2, 13, 0]
const ret = getMaxProfit(arr)
console.log(ret);
