import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Comments({ userId, productId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const fetchComments = () => {
    axios.get(`/api/comments/${productId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const submitComment = () => {
    if (!commentText) return;
    axios.post('/api/comments', { userId, productId, comment: commentText, rating })
      .then(res => {
        setMessage('Comment added!');
        setCommentText('');
        setRating(5);
        fetchComments();
        setTimeout(() => setMessage(''), 2000);
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to add comment');
      });
  };

  return (
    <div>
      <h3>Comments</h3>
      {message && <p>{message}</p>}
      <div>
        <textarea
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          rows={3}
          placeholder="Write your comment"
        />
        <br />
        <label>Rating: </label>
        <select value={rating} onChange={e => setRating(parseInt(e.target.value))}>
          {[1,2,3,4,5].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <br />
        <button onClick={submitComment}>Submit</button>
      </div>

      <ul>
        {comments.map(c => (
          <li key={c._id}>
            <b>{c.userId?.name || 'Anonymous'}</b> ({c.rating}⭐): {c.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
