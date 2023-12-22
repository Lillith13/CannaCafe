// ! Andrea's solution for this problem!
// var isValid = function(s) {
//     if (s.length % 2 !== 0) return false;

//     const stack = [];
//     const pairs = {
//         '(':')',
//         '{':'}',
//         '[':']'
//     };

//     for (let i = 0; i < s.length; i++) {
//         const currentBracket = s[i];

//         if (pairs[currentBracket]) {
//             stack.push(currentBracket);
//         } else {
//             const lastBracket = stack.pop();
//             if (currentBracket !== pairs[lastBracket]) {
//                 return false;
//             }
//         }
//     }
//     return stack.length === 0;
// };

// s = "()[]{}";

// console.log(isValid(s));

var largestTimeFromDigits = function (arr) {
  let latest = "";

  arr.forEach(() => {
    for (let i = arr.length - 1; i > 0; i--) {
      let temp = arr[i - 1];
      arr[i - 1] = arr[i];
      arr[i] = temp;
      let test = `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`;

      if (
        test > latest &&
        !(Number(`${arr[0]}${arr[1]}`) > 23) &&
        !(Number(`${arr[2]}${arr[3]}`) > 59)
      ) {
        latest = test;
      }

      if (i > 1) {
        temp = arr[i - 2];
        arr[i - 2] = arr[i];
        arr[i] = temp;

        test = `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`;

        if (
          test > latest &&
          !(Number(`${arr[0]}${arr[1]}`) > 23) &&
          !(Number(`${arr[2]}${arr[3]}`) > 59)
        ) {
          latest = test;
        }
      }

      temp = arr[i - 1];
      arr[i - 1] = arr[i];
      arr[i] = temp;

      test = `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`;

      if (
        test > latest &&
        !(Number(`${arr[0]}${arr[1]}`) > 23) &&
        !(Number(`${arr[2]}${arr[3]}`) > 59)
      ) {
        latest = test;
      }

      if (i > 1) {
        temp = arr[i - 2];
        arr[i - 2] = arr[i];
        arr[i] = temp;

        test = `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`;

        if (
          test > latest &&
          !(Number(`${arr[0]}${arr[1]}`) > 23) &&
          !(Number(`${arr[2]}${arr[3]}`) > 59)
        ) {
          latest = test;
        }
      }
    }
  });

  arr.forEach(() => {
    for (let i = 0; i < arr.length - 1; i++) {
      let temp = arr[i + 1];
      arr[i + 1] = arr[i];
      arr[i] = temp;

      let test = `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`;

      if (
        test > latest &&
        !(Number(`${arr[0]}${arr[1]}`) > 23) &&
        !(Number(`${arr[2]}${arr[3]}`) > 59)
      ) {
        latest = test;
      }

      if (i < 2) {
        temp = arr[i + 2];
        arr[i + 2] = arr[i];
        arr[i] = temp;

        test = `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`;

        if (
          test > latest &&
          !(Number(`${arr[0]}${arr[1]}`) > 23) &&
          !(Number(`${arr[2]}${arr[3]}`) > 59)
        ) {
          latest = test;
        }
      }

      temp = arr[i + 1];
      arr[i + 1] = arr[i];
      arr[i] = temp;

      test = `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`;

      if (
        test > latest &&
        !(Number(`${arr[0]}${arr[1]}`) > 23) &&
        !(Number(`${arr[2]}${arr[3]}`) > 59)
      ) {
        latest = test;
      }
    }

    let temp = arr[0];
    arr[0] = arr[arr.length - 1];
    arr[arr.length - 1] = temp;

    let test = `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`;

    if (
      test > latest &&
      !(Number(`${arr[0]}${arr[1]}`) > 23) &&
      !(Number(`${arr[2]}${arr[3]}`) > 59)
    ) {
      latest = test;
    }
  });

  return latest;
};

console.log();
console.log("Should be 23:00 ==> ", largestTimeFromDigits([3, 0, 2, 0])); // 23:00
console.log();
console.log("Should be 23:10 ==> ", largestTimeFromDigits([0, 2, 1, 3])); // 23:10
console.log();
console.log("Should be 23:43 ==> ", largestTimeFromDigits([3, 3, 4, 2])); // 23:43
console.log();
console.log("Should be 14:30 ==> ", largestTimeFromDigits([4, 3, 0, 1])); // 14:30
console.log();
console.log("Should be 23:41 ==> ", largestTimeFromDigits([1, 2, 3, 4])); // 23:41
console.log();
console.log("Should be 19:53 ==> ", largestTimeFromDigits([3, 5, 1, 9])); // 19:53
