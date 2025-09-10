import { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound"

function HomePage() {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setNotes(res?.data || []);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Fetching error:", error);

                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && (
                    <div className="text-center text-primary py-10">Loading Notes...</div>
                )}

                {isRateLimited && <RateLimitedUI />}

                {notes.length===0 && !isRateLimited && <NotesNotFound/>}
                
                {!loading && !isRateLimited && notes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}                
            </div>
        </div>
    );
}

export default HomePage;
