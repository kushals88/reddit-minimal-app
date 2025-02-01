import React from "react";
import { timeAgo } from "../utils/commonUtils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Comment({commentData}){
    
    const {body, author, created_utc} = commentData;

    return (
        <div className="comment-container">
            <div className="comment-metadata">
                <p className="user-details">{author}</p>
                <p className="comment-time">{timeAgo(created_utc)}</p>
            </div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
    );
}