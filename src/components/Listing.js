import React, { useState } from "react";
import { timeAgo, numFormatter } from "../utils/commonUtils";
import Comments from "../features/comments/Comments";
import {ReactComponent as UpvoteIcon} from "./icons/upvote.svg";
import {ReactComponent as DownvoteIcon} from "./icons/downvote.svg";
import {ReactComponent as CommentIcon} from "./icons/comment.svg";

export default function Listing({ listingData }) {
    const { id, subreddit, title, ups, author, num_comments, created, post_hint, url } = listingData;
    const [showComments, setShowComments] = useState(false);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const handleCommentClick = () => setShowComments(!showComments);
    const handleUpvote = () => {
        setUpvoted (!upvoted);
        if(downvoted){
            setDownvoted(false);
        }
    };
    const handleDownvote = () => {
        setDownvoted (!downvoted);
        if(upvoted){
            setUpvoted(false);
        }
    };    

    return (
        <>
            <div className="votes-container">
                <button id="upvote" onClick={handleUpvote} className={upvoted ? 'active': ''}>
                    <UpvoteIcon />
                </button>
                <p className={`vote-count ${upvoted ? 'upvoted' : ''} ${downvoted ? 'downvoted' : ''} `}>{numFormatter(ups)}</p>
                <button id="downvote" onClick={handleDownvote} className={downvoted ? 'active': ''}>
                    <DownvoteIcon />    
                </button>
            </div>
            <div className="post-container">
                <div className="post">  
                    <p>{title}</p>
                    {post_hint === 'image' && <img src={url} alt=""/>}
                </div>
                <div className="post-metadata-container">
                    <div className="user-details">
                        <p>{author}</p>
                    </div>
                    <div className="post-time">
                        <p>{timeAgo(created)}</p>
                    </div>
                    <div className="comment-link"> 
                        <button className={`comments-button ${showComments ? 'active' : ''}`} onClick={handleCommentClick}>
                            <CommentIcon />
                        </button>
                        <p>{numFormatter(num_comments)}</p>
                    </div>
                </div>
                {showComments && (<div className="comments-container" >
                    <Comments subreddit={subreddit} listingId={id} />
                </div>)}
            </div>

        </>
    );
}