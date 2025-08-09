document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const saveButton = document.getElementById('save-btn');
    const notesList = document.getElementById('notes-list');

    // Load notes from local storage when the page loads
    loadNotes();

    // Event listener for the save button
    saveButton.addEventListener('click', saveNote);

    function saveNote() {
        const noteText = noteInput.value.trim();
        if (noteText === '') {
            return; // Don't save empty notes
        }

        let notes = getNotesFromStorage();
        notes.push(noteText);
        saveNotesToStorage(notes);

        displayNotes(notes);
        noteInput.value = ''; // Clear the input field
    }

    function displayNotes(notes) {
        notesList.innerHTML = ''; // Clear the list before re-rendering
        notes.forEach((note, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${note}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            notesList.appendChild(listItem);
        });

        // Add event listeners to all delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteNote);
        });
    }

    function deleteNote(event) {
        const indexToDelete = event.target.dataset.index;
        let notes = getNotesFromStorage();
        notes.splice(indexToDelete, 1);
        saveNotesToStorage(notes);
        displayNotes(notes);
    }

    function getNotesFromStorage() {
        const notesJSON = localStorage.getItem('notes');
        return notesJSON ? JSON.parse(notesJSON) : [];
    }

    function saveNotesToStorage(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const notes = getNotesFromStorage();
        displayNotes(notes);
    }
});