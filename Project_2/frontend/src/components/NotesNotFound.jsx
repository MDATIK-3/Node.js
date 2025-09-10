import { FileTextIcon } from "lucide-react";

function NotesNotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileTextIcon className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Notes Found
            </h2>
            <p className="text-gray-500">
                You don't have any notes yet. Click the "Create Note" button to add your first note.
            </p>
        </div>
    );
}

export default NotesNotFound;
