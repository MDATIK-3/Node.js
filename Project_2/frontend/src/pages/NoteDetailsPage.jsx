import { ArrowLeftIcon } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router"
import api from "../lib/axios"

function UpdateNotePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setTitle(res.data.title)
        setContent(res.data.content)
      } catch (err) {
        console.error("Error fetching note:", err)
        toast.error("Failed to load note")
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return
    }
    setSaving(true)
    try {
      await api.put(`/notes/${id}`, { title, content })
      toast.success("Note updated successfully!")
      navigate("/")
    } catch (err) {
      console.error("Error updating note:", err)
      toast.error("Failed to update note")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

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
              <h2 className="text-2xl font-semibold mb-6">Update Note</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`btn btn-primary ${saving ? "loading" : ""}`}
                    disabled={saving}
                  >
                    {saving ? "Updating..." : "Update Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateNotePage
