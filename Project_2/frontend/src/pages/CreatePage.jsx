import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast",
          {
            duration: 4000
          }
        )
      }
      else toast.error("Failed to create note");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost flex items-center gap-2 mb-6">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Notes
          </Link>

          <div className="card shadow-md rounded-xl">
            <div className="card-body p-6">
              <h2 className="text-2xl font-semibold mb-6">Create New Note</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter note title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <textarea
                    placeholder="Enter note content"
                    className="textarea textarea-bordered w-full"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
