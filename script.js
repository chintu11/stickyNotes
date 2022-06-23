

var itemList = document.getElementById("notes");

itemList.addEventListener("click", removeNote);

let count = Number(window.localStorage.getItem("count"));
if (!count) {
  window.localStorage.setItem("count", "0");
}


let renderNote = (noteTitle, noteBody) => {

    if (count > 0) {
      document.getElementById("no-notes").className = "hidden";
    }
  
    var li = document.createElement("li");
    var a = document.createElement("a");
    var h2 = document.createElement("h2");
    var p = document.createElement("p");
    var ul = document.getElementById("notes");
  
    let xButton = document.createElement("button");
    xButton.classList.add("delete");
    let xText = document.createTextNode("X");
    let h2TN = document.createTextNode(noteTitle);
    let pTN = document.createTextNode(noteBody);
  
    h2.appendChild(h2TN);
    p.appendChild(pTN);
    xButton.appendChild(xText);
  
    a.appendChild(h2);
    a.appendChild(xButton);
    a.appendChild(p);
    a.setAttribute("href", "#");
  
    li.appendChild(a);
    ul.appendChild(li);
  };

let createNote = (e) => {
    e.preventDefault();
    var noteTitle = document.getElementById("note-title").value;
    var noteBody = document.getElementById("note-body").value;
  
    document.getElementById("note-title").value = "";
    document.getElementById("note-body").value = "";
  
    if (!noteTitle || !noteBody) {
      alert("Add Title and Body of Note");
      return;
    }
    count = count + 1;
    window.localStorage.setItem("count", count);
  
    while (window.localStorage.getItem(noteTitle)) {
      noteTitle = noteTitle + " - 1";
    }
    window.localStorage.setItem(noteTitle, noteBody);
  
    renderNote(noteTitle, noteBody);
  };

  function removeNote(e) {

    if (e.target.classList.contains("delete")) {
        var li = e.target.parentElement.parentElement;
  
        itemList.removeChild(li);
        count -= 1;
        window.localStorage.setItem("count", count);
        window.localStorage.removeNote(e.target.previousElementSibling.innerText);
        if (count < 1) {
          document.getElementById("no-notes").className = "";
        }
      
    }
  }

  for (i = 0; i < count + 1; i++) {
    console.log(window.localStorage.key(i));
    let noteTitle = window.localStorage.key(i);
    let noteBody = window.localStorage.getItem(noteTitle);
    if (noteTitle !== "count" && noteTitle) {
      renderNote(noteTitle, noteBody);
    }
  }
  

document.getElementById("form").addEventListener("submit", createNote, false);


  
  