//<<< --- UI --- >>>
//Elements
let bigScreen = document.querySelector("#val");//Divide: ÷
let miniScreen = document.querySelector("#mini-val");
let btns = document.querySelectorAll("button");
let info = document.querySelector("#info");
let infoTxt = document.querySelector("#info-txt");
let title = document.querySelector("#title");
//States
let override = true;
let decimalSet = false;
let opSet = false;
let getSum = false;
//Arrays
let numbers = [];
let operations = [];

function setScreen(val, screen, type){
    switch(type){
        case 1:
            screen.innerHTML = val;
            break;
        case 2:
            screen.innerHTML += val;
            break;
        case 3:
            screen.innerHTML = "0";
            break;
    }
}

function reset(){
    setScreen(val, bigScreen,  3);
    setScreen(val, miniScreen, 3);
    override = true;
    decimalSet = false;
    getSum = false;
    opSet = false;
    numbers = [];
    operations = [];
}

function saveVals(val, type){
    switch(type){
        case 1:
            numbers.push(Number(val));
            break;
        case 2:
            operations.push(val);
            break;
    }
}

function setNegative(){
    if(bigScreen.innerHTML[0] != "-"){
        let replace = "-" + bigScreen.innerHTML;
        setScreen(replace, bigScreen,  1);
    }
    let space = miniScreen.innerHTML.lastIndexOf(" ");
    if(space != -1){
        let replace = miniScreen.innerHTML.substring(0, space+1) + "-" + miniScreen.innerHTML.substring(space+1);
        setScreen(replace, miniScreen,  1);
    }
    else{
        let replace = "-" + miniScreen.innerHTML;
        setScreen(replace, miniScreen,  1);
    }
}

function setBackspace(){
    let bigVal = bigScreen.innerHTML;
    let miniVal = miniScreen.innerHTML;

    if(bigVal.length == 1){
        setScreen("", bigScreen, 3);
        override = true;
    }
    else if(bigVal.length > 1){
        setScreen(bigVal.substring(0, bigVal.length-1), bigScreen, 1);
    }

    if(miniVal.length == 1){
        setScreen("", miniScreen, 3);
    }
    else if(miniVal.length > 1){
        if(miniVal.substring(miniVal.length-1) != " "){
            setScreen(miniVal.substring(0, miniVal.length-1), miniScreen, 1);
        }
    }
}

function parseNumber(val){
    if(getSum){
        reset();
    }
    valWidth = bigScreen.getBoundingClientRect().width;
    if(override && val != "."){
        setScreen(val, bigScreen,  1);
        if(opSet){
            setScreen(val, miniScreen, 2);
        }else{setScreen(val, miniScreen, 1);}
        override = false;
    }
    else if(valWidth < 230){
        if(!decimalSet || (decimalSet && val != ".")){
            setScreen(val, bigScreen,  2);
            setScreen(val, miniScreen, 2);
        }
        if(val == "."){decimalSet = true; override = false;}
    }
}

function parseControl(val){
    if(val == "AC" || val == "Delete"){
        reset();
    }
    else if(val == "+/-" || val == "_"){
        setNegative();
    }
    else if(val == "←" || val == "Backspace"){
        if(!getSum){
            setBackspace();
        }
    }
}

function parseOperation(val){
    if(val == "Enter"){val = "="}
    decimalSet = false;
    if(val == "x"){val = "*";}
    saveVals(bigScreen.innerHTML, 1);
    setScreen((" " + val + " "), miniScreen, 2);
    if(val != "="){
        saveVals(val, 2);
    }
    else{
        parseCalculation();
        getSum = true;
    }
}

btns.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        if(btn.classList.contains("number")){
            parseNumber(btn.innerHTML);
        }
        else if(btn.classList.contains("control")){
            parseControl(btn.innerHTML);
        }
        else if(btn.classList.contains("operation")){
            parseOperation(btn.innerHTML);
            override = true; opSet = true;
        }
    });
});

//<<< --- CALCULATIONS --- >>
function getOp(i){
    switch(operations[i]){
        case "+":
            return 1;
        case "-":
            return 2;
        case "*":
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
    let ans = numbers[0]
    for(let i = 1; i < numbers.length; i++){
        ans = calculate(getOp(op++), ans, numbers[i]);
    } 
    setScreen(ans, bigScreen, 1);
    setScreen(ans, miniScreen, 2);
}

//<<< --- KEYBOARD SUPPORT --- >>>
function keyboardSupport(key){
    if(key == 0 || key == 1 || key == 2 || key == 3 ||
       key == 4 || key == 5 || key == 6 ||
       key == 7 || key == 8 || key == 9 || key == "."){
        parseNumber(key);
    }
    else if(key == "+" || key == "-" ||
            key == "*" || key == "/" || 
            key == "=" || key == "Enter"){
        parseOperation(key);
        override = true; opSet = true;
    }
    else if (key == "Backspace" || key == "Delete" || key == "_"){
        parseControl(key);
    }
}

window.addEventListener("keydown", e =>{
    keyboardSupport(e.key);
})

//<<< --- INFO --- >>>
info.addEventListener("mouseenter", ()=>{
    infoTxt.style.display = "block";
});
info.addEventListener("mouseleave", ()=>{
    infoTxt.style.display = "none";
});

//<<< --- PAGE RELOAD --- >>>
title.addEventListener("click", ()=>{reset();});