import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyIdeas = () => {
  const loadedIdeas = useLoaderData();
  const [myIdeas, setMyIdeas] = useState(loadedIdeas || []);
  const axiosSecure = useAxiosSecure();

  const [activeIdeaForEdit, setActiveIdeaForEdit] = useState(null);
  const [activeIdeaForDelete, setActiveIdeaForDelete] = useState(null);

  const editDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);

  // Open modals when state is set
  useEffect(() => {
    if (activeIdeaForEdit && editDialogRef.current) {
      editDialogRef.current.showModal();
    }
  }, [activeIdeaForEdit]);

  useEffect(() => {
    if (activeIdeaForDelete && deleteDialogRef.current) {
      deleteDialogRef.current.showModal();
    }
  }, [activeIdeaForDelete]);

  // Handle Backdrop / Light-dismiss fallback click listeners for dialogs
  const handleBackdropClick = (e, dialogRef, setter) => {
    if (e.target === dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      const isOutside = (
        e.clientY < rect.top ||
        e.clientY > rect.bottom ||
        e.clientX < rect.left ||
        e.clientX > rect.right
      );
      if (isOutside) {
        dialogRef.current.close();
        setter(null);
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!activeIdeaForEdit) return;

    const form = e.target;
    const title = form.title.value.trim();
    const shortDescription = form.shortDescription.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value;
    const tagsString = form.tags.value.trim();
    const image = form.image.value.trim();
    const budget = form.budget.value.trim();
    const targetAudience = form.targetAudience.value.trim();
    const problemStatement = form.problemStatement.value.trim();
    const proposedSolution = form.proposedSolution.value.trim();

    if (!title || !shortDescription || !description || !category || !image || !budget || !targetAudience || !problemStatement || !proposedSolution) {
      return toast.error("Please fill in all required fields");
    }

    const tags = tagsString
      ? tagsString.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
      : [];

    const updatedDoc = {
      title,
      shortDescription,
      description,
      category,
      tags,
      image,
      budget,
      targetAudience,
      problemStatement,
      proposedSolution,
    };

    try {
      const res = await axiosSecure.put(`/ideas/${activeIdeaForEdit._id}`, updatedDoc);
      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        toast.success("Idea Updated Successfully!");
        setMyIdeas(
          myIdeas.map((idea) =>
            idea._id === activeIdeaForEdit._id ? { ...idea, ...updatedDoc } : idea
          )
        );
        editDialogRef.current.close();
        setActiveIdeaForEdit(null);
      } else {
        toast.error("No changes detected");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update idea");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!activeIdeaForDelete) return;

    try {
      const res = await axiosSecure.delete(`/ideas/${activeIdeaForDelete._id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Idea Deleted Successfully!");
        setMyIdeas(myIdeas.filter((idea) => idea._id !== activeIdeaForDelete._id));
        deleteDialogRef.current.close();
        setActiveIdeaForDelete(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete idea");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-amber-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-amber-400 mb-4">
            My Startup Showcase
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
            Manage your submitted startup ideas, update parameters, or monitor discussions with potential investors.
          </p>
        </div>

        {myIdeas.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[40vh] text-center p-8 bg-white dark:bg-gray-900 rounded-3xl border border-violet-100 dark:border-gray-800 shadow-sm max-w-lg mx-auto">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              No Ideas Created Yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              You haven't posted any startup ideas to the vault. Ready to showcase your vision to the world?
            </p>
            <Link
              to="/add-idea"
              className="mt-6 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-lg shadow-violet-500/20"
            >
              Post an Idea Now
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myIdeas.map((idea) => (
              <div
                key={idea._id}
                className="group flex flex-col h-full bg-white dark:bg-gray-900/60 border border-violet-100 dark:border-gray-800/80 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-sm text-xs font-bold text-violet-700 dark:text-violet-400 px-3 py-1.5 rounded-full border border-violet-100 dark:border-gray-800">
                    {idea.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Budget: {idea.budget}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                      {idea.shortDescription || idea.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 border-t border-gray-100 dark:border-gray-800/60 pt-4">
                    <Link
                      to={`/ideas/${idea._id}`}
                      className="w-full inline-flex justify-center items-center bg-violet-50 dark:bg-violet-950/20 hover:bg-violet-100 dark:hover:bg-violet-950/40 text-violet-700 dark:text-violet-400 font-bold py-3 rounded-xl transition duration-200 text-sm"
                    >
                      View Details & Comments
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setActiveIdeaForEdit(idea);
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl transition duration-200 text-sm"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => {
                          setActiveIdeaForDelete(idea);
                        }}
                        className="bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white font-bold py-2.5 rounded-xl transition duration-200 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= EDIT DIALOG MODAL ================= */}
      <dialog
        ref={editDialogRef}
        closedby="any"
        onClick={(e) => handleBackdropClick(e, editDialogRef, setActiveIdeaForEdit)}
        className="fixed inset-0 p-0 rounded-3xl border border-violet-100 dark:border-gray-800/80 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full max-w-2xl shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm overflow-hidden"
      >
        {activeIdeaForEdit && (
          <div className="flex flex-col h-full max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800/85 flex justify-between items-center bg-violet-50/50 dark:bg-violet-950/10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Update Startup Idea
              </h3>
              <button
                onClick={() => {
                  editDialogRef.current.close();
                  setActiveIdeaForEdit(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Modal Form Scroll Area */}
            <form onSubmit={handleUpdateSubmit} className="flex-grow overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Idea Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={activeIdeaForEdit.title}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Category *</label>
                  <select
                    name="category"
                    required
                    defaultValue={activeIdeaForEdit.category}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Finance">Finance</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Estimated Budget *</label>
                  <input
                    type="text"
                    name="budget"
                    required
                    defaultValue={activeIdeaForEdit.budget}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Short Description *</label>
                <input
                  type="text"
                  name="shortDescription"
                  required
                  maxLength={150}
                  defaultValue={activeIdeaForEdit.shortDescription}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Detailed Description *</label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  defaultValue={activeIdeaForEdit.description}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Target Audience *</label>
                  <input
                    type="text"
                    name="targetAudience"
                    required
                    defaultValue={activeIdeaForEdit.targetAudience}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    defaultValue={activeIdeaForEdit.tags ? activeIdeaForEdit.tags.join(", ") : ""}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Problem Statement *</label>
                  <textarea
                    name="problemStatement"
                    required
                    rows="2"
                    defaultValue={activeIdeaForEdit.problemStatement}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Proposed Solution *</label>
                  <textarea
                    name="proposedSolution"
                    required
                    rows="2"
                    defaultValue={activeIdeaForEdit.proposedSolution}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">Image URL *</label>
                <input
                  type="url"
                  name="image"
                  required
                  defaultValue={activeIdeaForEdit.image}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800/80">
                <button
                  type="button"
                  onClick={() => {
                    editDialogRef.current.close();
                    setActiveIdeaForEdit(null);
                  }}
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-semibold px-5 py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-bold px-6 py-2.5 rounded-xl transition shadow shadow-violet-500/10"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </dialog>

      {/* ================= DELETE CONFIRMATION DIALOG MODAL ================= */}
      <dialog
        ref={deleteDialogRef}
        closedby="any"
        onClick={(e) => handleBackdropClick(e, deleteDialogRef, setActiveIdeaForDelete)}
        className="fixed inset-0 p-0 rounded-3xl border border-violet-100 dark:border-gray-800/80 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full max-w-md shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm overflow-hidden"
      >
        {activeIdeaForDelete && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto">
                ⚠️
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Delete Startup Idea?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete <span className="font-bold text-gray-800 dark:text-white">"{activeIdeaForDelete.title}"</span>? This action is permanent and will remove all associated discussions.
              </p>
            </div>

            <div className="flex grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  deleteDialogRef.current.close();
                  setActiveIdeaForDelete(null);
                }}
                className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl transition"
              >
                No, Keep it
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-500/10"
              >
                Yes, Delete Idea
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default MyIdeas;
