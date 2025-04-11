document.addEventListener("DOMContentLoaded", function () {
	//Get Elements
	const noteContainer = document.getElementById("note-container");
	const newNoteButton = document.getElementById("new-note-button");
	const colorForm = document.getElementById("color-form");
	const colorInput = document.getElementById("color-input");

	//Application State
	let noteColor = "";
	let noteIdCounter = 0;
	const notesArr = [];

	init();

	//Event listeners/handlers
	colorForm.addEventListener("submit", setColor);
	document.addEventListener("dblclick", deleteNote);
	noteContainer.addEventListener("blur", blurNote, true);
	window.addEventListener("keydown", handleKeydown);
	newNoteButton.addEventListener("click", addNewNote);

	//Initialize app state from localStorage
	function init() {
		noteColor = localStorage.getItem("noteColor");
		const storedCounter = localStorage.getItem("noteIdCounter");
		noteIdCounter = storedCounter !== null ? storedCounter : 0;

		const storedNotesArr = JSON.parse(
			localStorage.getItem("storedNotesArr")
		);

		if (storedNotesArr !== null) {
			notesArr.push(...storedNotesArr);
		}

		for (let note of notesArr) {
			createNote(note.id, note.content);
		}
	}

	//Sets the color of all notes
	function setColor(event) {
		event.preventDefault(); // Prevents the default event.
		noteColor = colorInput.value.trim(); // Removes whitespaces.

		const notes = document.querySelectorAll(".note");
		for (let note of notes) {
			note.style.backgroundColor = noteColor;
		}
		colorInput.value = ""; // Clears the color input field after from submission.

		localStorage.setItem(`noteColor`, noteColor.toString());
	}

	function addNewNote(event) {
		const id = noteIdCounter;
		const content = `Note ${id}`;

		createNote(id, content);
		noteIdCounter++;

		notesArr.push({ id: id.toString(), content: content.toString() });

		localStorage.setItem("storedNotesArr", JSON.stringify(notesArr));
		localStorage.setItem(`noteIdCounter`, noteIdCounter.toString());
	}

	//Used for adding a new note and loading one from localStorage during init()
	function createNote(id, content) {
		const note = document.createElement("textarea");
		note.setAttribute("data-note-id", id.toString());
		note.value = content;
		note.className = "note";
		note.style.backgroundColor = noteColor;
		noteContainer.appendChild(note);
	}
	function deleteNote(event) {
		if (event.target.classList.contains("note")) {
			event.target.remove();
			const id = event.target.getAttribute("data-note-id");

			const noteIndex = getNoteIndex(id);
			if (noteIndex !== -1) {
				notesArr.splice(noteIndex, 1);
				localStorage.setItem(
					"storedNotesArr",
					JSON.stringify(notesArr)
				);
			}
		}
	}

	//Saves the content of a note when it loses focus
	function blurNote(event) {
		if (event.target.classList.contains("note")) {
			const id = event.target.getAttribute("data-note-id");
			const noteIndex = getNoteIndex(id);
			if (noteIndex !== -1) {
				notesArr[noteIndex].content = event.target.value;
				localStorage.setItem(
					"storedNotesArr",
					JSON.stringify(notesArr)
				);
			}
		}
	}

	function handleKeydown(event) {
		/* Ignores key presses made for color and note content inputs. */
		if (
			event.target.id === "color-input" ||
			event.target.type === "textarea"
		) {
			return;
		}

		/* Adds a new note when the "n" key is pressed. */
		if (event.key === "n" || event.key === "N") {
			addNewNote(); // Adds a new note.
		}
	}

	function getNoteIndex(id) {
		return notesArr.findIndex((note) => note.id === id);
	}
});
