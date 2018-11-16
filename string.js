let x = 'Hi', y = 'Kevin';
var res = message`${x}I am ${y}hahahasd gasdfasdf`;
console.log(res);

function message(literals, value1, value2) {
	console.log(literals); // [ "", ", I am ", "" ]
	console.log(value1); // Hi
    console.log(value2); // Kevin
    return 1111111
}


let nums = (...arr) => arr;
console.log(nums('a','b','c'))


let arr = [112,32,123]
let strarr = arr.map(item => {
    item+'sdf'
})
console.log(strarr)