function expo (){
    let inputExpo = prompt("Please enter a number");
    if ((inputExpo*inputExpo)%2==0){
        document.writeln("<div id=expo>exponent is even</div>");
    }
}

function SQRT(){
    let inputSQRT = prompt("Please enter a number");
    document.writeln("<div class=test>"+Math.sqrt(inputSQRT)+"</div>");
}

expo()

SQRT()