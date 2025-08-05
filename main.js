let answer = document.querySelector("#answer");
let btns = document.querySelectorAll(".btn");
let bintDecimal = document.querySelector(".bintodecimal");
let programming = document.querySelector("#programming");
let standard = document.getElementById("standard");
let listitem = document.querySelector(".history");
let nohistoryitem = document.querySelector(".firsitem");
let mode = true;
let showfrc = 0;
let sign;
let lastvalue;
let newvalue;
let listname = "";

//Auto Choose Standard mode
window.onload = () => {
    if(mode){
        standard.style.color = "black";
    }else{
        programming.style.color = "black";
    }
}
//History Function 
const historyBtn = document.querySelector("#history-btn");
const history = document.querySelector(".history");
historyBtn.addEventListener('click', () => {
    history.style.display = history.style.display === 'block' ? 'none' : 'block';
});

//Standard Calculator
let standardFun = () => {
    standard.classList.add("btn");
    mode = true;
    standard.style.color = "black";
    programming.style.color = "white";
    answer.innerText = "";
    if(mode){
        btns.forEach(btn => {
            btn.style.backgroundColor = "#444";
            //Set Old Colors and Backgroun coloras
            btn.addEventListener('mouseover',() => {
                btn.style.backgroundColor= "#555";
                btn.style.color= "#fff";
            });
            btn.addEventListener("click",() => {
                btn.style.backgroundColor= "#333";
                btn.style.color= "white";
            });
            btn.addEventListener("mouseout", () => {
                btn.style.backgroundColor = "#444";
            });
            let newid = btn.getAttributeNode("id");
            if(newid.value === "underonefraction"){
                btn.innerText = "1/x";
            }else if(newid.value === "equal"){
                btn.style.backgroundColor = "rgba(61, 167, 234, 0.977)";
                
                btn.addEventListener('mouseover',() => {
                btn.style.backgroundColor= "rgba(61, 168, 234, 0.88)";
                btn.style.color= "#ffffffb8";
                });
                btn.addEventListener("click",() => {
                    btn.style.backgroundColor= "rgba(61, 168, 234, 0.704)";
                    btn.style.color= "#ffffff75";
                });
                btn.addEventListener("mouseout", () => {
                    btn.style.backgroundColor = "rgba(61, 167, 234, 0.977)";
                    btn.style.color = "#fff";
                });
            }
        });
    }
}

//Choose Caculater Mode
standard.addEventListener("click",standardFun);

const programmingFun =  () => {
    programming.style.color = "black";
    programming.style.backgroundColor = "#555";
    standard.style.color = "white";
    mode = false;
    answer.innerText = "";
    if(!mode){
        btns.forEach(btn => {
            let newclass = btn.getAttributeNode("class");
            btn.style.backgroundColor = "#777";
            if(btn.className === "prog btn bintodecimal"){
                btn.innerText = "B→D";
                btn.style.backgroundColor = "#333";
                btn.addEventListener('mouseover',() => {
                btn.style.backgroundColor= "#555";
                btn.style.color= "#fff";
            });
            btn.addEventListener("click",() => {
                btn.style.backgroundColor= "#333";
                btn.style.color= "white";
            });
            btn.addEventListener("mouseout", () => {
                btn.style.backgroundColor = "#333";
            });
            }else if(btn.className === "prog btn one"){
                btn.style.backgroundColor = "#333";
                btn.addEventListener('mouseover',() => {
                btn.style.backgroundColor= "#555";
                btn.style.color= "#fff";
            });
            btn.addEventListener("click",() => {
                btn.style.backgroundColor= "#333";
                btn.style.color= "white";
            });
            btn.addEventListener("mouseout", () => {
                btn.style.backgroundColor = "#333";
            });
            }else if(btn.className === "prog btn zero"){
                btn.style.backgroundColor = "#333";
                btn.addEventListener('mouseover',() => {
                btn.style.backgroundColor= "#555";
                btn.style.color= "#fff";
            });
            btn.addEventListener("click",() => {
                btn.style.backgroundColor= "#333";
                btn.style.color= "white";
            });
            btn.addEventListener("mouseout", () => {
                btn.style.backgroundColor = "#333";
            });
            }
        });
    }
}
//When Mode Change Above Function Will Invoked
programming.addEventListener("click",programmingFun);

//When User Click By KeyBoard Numbers This Operation Will Perform
document.querySelector('body').addEventListener('keypress', (btn) => {
    if(btn.key === "Enter"){
        Equal();
    }
    else if(btn.key === "Delete" || btn.key === "backSpace"){
        alert("clicked");
        answer.innerText = "";
    }
    else{
        setvalue(btn.key);
    }
});

//When Button Clicked Id Will Get and Send to setvalue Function
btns.forEach(btn => {
    btn.addEventListener("click", () => {
    let newid = btn.getAttributeNode("id");
    setvalue(newid.value);
    });
});

//Check Button ID And by Looking to ID Operation will Perform
let setvalue = (id) => {
    //When Mode is True mean Standard Calculator so  This Operation Will Perform
    if(mode){
        if(id === "%" || id === "clearall" || id === "clear" || id === "underonefraction" || id === "root" || id === "/" || id === "*" || id === "-" || id === "+" || id === "equal" || id === "minusplus" || id === "square"){
            //Clear Sign
            if(id === "clear" || id === "clearall"){
                answer.innerText = "0";
                sign = "";
                showfrc = 0;
            }
            //Modulo Divide
            else if(id === "%"){
                modulo_divide();
            }
            //Addition
            else if(id === "+"){
                Addition();
            }
            //Subtraction
            else if(id === "-"){
                Subtraction();
            }
            //Divide
            else if(id === "/"){
                Divide();
            }
            //Multiply
            else if(id === "*"){
                Multiply();
            }
            //Square
            else if(id === "square"){
                Square();
            }
            //root
            else if(id === "root"){
                Root();
            }
            //underonefraction
            else if(id === "underonefraction"){
                underonefraction();
            }
            //minusplus
            else if(id === "minusplus"){
                Minusplus();
            }
            //Equal
            else if(id === "equal"){
                Equal();
            }
        }
        //Fraction which is dot (.)
        else if(id === "." && showfrc === 0){
            showfrc++;
            answer.innerText += ".";
            if(newvalue){
                newvalue += ".";
            }
        //When in Between Operation Clicked by Fraction(.) Nothing Will Perform
        }else if(id === "."){
            //Nothing Done
        }else{
            //When No Number Entered Before newValue will replace with zero 
            if(answer.innerText === "0"){
                answer.innerText = id;
            }else{
                //If First Value Entered Second Value wil Entered after operation Sign
                if(lastvalue){
                        answer.innerText += id;
                        newvalue += id;
                        //When First and Second Value Entered it Will Send To History
                        listname = document.createElement("li");
                        nohistoryitem.remove();
                        listname.innerText = answer.innerText;
                        showfrc = 0;
                //If First Value Not Entered So the New Value Send to First Value
                }else{
                    answer.innerText += id;
                    showfrc=0;
                }
            }   
        }
    //When Mode Was False mean Programming Mode Under Operation Will Perform
    }else{
        //Creat Variable for Class 
        let before = "prog btn ";
        //Loop will Iterate to Find Buttons of Programming Calculator
        //And Event Only Work in Special Butons
        btns.forEach(btn => {
            if(btn.className === before+"clearall" || btn.className === before+"clear" || btn.className === before+"bintodecimal" || btn.className === before+"one" || btn.className === before+"zero"){
                //Event Listener
                btn.addEventListener("click", () => {
                    let id = btn.getAttributeNode("id");
                });
            }
        });
            listname = document.createElement("li");
            nohistoryitem.remove();
            if(id === "clear"){
                answer.innerText = "";
            }else if(id === "1"){
                answer.innerText += "1";
                //Add Zero Value
            }else if(id === "0"){
                    answer.innerText += "0";
                //Addition Operation
            }else if(id === "underonefraction"){
                if(answer.innerText){
                    binartodecimal(Number(answer.innerText));
                }else{
                    alert("Please Enter Number To Convert");
                }
            }
        }
}
//Standard Calculator
//Modulo Divide
let modulo_divide = () =>{
    if(!newvalue){
        let newanswer="";
        for(char of answer.innerText){
            if(char !== sign){
                newanswer += char;
            }
            }
            answer.innerText = newanswer;
            sign = "%";
            if(answer.innerText !== "0"){
            lastvalue = answer.innerText;
            newvalue = "";
            answer.innerText += "%";
        }
    }
}

//Addition
let Addition = () => {
    //When Change Sign without Second Number
    if(!newvalue){
        let newanswer="";
        for(char of answer.innerText){
            if(char !== sign){
                newanswer += char;
                }
            }
            //Add New Sign
            answer.innerText = newanswer;
            sign = "+";
            if(answer.innerText !== "0"){
                lastvalue = Number(lastvalue);
                lastvalue = answer.innerText;
                newvalue = "";
                answer.innerText += "+";
                console.log("sign is : ",sign)
        }
    }
}

//Subtraction
let Subtraction = () => {
    if(!newvalue){
        let newanswer="";
        for(char of answer.innerText){
            if(char !== sign){
                newanswer += char;
            }
        }
        answer.innerText = newanswer;
        sign = "-";
        if(answer.innerText !== "0"){
            lastvalue = answer.innerText;
            newvalue = "";
            answer.innerText += "-";
        }
    }
}

//Multiply
let Multiply = () => {
    if(!newvalue){
        let newanswer="";
        for(char of answer.innerText){
            if(char !== sign){
                newanswer += char;
            }
        }
        answer.innerText = newanswer;
        sign = "×";
        if(answer.innerText !== "0"){    
            lastvalue = answer.innerText;
            newvalue = "";
            answer.innerText += "×";
        }
    }
}

//Divide
let Divide = () => {
if(!newvalue){
                let newanswer="";
                for(char of answer.innerText){
                    if(char !== sign){
                        newanswer += char;
                    }
                }
                answer.innerText = newanswer;
                sign = "÷";
                if(answer.innerText !== "0"){
                    lastvalue = answer.innerText;
                    newvalue = "";
                    answer.innerText += "÷";
                }
            }
}

//Square
let Square = () => {
if(!sign){
                let newanswer="";
                for(char of answer.innerText){
                    if(char !== sign){
                        newanswer += char;
                    }
                }
                answer.innerText = newanswer;
                sign = "x2";
                if(answer.innerText !== "0"){
                    showfrc = 0;
                    lastvalue = answer.innerText;
                    answer.innerText = lastvalue ** 2;
                    newvalue = "";
                    lastvalue = "";
                    sign = "";
                }
            }
}

//Root
let Root = () => {
if(!sign){
                let newanswer="";
                for(char of answer.innerText){
                    if(char !== sign){
                        newanswer += char;
                    }
                }
                answer.innerText = newanswer;
                sign = "√";
                if(answer.innerText !== "0"){
                    showfrc = 0;
                    lastvalue = answer.innerText;
                    answer.innerText = lastvalue ** 0.5;
                    newvalue = "";
                    lastvalue = "";
                    sign = "";
                }
            }
}

//underonefraction
let underonefraction = () => {
if(!sign){
                sign = "1/x";
                if(answer.innerText !== "0"){
                    showfrc = 0;
                    lastvalue = Number(answer.innerText);
                    answer.innerText = 1 / lastvalue;
                    newvalue = "";
                    lastvalue = "";
                    sign = "";
                }
            }
}

//MinusPlus
let Minusplus = () => {
if(!sign){
            sign = "±";
            if(answer.innerText !== "0"){
                showfrc = 0;
                lastvalue = Number(answer.innerText);        
                answer.innerText =  "-1" * lastvalue;
                newvalue = "";
                lastvalue = "";
                sign = "";
                }
            }
}

//Equal Mean Answer
let Equal = () => {
    if(sign){
        if(answer.innerText !== "0"){
            if(sign === "+"){
                answer.innerText = Number(lastvalue) + Number(newvalue);
                listname.innerText += "=" + answer.innerText;
                listitem.prepend(listname);   
                sign = "";
                newvalue = "";
            }else if(sign === "-"){
                answer.innerText = Number(lastvalue) - Number(newvalue);
                listname.innerText += "=" + answer.innerText;
                listitem.prepend(listname);
                sign = "";
                newvalue = "";
            }else if(sign === "×"){
                answer.innerText = Number(lastvalue) * Number(newvalue);
                listname.innerText += "=" + answer.innerText;
                listitem.prepend(listname);
                sign = "";
                newvalue = "";
            }else if(sign === "÷"){
                answer.innerText = Number(lastvalue) / Number(newvalue);
                listname.innerText += "=" + answer.innerText;
                listitem.prepend(listname);
                sign = "";
                newvalue = "";
            }else if(sign === "%"){
                answer.innerText = Number(lastvalue) % Number(newvalue);
                listname.innerText += "=" + answer.innerText;
                listitem.prepend(listname);
                sign= "";
                newvalue = "";
            }else{
                sign = "";
                answer.innerText = "Other Operation";
            }
        }
    }
}
//Programmer Calculator
//Binary to Decimal
const binartodecimal = (binarynum) =>{
    let oldnum = binarynum;
    let Answer=0;
    let Reminder;
    let power=1;
    while(binarynum > 0){
        Reminder = binarynum % 10;
        Answer = Answer + (Reminder * power);
        binarynum /= 10;
        //Update Power Value
        power *= 2;
    }
    listname.innerText = "(" + oldnum + ")₂ " + "= " + Math.floor(Answer);
    listitem.prepend(listname);
    answer.innerText = Math.floor(Answer);
}