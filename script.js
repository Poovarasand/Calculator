//Setting up operators with priority
const prioritizingOperator = (operator) => {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "^":
      return 3;
    default:
      return -1;
  }
};

//Calculating the values according to the operator
const calculatingValues = (num1, operator, num2) => {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
};

const convertToReArragedValue = (val) => {
  // console.log("[val]", infix);

  if (!val) {
    console.log("Please valid value");
  }
  //operators variable is declared to compare the operator based on prioritizingOperator
  let operators = [];

  //p
  let arrangedValues = "";
  for (var i = 0; i < val.length; i++) {
    if ((val[i] >= "0" && val[i] <= "9") || val[i] == ".") {
      arrangedValues += val[i];
    } else {
      arrangedValues += " ";
      // If the  operators length is zero it will add  the operators
      if (operators.length === 0) {
        operators.push(val[i]);
      } else {
        // Comparing  previous operator according to the prioritizingOperator
        if (
          prioritizingOperator(val[i]) >
          prioritizingOperator(operators[operators.length - 1])
        ) {
          operators.push(val[i]);
        } else {
          while (
            !(operators.length === 0) &&
            prioritizingOperator(val[i]) <=
              prioritizingOperator(operators[operators.length - 1])
          ) {
            var ch = operators[operators.length - 1];
            operators.pop();
            arrangedValues += ch;
          }
          operators.push(val[i]);
        }
      }
    }
  }
  arrangedValues += " ";
  while (!(operators.length === 0)) {
    var ch = operators[operators.length - 1];
    arrangedValues += ch;
    operators.pop();
  }
  return calculatingWithReArrangedValue(arrangedValues);
};

//calating the value after re arranging
var calculatingWithReArrangedValue = function (val) {
  var answer = [],
    n,
    result;
  for (var i = 0; i < val.length; i++) {
    if ((val[i] >= "0" && val[i] <= "9") || val[i] == ".") {
      var number = "";
      while (val[i] != " ") {
        number += val[i];
        i++;
      }
      n = parseFloat(number);
      answer.push(n);
    } else {
      if (answer.length < 2) {
        result = "INVALID";
        return result;
      } else {
        var num2 = answer[answer.length - 1];
        answer.pop();
        var num1 = answer[answer.length - 1];
        answer.pop();
        result = calculatingValues(num1, val[i], num2);
        answer.push(result);
      }
    }
  }
  var finalAns = answer[answer.length - 1];
  answer.pop();
  if (answer.length === 0) {
    return finalAns;
  } else {
    return "INVALID";
  }
};

console.log("[Final Answer]", convertToReArragedValue("2-5/6-9"));
