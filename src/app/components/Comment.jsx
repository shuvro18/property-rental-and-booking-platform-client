"use client";


import { FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import { authClient } from "../lib/auth-client";
import { postComment } from "../lib/action";




const Comment = ({ paramsId }) => {
    const propertyId = paramsId

    const { data: session } = authClient.useSession();
    const user = session?.user;





    // submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const commentData = Object.fromEntries(formData.entries());
        if (!commentData.comment.trim()) return;
        console.log(commentData)
        const date = new Date().toISOString();
        const finalData = {
            comments: commentData.comment.trim(),
            name: user?.name,
            image: user?.image,
            propertyId,
            date

        }
        const setComment = await postComment(finalData)
        
        window.location.reload();

    };
    return (
        <div className="mt-12 bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700/50 transition-colors">
            <div className="flex items-center gap-2 mb-6">
                <FiMessageSquare className="text-indigo-600 dark:text-indigo-400" size={24} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Comments
                </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">

                <div>
                    <textarea
                        rows="3"
                        placeholder="Write your comment about this property..."
                        name="comment"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <FiSend size={16} />
                    Post Comment
                </button>
            </form>

            {/* Comments List */}
            
        </div>
    );
};

export default Comment;