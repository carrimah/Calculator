//Divide: ÷
let buttons = document.querySelectorAll("button");
let screenVal = document.querySelector("#val");
let numbers = [];
let operations = [];

function parseInput(btn){
    if(btn.classList.contains("number")){
        setScreen(btn.innerHTML, false);
    }
    else if(btn.classList.contains("control")){
        if(btn.innerHTML == "AC"){
            setScreen("", true);
        }
        else if(btn.innerHTML == "+/-" && val.innerHTML != "0"){
            let old = val.innerHTML;
            val.innerHTML = "-" + old;
        }
    }
    else if(btn.classList.contains("operation")){
        if(btn.innerHTML == "="){
            console.log("Boop");
        }
        else{
            setScreen("", true);
        }
    }
}

function setScreen(newVal, clear){
    valWidth = val.getBoundingClientRect().width;
    if(val.innerHTML == "0" && newVal != "."){
        val.innerHTML = newVal;
    }
    else if(valWidth < 240){
        val.innerHTML += newVal;
    }
    if(clear){
        val.innerHTML = "0";
    }
}

buttons.forEach(btn =>{
    btn.addEventListener("click", ()=>{parseInput(btn)});
})
