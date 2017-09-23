



let open = false;

var toggleMenu = function() {
  console.log("check2");
  if (open){
    document.getElementById("mobileMenu").style = "display: none";
    open = false;
  }
  else {
    document.getElementById("mobileMenu").style = "display: block";
    open = true;
  }
}

document.getElementById("hamburgerMenu").addEventListener("click", toggleMenu, false);
