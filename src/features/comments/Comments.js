import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, resetStatus } from "./commentsSlice";
import Comment from "../../components/Comment";

export default function Comments({ subreddit, listingId }) {

    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.commentsByListing[listingId] || []);
    const status = useSelector((state) => state.comments.statusByListing[listingId] || "idle");
    const error = useSelector((state) => state.comments.errorByListing[listingId] || null);

    useEffect(() => {
        if (status !== "loading" && status !== "succeeded") {
            dispatch(resetStatus({ listingId }));
            dispatch(fetchComments({ subreddit, listingId }));
        }
    }, [dispatch, subreddit, listingId, status]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <ul>
            {comments.map((comment) => (
                <li key={comment.data.id}>
                    <Comment commentData={comment.data} />
                </li>
            ))}
        </ul>
    )
};