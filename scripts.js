//<<< --- CALCULATIONS --- >>
//<<< --- UI --- >>>
//Elements
let bigScreen = document.querySelector("#val");//Divide: ÷
let miniScreen = document.querySelector("#mini-val");
let btns = document.querySelectorAll("button");
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
            numbers.push(val);
            break;
        case 2:
            operations.push(val);
            break;
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
    if(val == "AC"){
        reset();
    }
    else if(val == "+/-"){
        let replace = "-" + bigScreen.innerHTML;
        setScreen(replace, bigScreen,  1);//Need to do miniscreen (more complicated)
    }//Need to do percent
}

function parseOperation(val){
    if(val == "x"){val = "*";}
    saveVals(bigScreen.innerHTML, 1);
    setScreen((" " + val + " "), miniScreen, 2);
    if(val != "="){
        saveVals(val, 2);
    }
    else{
        console.log(numbers);
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