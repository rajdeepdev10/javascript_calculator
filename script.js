let display_div = document.getElementById("display");

let previousNum = null;
let nextNum = null;

let updatePreviousNum = true;

let updatePreviousOperator = true;

let previousOperator = null;
let newOperator = null;

let newNum = true;
let isfirstOperation = true;

let result = null;

let wasPreviousNumberDecimal = false;

let wasLastInputTheFirstOperator = true;

let userTypedANumber = false;

function main(input)
{

    //if input = string
        // let operator = getOperator(operator);

    if (typeof input == 'number')
    {
        userTypedANumber = true;
        updateDisplay(input);
        // console.log("userTypedANumber is " + userTypedANumber);
    }
    else
    {
    // {
    //     if (userTypedANumber == true)
    //     {
            compute(input);
            userTypedANumber = false;
        // }
        // console.log("user TypedANumber is " + userTypedANumber);

    }
        

}



function updateDisplay(input)
{
    if (input == '.')
    {
        if (!wasPreviousNumberDecimal)
        {
            wasPreviousNumberDecimal = true;
        }

        else
        {
            return -1;
        }
    }

    if (display_div.innerText == 0 && input == 0)
    {
        console.log("can't update");
    }

    else if (display_div.innerText == 0 || newNum)
    {
        display_div.innerText = input;
        newNum = false;
    }

    else
    {
        display_div.innerText += input;
    }

    console.log(previousNum, nextNum, previousOperator);

}



function clearDisplay()
{
    display_div.innerText = 0;
    previousNum = null;
    nextNum = null;

    updatePreviousNum = true;
    updatePreviousOperator = true;
    previousOperator = null;
    newOperator = null;
    newNum = true;
    isfirstOperation = true;
    wasPreviousNumberDecimal = false;
    wasLastInputAnOperator = false;
    result = null;
    userTypedANumber = false;

    console.log("All cleared!");
}


function compute(operator)
{
    newNum = true;


    if (updatePreviousOperator)
    {
        previousOperator = operator;
        updatePreviousOperator = false;
        console.log(previousOperator + " <== previousOperator")
    }

    newOperator = operator;

    if (updatePreviousNum == true)
    {
        previousNum = display_div.innerText;
        updatePreviousNum = false;
    }

    else
    {
        nextNum = display_div.innerText;
        updatePreviousNum = true;
    }

    if (result != null)
    {
        previousNum = result;
        nextNum = display_div.innerText;
    }

    console.log(previousNum + "<== previousNum");
    console.log(nextNum + "<== nextNum");

    if (isfirstOperation)
    {
        console.log("first operation ... skipping computation");
        isfirstOperation = false;
    }

    else
    {
        nextNum = parseFloat(nextNum);
        previousNum = parseFloat(previousNum);

        console.log(previousNum, previousOperator, nextNum + "<== MAIN CALCULATION");

        switch (previousOperator){
            case '+':
                display_div.innerText = add(previousNum, nextNum);
                break;
            case '-':
                display_div.innerText = subtract(previousNum, nextNum);
                break;
            case '*':
                display_div.innerText = multiply(previousNum, nextNum);
                break;
            case '/':
                display_div.innerText = divide(previousNum, nextNum);
                break;
        }

        result = display_div.innerText;

        console.log(result + "<== AND THEIR RESULT");

        previousNum = result;
        
        previousOperator = newOperator;
    }

    wasPreviousNumberDecimal = false;

}



function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return a / b;
}