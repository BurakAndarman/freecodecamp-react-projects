import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import {useState} from "https://cdn.skypack.dev/react";

const operators=["+","-","/","x"];
const operatorsWithoutMinus=["+","/","x"];

const App=()=>{
   const [expression,setExpression]=useState(["0"]);
   
   const handleEqualsClick=()=>{
    if(!expression.includes("=")){
     
     if(operators.includes(expression[expression.length-1])){
       setExpression(oldExpression => [...oldExpression.slice(0,oldExpression.length-1)])
     }
     
     const copy=[...expression];
     let result;
     
     while(copy.includes("/") || copy.includes("x")){
       for(let i=0;i<copy.length;i++){
         if(copy[i]==="/"){
           result=copy[i-1]/copy[i+1];
           copy.splice(i-1,3,result);
           break;
         }
         else if(copy[i]==="x"){
           result=copy[i-1]*copy[i+1];
           copy.splice(i-1,3,result);
           break;
         }
       }
     }
     
     while(copy.includes("+") || copy.includes("-")){
       for(let i=0;i<copy.length;i++){
         if(copy[i]==="+"){
           if(copy[i-1].toString().includes(".") || copy[i+1].toString().includes(".")){
             result=parseFloat(copy[i-1])+parseFloat(copy[i+1]);
             copy.splice(i-1,3,result);
             break;
           }
           else{
             result=parseInt(copy[i-1])+parseInt(copy[i+1]);
             copy.splice(i-1,3,result);
             break;
           }
         }
         else if(copy[i]==="-"){
           result=copy[i-1]-copy[i+1];
           copy.splice(i-1,3,result);
           break;
         }
       }
     }
     
     
     setExpression(oldExpression => [...oldExpression,"=",...copy]);
     
    }
   }
  
   
   const handleNumberClick=(number)=>{
     if(expression.includes("=")){
       setExpression(oldExpression => [number])
     }
     
     else if(expression.length>1){
       if(operators.includes(expression[expression.length-1]) && operators.includes(expression[expression.length-2])){
        setExpression(oldExpression => [...oldExpression.slice(0,oldExpression.length-1),expression[expression.length-1].concat(number)])
       }
       else if(operators.includes(expression[expression.length-1]) && !operators.includes(expression[expression.length-2])){
         setExpression(oldExpression => [...oldExpression,number])
       }
       else if(expression[expression.length-1]==="0" && number!=="0"){
         setExpression(oldExpression => [...oldExpression.slice(0,oldExpression.length-1),expression[expression.length-1].concat(number)])
       }
       else if(expression[expression.length-1]!=="0"){
         setExpression(oldExpression => [...oldExpression.slice(0,oldExpression.length-1),expression[expression.length-1].concat(number)])
       }                
     }
     else{
       if(operators.includes(expression[expression.length-1])){
         setExpression(oldExpression => [...oldExpression,number])
       }
       else if(expression[expression.length-1]==="0" && number!=="0"){
         setExpression(oldExpression => [number])
       }
       else if(expression[expression.length-1]!=="0"){
         setExpression(oldExpression => [...oldExpression.slice(0,oldExpression.length-1),expression[expression.length-1].concat(number)])
       } 
     }     
   }
   
   
   const handleOperatorClick=(operator)=>{
     if(!operators.includes(expression[expression.length-1]) && !expression.includes("=")){
       setExpression(oldExpression => [...oldExpression,operator])
     }
     else if(expression.includes("=")){
       setExpression(oldExpression => [expression[expression.length-1],operator])
     }
     else if(expression.length>1){ 
        if(!operators.includes(expression[expression.length-2]) && operators.includes(expression[expression.length-1]) && operator!=="-"){
         setExpression(oldExpression => [...oldExpression.slice(0,oldExpression.length-1),operator])
        }
        else if(operators.includes(expression[expression.length-2]) && expression[expression.length-1]==="-" && operator!=="-"){
         setExpression(oldExpression => [...oldExpression.slice(0,oldExpression.length-2),operator])
        }
        else if(operatorsWithoutMinus.includes(expression[expression.length-1]) && operator==="-"){
         setExpression(oldExpression => [...oldExpression,operator])
        }
     }
   }
   
   const handleClearClick=()=>{
     setExpression(["0"]);
   }
   
   
   const handleDecimalClick=()=>{
     if(operators.includes(expression[expression.length-1])){
       setExpression(oldExpression => [...oldExpression,"0."])
     }
     else if(expression.includes("=")){
       setExpression(["0."])
     }
     else if(!expression[expression.length-1].includes(".")){
       setExpression(oldExpression => [...oldExpression.slice(0,oldExpression.length-1),expression[expression.length-1].concat(".")]);
     }
   }
   
   return(
       <div class="calculator-wrapper">
         <div class="container">
           <div id="display-section">
             <div id="expression">{expression}</div>
             <div id="display">{expression[expression.length-1]}</div>
           </div>
           <button id="equals" class="rectangle-button operator-button" onClick={() => handleEqualsClick()}>=</button>
           <button class="rounded-button number-button" id="nine" onClick={() => handleNumberClick("9")}>9</button>
           <button class="rounded-button number-button" id="eight" onClick={() => handleNumberClick("8")}>8</button>
           <button class="rounded-button number-button" id="seven" onClick={() => handleNumberClick("7")}>7</button>
           <button class="rounded-button number-button" id="six" onClick={() => handleNumberClick("6")}>6</button>
           <button class="rounded-button number-button" id="five" onClick={() => handleNumberClick("5")}>5</button>
           <button class="rounded-button number-button" id="four" onClick={() => handleNumberClick("4")}>4</button>
           <button class="rounded-button number-button" id="three" onClick={() => handleNumberClick("3")}>3</button>
           <button class="rounded-button number-button" id="two" onClick={() => handleNumberClick("2")}>2</button>
           <button class="rounded-button number-button" id="one" onClick={() => handleNumberClick("1")}>1</button>        
           <button class="rectangle-button number-button"id="zero" onClick={() => handleNumberClick("0")}>0</button>
           <button class="rounded-button operator-button" id="divide" onClick={() => handleOperatorClick("/")}>/</button>
           <button class="rounded-button operator-button" id="multiply" onClick={() => handleOperatorClick("x")}>x</button>
           <button class="rounded-button operator-button" id="subtract" onClick={() => handleOperatorClick("-")}>-</button>
           <button class="rounded-button operator-button" id="add" onClick={() => handleOperatorClick("+")}>+</button>
           <button class="rectangle-button" id="clear" onClick={() => handleClearClick()}>AC</button>
           <button class="rounded-button number-button" id="decimal" onClick={() => handleDecimalClick()}>.</button>
         </div>
       </div>
   )
}


ReactDOM.render(<App/>,document.getElementById("root"));