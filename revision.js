const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteList = document.getElementById("noteList");

window.addEventListener("load", () => {
   const notes = JSON.parse(localStorage.getItem("notes"));
   notes.forEach(note => addNoteToDOM(note));
})
addNoteBtn.addEventListener("click", () => {
   const noteText = noteInput.value.trim();
   if (noteText === "") return;
   addNoteToDOM(noteText);
   saveNotes(noteText);
});
function addNoteToDOM(noteText) {
   const li = document.createElement("li");
   li.innerText = noteText;


   // creating delete button
   const deleteBtn = document.createElement("span");
   deleteBtn.innerText = "❌";
   deleteBtn.classList.add("deleteBtn");

   deleteBtn.addEventListener("click", () => {
      noteList.removeChild(li);
      deleteNote(noteText);

   });
   li.appendChild(deleteBtn);
   noteList.appendChild(li);
}
// save notes to the local storage
function saveNotes(noteText){
        const notes = JSON.parse(localStorage.getItem("notes")) ||[];
        notes.push(noteText);
        localStorage.setitem("notes",JSON.stringify(notes));

}

function deleteNote(noteText) {
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes = notes.filter(note => note !== noteText);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
