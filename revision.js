const colorcodedisplay = document.getElementById("colorcode")
const changecolorbtn = document.getElementById("changecolorbtn");

function getrandomcolor(){
      let color = "#";
        letter ="0123456789ABCDEF"
      for( let i=0;i<6;i++){
        color += letter[Math.floor(Math.random()*16)]
      }
      return color;

}
changecolorbtn.addEventListener("click",()=>{
            
           const newcolor = getrandomcolor();
           document.body.style.background = newcolor;
           colorcodedisplay.innerText = newcolor;


});