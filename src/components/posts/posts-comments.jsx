const Comments = ({ handleAddComment, setComment, comments, comment }) => {
  return (
    <div className="mt-5">
      <h1>Comments</h1>
      <form className="flex flex-col">
        <textarea
          className="textarea"
          name="content"
          id="content"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="btn btn-primary w-24 mt-4"
          onClick={handleAddComment}
        >
          Add
        </button>
      </form>

      {comments.map((comment) => {
        return (
          <div className="chat chat-start mt-5 card bg-base-200 p-4" key={comment.id}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              {comment.userId}
              <time className="text-xs opacity-50">
                {new Date(comment.createdAt).toLocaleTimeString()}
              </time>
            </div>
            <div className="chat-bubble">{comment.content}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
