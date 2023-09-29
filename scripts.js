let buttons = document.querySelectorAll("button");
let screenVal = document.querySelector("#val");
let numbers = [];
let operations = [];
let override = false;
let ansSet = false;
let decimalSet = false;

function setScreen(newVal, clear){
    valWidth = val.getBoundingClientRect().width;
    if((val.innerHTML == "0" && newVal != ".") || override || ansSet){
        val.innerHTML = newVal;
        if(!override && ansSet){ansSet = false;}
        override = false;
    }
    else if(valWidth < 240){
        if(!decimalSet || (decimalSet && newVal != ".")){
            val.innerHTML += newVal;
        }
        if(newVal == "."){decimalSet = true;}
    }
    if(clear){
        val.innerHTML = "0";
    }
}

function saveVal(val, type){
    decimalSet = false;
    if(type == 1){
        numbers.push(Number(val));
    }
    else{
        operations.push(val);
    }
}

function parseInput(btn){
    if(btn.classList.contains("number")){
        setScreen(btn.innerHTML, false);
    }
    else if(btn.classList.contains("control")){
        if(btn.innerHTML == "AC"){
            operations = [];
            numbers = [];
            override = false;
            ansSet = false;
            decimalSet = false;
            setScreen("", true);
        }
        else if(btn.innerHTML == "+/-" && val.innerHTML != "0"){
            let old = val.innerHTML;
            val.innerHTML = "-" + old;
        }
    }
    else if(btn.classList.contains("operation")){
        if(btn.innerHTML == "="){
            saveVal(val.innerHTML, 1);
            parseCalculation();
        }
        else{
            saveVal(val.innerHTML, 1);
            saveVal(btn.innerHTML);
            override = true;
        }
    }
}

function getOp(i){
    switch(operations[i]){
        case "+":
            return 1;
        case "-":
            return 2;
        case "x":
            return 3;
        case "÷":
            return 4;
    }
}

function calculate(type, num1, num2){
    switch (type) {
        case 1:
            return num1 + num2
        case 2:
            return num1 - num2
        case 3:
            return num1 * num2
        case 4:
            if(num2 == 0){
                return "ERROR";
            }else{return (num1 / num2).toFixed(7)}
        default:
            break;
    }
}

function parseCalculation(){
    let op = 0;
    for(let i = 0; i < numbers.length; i+=2){
        let ans = calculate(getOp(op), numbers[i], numbers[i+1]);
        override = true;
        ansSet = true;
        setScreen(ans, false);
    }
}


buttons.forEach(btn =>{
    btn.addEventListener("click", ()=>{parseInput(btn)});
})
