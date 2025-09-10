import { PenSquareIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import formatDate from './formatDate.js'
import toast from "react-hot-toast";
import api from "../lib/axios.js"


function NoteCard({ note, setNotes }) {

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this note?"))
            return;
        try {
            await api.delete(`/notes/${id}`)
            setNotes(prev => prev.filter((note) => note._id !== id))
            toast.success("Note Delete Successfully!")
        } catch (error) {
            console.log(error)
            toast.error("Note Delete Failed!.")
        }
    }

    return (
        <Link to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
        >
            <div className="card-body">
                <h2 className="text-xl font-semibold text-gray-100 mb-2">{note.title}</h2>
                <p className="text-white mb-4">{note.content}</p>
                <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">
                        {formatDate(note.createdAt)}
                    </p>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error"
                            onClick={(e) => { handleDelete(e, note._id) }}
                        >
                            <TrashIcon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

        </Link>
    );
}

export default NoteCard;
