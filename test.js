console.log(typeof null); // Object

//Boolean转换
/**
 * 除undefined， null， false， NaN， ''， 0， -0都转换为true 
 * 
 */

//Object转基本类型
/**
 * 。。
 */
let a = {
    valueOf() {
        return 0;
    },
    toString() {
        return '1';
    },
    // [Symbol.toPrimitive]() { //转基本类型时调用优先级最高
    //     return 2;
    // }
}

console.log(a);
console.log(1 + a)
console.log('1' + a);
console.log(a.toString());

/**
 * 四则运算
 */
// 1 + '1' // '11'                  [1, 2].toString() -> '1,2'
// 2 * '2' // 4                     [2, 1].toString() -> '2,1'
// [1, 2] + [2, 1] // '1,22,1'      '1,2' + '2,1' = '1,22,1'


/**
 * ==比较运算
 */
console.log([] == ![]);
console.log('1' == 1);
console.log([] == false);
console.log(![] == false);
console.log(598 / 8);