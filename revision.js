const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteList = document.getElementById("noteList");

// load notes from local stroage saved notes
window.addEventListener("load",()=>{
    const loadtask = JSON.parse(localStorage.getItem("notes")) || [];
    loadtask.forEach(note=> addNoteToDOM(note));
})
addNoteBtn.addEventListener("click",()=>{
      const noteText = noteInput.value.trim(); // taking input and store in notetext
      if(noteText==="")return; // if string empty return nothing
      
      addNoteToDOM(noteText); // add note function 
      savedNotes(noteText);  // save notes function to local storage
      noteInput.value="";
});

function addNoteToDOM(noteText){// creating function to add input in list 
  const li = document.createElement("li"); // creating element li
  li.innerText = noteText; // parameter value is equal to li value
 
  const deleteBtn = document.createElement("span");
  deleteBtn.innerText ="❌";
  deleteBtn.classList.add("deleteBtn");

  deleteBtn.addEventListener("click",()=>{
           noteList.removeChild(li);
           deleteNote(noteText);
  })
        li.appendChild(deleteBtn);
           noteList.appendChild(li);
}
 // save notes to the local storage
   function savedNotes(notetext){
         let notes = JSON.parse(localStorage.getItem("notes")) || [];
         notes.push(notetext);
         localStorage.setItem("notes", JSON.stringify(notes));   

   }
       function deleteNote(noteText) {
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes = notes.filter(note => note !== noteText);
      localStorage.setItem("notes", JSON.stringify(notes));
    }


