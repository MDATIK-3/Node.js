export const getAllNotes = async (req, res) => {
    res.status(200).json({ message: "You just fetched the notes" });
}

export const createNote = (req, res) => {
    res.status(201).json({ message: "Note created successfully!" });
}

export const updateNote = (req, res) => {
    res.status(200).json({ message: "You just updated a note" });
}

export const deleteNote = (req, res) => {
    res.status(200).json({ message: "Note deleted successfully!" });
}
