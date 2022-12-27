/* 
Recursively sum an arr of ints
*/

const nums1 = [1, 2, 3];
const expected1 = 6;

const nums2 = [1];
const expected2 = 1;

const nums3 = [];
const expected3 = 0;

/**
 * Add params if needed for recursion
 * Recursively sums the given array.
 * - Time: O(?).
 * - Space: O(?).
 * @param {Array<number>} nums
 * @returns {number} The sum of the given nums.
 * 
 * Edge case
 * Base case ->
 * Recursive call
 */
function sumArr(nums) {
    let sum = 0
    for (let i=0; i<nums.length; i++){
        sum += nums[i]
    }
    return sum
}

function sumArrRecursive(nums, i=0) {
    // edge cases

    // base case
    if (i === nums.length){
        return 0
    }
    
    // recursive call
    console.log(nums[i]);
    let sum = sumArrRecursive(nums, i+1) + nums[i]
    console.log(`return: ${sum}`);
    return sum
}

console.log(sumArrRecursive(nums1));

// **********************************************************************

/* 
Recursive Sigma
Input: integer
Output: sum of integers from 1 to Input integer
*/

const two_num1 = 5;
const two_expected1 = 15;
// Explanation: (1+2+3+4+5)

const two_num2 = 2.5;
const two_expected2 = 3;
// Explanation: (1+2)

const two_num3 = -1;
const two_expected3 = 0;

/**
 * Recursively sum the given int and every previous positive int.
 * - Time: O(?).
 * - Space: O(?).
 * @param {number} num
 * @returns {number}
 */
// function recursiveSigma(num) {}

function recursiveSigma(num, i=0) {
    // edge cases (negative, decimals)
    if (num < 0){
        return 0
    }
    num = Math.trunc(num);
    // base case
    if (i > num){
        return 0
    }
    
    // recursive call
    let sum = recursiveSigma(num, i+1) + i 
    // console.log(`return: ${sum}`);
    return sum
}

function recursiveSigma(num) {
    //base
    num = Math.floor(num)
    if (num < 0) {
        return 0
    }
    //recursive
    return recursiveSigma(num-1) + num
}

function recursiveSigma(num) {
    if (num <= 0) return 0
    let flooredNum = Math.floor(num)
    return recursiveSigma(flooredNum - 1) + flooredNum
}

// function mathBased(num) {
//     if (num <= 0) return 0
//     return (num * (num + 1)) / 2
// }