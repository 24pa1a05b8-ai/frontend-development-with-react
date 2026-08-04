const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const noteList = document.getElementById('noteList');
const emptyState = document.getElementById('emptyState');

let notes = JSON.parse(localStorage.getItem('notes-app-notes') || '[]');
let editingIndex = null;

function escapeHTML(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderNotes() {
    if (notes.length === 0) {
        emptyState.classList.remove('d-none');
        noteList.innerHTML = '';
        return;
    }

    emptyState.classList.add('d-none');
    noteList.innerHTML = notes
        .map((note, index) => {
            const isEditing = editingIndex === index;

            return `
                <div class="col-md-6 col-lg-4">
                    <div class="card note-card shadow-sm h-100">
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <span class="badge bg-primary rounded-pill">Note ${index + 1}</span>
                                <div class="d-flex gap-2">
                                    ${isEditing ? '' : `<button class="btn btn-sm btn-outline-primary" onclick="startEdit(${index})"><i class="bi bi-pencil"></i> Edit</button>`}
                                    <button class="btn btn-sm btn-outline-danger" onclick="deleteNote(${index})"><i class="bi bi-trash"></i> Delete</button>
                                </div>
                            </div>
                            ${isEditing ? `
                                <textarea class="form-control edit-textarea mb-3" id="editTextarea">${escapeHTML(note)}</textarea>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-sm btn-success" onclick="saveEdit(${index})"><i class="bi bi-check2"></i> Save</button>
                                    <button class="btn btn-sm btn-outline-secondary" onclick="cancelEdit()"><i class="bi bi-x-lg"></i> Cancel</button>
                                </div>
                            ` : `<p class="note-text mb-3">${escapeHTML(note)}</p>`}
                        </div>
                    </div>
                </div>
            `;
        })
        .join('');
}

function saveNotes() {
    localStorage.setItem('notes-app-notes', JSON.stringify(notes));
}

function addNote(event) {
    event.preventDefault();
    const value = noteInput.value.trim();

    if (!value) {
        noteInput.focus();
        return;
    }

    notes.unshift(value);
    saveNotes();
    noteInput.value = '';
    renderNotes();
}

function startEdit(index) {
    editingIndex = index;
    renderNotes();

    setTimeout(() => {
        const textarea = document.getElementById('editTextarea');
        if (textarea) {
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
    }, 0);
}

function saveEdit(index) {
    const textarea = document.getElementById('editTextarea');
    const updatedValue = textarea ? textarea.value.trim() : '';

    if (!updatedValue) {
        return;
    }

    notes[index] = updatedValue;
    saveNotes();
    editingIndex = null;
    renderNotes();
}

function cancelEdit() {
    editingIndex = null;
    renderNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

noteForm.addEventListener('submit', addNote);
renderNotes();
