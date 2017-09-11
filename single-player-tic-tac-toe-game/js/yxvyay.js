var a = document.getElementById("input");
a.addEventListener("click", changeBackground);
var background = 1;
function changeBackground(){
  if (background==1){
    background = 2;
  document.getElementById("background").className="b1 b2";
  document.getElementById("label1").className="toggleLabel label1 "; 
  document.getElementById("label2").className="toggleLabel label2 ";  
  }
  else {
    background=1;
  document.getElementById("background").className="b1";
  document.getElementById("label1").className="toggleLabel label1";
  document.getElementById("label2").className="toggleLabel label2";  
    
  }
} 

//function myFunction () { document.getElementById("background").className+=" b2";
//console.log(document.getElementById("background").className);}