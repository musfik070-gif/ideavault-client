import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

const IdeaDetails = () => {
  const idea = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://ideavault-server-topaz.vercel.app";
      const res = await axios.get(`${apiBase}/ideas/${idea._id}/comments`);
      setComments(res.data);
      setCommentsLoading(false);
    } catch (err) {
      console.error("Failed to load comments:", err);
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (idea?._id) {
      fetchComments();
    }
  }, [idea?._id]);

  const handleInterest = async () => {
    if (!user) {
      return toast.error("Please login first");
    }

    if (user.email === idea.userEmail) {
      return toast.error("You cannot express interest in your own idea");
    }

    const interactionData = {
      ideaId: idea._id,
      ideaTitle: idea.title,
      ideaImage: idea.image,
      ideaCategory: idea.category,
      ideaOwnerEmail: idea.userEmail,
      userName: user.name,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/interested", interactionData);

      if (res.data.insertedId) {
        toast.success("Added to your Interested List!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to add interest");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("Please sign in to comment");
    }

    const form = e.target;
    const commentText = form.commentText.value.trim();

    if (!commentText) {
      return toast.error("Comment cannot be empty");
    }

    try {
      const res = await axiosSecure.post("/comments", {
        ideaId: idea._id,
        ideaTitle: idea.title,
        commentText,
      });

      if (res.data.success) {
        toast.success("Comment added!");
        form.reset();
        // Attach the ID from insertion result
        const newCommentObj = {
          ...res.data.comment,
          _id: res.data.result.insertedId,
        };
        setComments([newCommentObj, ...comments]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to post comment");
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.commentText);
  };

  const handleSaveEdit = async (commentId) => {
    if (!editText.trim()) {
      return toast.error("Comment text cannot be empty");
    }

    try {
      const res = await axiosSecure.put(`/comments/${commentId}`, {
        commentText: editText.trim(),
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Comment updated!");
        setComments(
          comments.map((c) =>
            c._id === commentId ? { ...c, commentText: editText.trim() } : c
          )
        );
        setEditingCommentId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axiosSecure.delete(`/comments/${commentId}`);
      if (res.data.deletedCount > 0) {
        toast.success("Comment deleted");
        setComments(comments.filter((c) => c._id !== commentId));
        setDeleteConfirmId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    }
  };

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Idea not found</h2>
          <button onClick={() => navigate("/ideas")} className="bg-violet-600 text-white px-6 py-2 rounded-xl">
            Back to Ideas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb / Back button */}
        <button
          onClick={() => navigate("/ideas")}
          className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 hover:underline font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Ideas Vault
        </button>

        {/* Hero Section Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-violet-100/50 dark:border-gray-800/50 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="md:col-span-6 relative h-[300px] md:h-full min-h-[300px]">
            <img
              src={idea.image}
              alt={idea.title}
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>

          <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 text-xs font-bold px-3 py-1.5 rounded-full border border-violet-200/50 dark:border-violet-900/30">
                  {idea.category}
                </span>
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  Budget: {idea.budget}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {idea.title}
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-4 text-base font-medium leading-relaxed italic">
                "{idea.shortDescription || "No short description provided."}"
              </p>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800/60 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-amber-500 text-white flex items-center justify-center font-bold text-lg uppercase shadow">
                  {idea.userName ? idea.userName[0] : "F"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {idea.userName || "Startup Founder"}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {idea.userEmail}
                  </p>
                </div>
              </div>

              {user?.email !== idea.userEmail && (
                <button
                  onClick={handleInterest}
                  className="bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-bold px-6 py-3 rounded-xl transition duration-300 transform active:scale-95 shadow-lg shadow-violet-500/20"
                >
                  Mark Interested
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Idea Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target Audience Card */}
          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-violet-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-3 flex items-center gap-2">
              🎯 Target Audience
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
              {idea.targetAudience || "Not specified."}
            </p>
          </div>

          {/* Problem Statement Card */}
          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-violet-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm md:col-span-1 border-l-4 border-l-red-500">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-500 mb-3 flex items-center gap-2">
              ⚠️ The Problem
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {idea.problemStatement || "No problem statement specified."}
            </p>
          </div>

          {/* Proposed Solution Card */}
          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-violet-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm md:col-span-1 border-l-4 border-l-green-500">
            <h3 className="text-sm font-bold uppercase tracking-wider text-green-500 mb-3 flex items-center gap-2">
              💡 Proposed Solution
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {idea.proposedSolution || "No solution statement specified."}
            </p>
          </div>

          {/* Detailed Description */}
          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-violet-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm md:col-span-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Detailed Concept
            </h3>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {idea.description}
            </p>

            {idea.tags && idea.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/80">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Project Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag, idx) => (
                    <span key={idx} className="bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs px-3 py-1.5 rounded-lg border border-violet-100 dark:border-violet-900/20 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-violet-100 dark:border-gray-800 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span>Discussions & Feedback</span>
            <span className="text-xs bg-violet-600 text-white font-bold px-2.5 py-1 rounded-full">
              {comments.length}
            </span>
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="space-y-4">
            <textarea
              name="commentText"
              rows="3"
              required
              placeholder={user ? "Write your feedback, questions, or suggestion for this startup..." : "Sign in to leave feedback..."}
              disabled={!user}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200 disabled:opacity-50"
            ></textarea>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!user}
                className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white font-semibold px-6 py-2.5 rounded-xl transition duration-200 transform active:scale-95 shadow-md shadow-violet-500/10"
              >
                Post Comment
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4 border-t border-gray-100 dark:border-gray-800/80 pt-6">
            {commentsLoading ? (
              <div className="text-center py-4">
                <span className="loading loading-spinner text-violet-600"></span>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No feedback posted yet. Be the first to start the discussion!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="p-5 rounded-2xl bg-white dark:bg-gray-800/40 border border-violet-100/50 dark:border-gray-800/50 space-y-3"
                  >
                    {/* Comment Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={comment.userPhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80"}
                          alt={comment.userName}
                          className="w-9 h-9 rounded-full object-cover border border-violet-100 dark:border-gray-800"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            {comment.userName}
                            {comment.userEmail === idea.userEmail && (
                              <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-[10px] px-1.5 py-0.5 rounded font-extrabold uppercase">
                                Founder
                              </span>
                            )}
                          </h4>
                          <p className="text-[10px] text-gray-400">
                            {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ""}
                          </p>
                        </div>
                      </div>

                      {/* Comment Actions (Own Comment) */}
                      {user && user.email === comment.userEmail && (
                        <div className="flex items-center space-x-2 text-xs">
                          {editingCommentId !== comment._id && (
                            <>
                              <button
                                onClick={() => handleStartEdit(comment)}
                                className="text-violet-600 dark:text-violet-400 hover:underline font-semibold"
                              >
                                Edit
                              </button>
                              <span className="text-gray-300">|</span>
                              {deleteConfirmId === comment._id ? (
                                <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded border border-red-200/50 dark:border-red-900/30">
                                  <span className="text-red-500 font-bold">Sure?</span>
                                  <button
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="text-red-600 hover:text-red-700 font-extrabold"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="text-gray-500 hover:text-gray-600 font-semibold"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(comment._id)}
                                  className="text-red-500 hover:underline font-semibold"
                                >
                                  Delete
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Comment Body */}
                    {editingCommentId === comment._id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows="2"
                          className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingCommentId(null)}
                            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-lg transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEdit(comment._id)}
                            className="bg-violet-600 hover:bg-violet-700 text-white text-xs px-3 py-1.5 rounded-lg transition"
                          >
                            Save Change
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed pl-12">
                        {comment.commentText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;
