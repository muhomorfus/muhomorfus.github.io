let notes = []
let lastID = -1

class Note {
    defaultButtons = ["blue", "green", "yellow", "black"]
    translations = {
        blue: "Синий",
        green: "Зеленый",
        yellow: "Желтый",
        black: "Черный",
    }

    colors = {
        blue: "#5fa4d9",
        green: "#5fa743",
        yellow: "#b9bc4c",
        black: "#000000",
    }
    constructor(text, id) {
        this.buttons = this.defaultButtons
        this.text = text
        this.id = id

        this.changeColor("black")
    }

    changeColor(color) {
        this.color = color
        console.log('#', this.buttons)
        this.buttons = this.defaultButtons.filter(button => button !== color)
        console.log(this.buttons)
    }

    makeButtons() {
        let result = ""
        for (let color of this.buttons) {
            let button = `
            <button id="change-color-${this.id}-${color}" onclick="changeNoteColor(${this.id}, '${color}')" class="btn-footer ${color !== 'white' ? color : ''}">${this.translations[color]}</button>
            `
            result += button
        }

        return result
    }

    get colorCode() {
        return this.colors[this.color]
    }
}


function generateNotesHTML() {
    let result = ""

    for (let note of notes) {
        result += `
<div class="block" id="note-${note.id}" style="color: ${note.colorCode}">
    <p>
        ${note.text}
    </p>
    <div class="block-footer">
         ${note.makeButtons()}
         <button id="remove-${note.id}" onclick="deleteNote(${note.id})" class="btn-footer red right">Удалить</button>
    </div>
</div>
`
    }

    return result
}

function renderNotes() {
    if (notes.length === 0) {
        document.querySelector("#notes").innerHTML = `<h2 class="empty-text">There are no notes here...</h2>`
    } else {
        document.querySelector("#notes").innerHTML = generateNotesHTML()
    }
}

function addNote(text) {
    if (text.trim() !== '') {
        let someNote = new Note(text, ++lastID)
        notes.unshift(someNote)

        renderNotes()
    }
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id)

    renderNotes()
}

function changeNoteColor(id, color) {
    let index = notes.findIndex(note => note.id === id)
    notes[index].changeColor(color)

    renderNotes()
}

document.querySelector("#input-note-form").addEventListener("submit", (event) => {
    event.preventDefault()
    let textNote = document.querySelector("#input-note").value
    addNote(textNote)

    document.querySelector("#input-note").value = ""
})