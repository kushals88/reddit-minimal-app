import React, { useEffect, useState } from "react";
import { getSubreddits } from "../../utils/requestUtil";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, setSelectedSubreddit } from "../listings/listingsSlice";


export default function Subreddits() {

    const [subreddits, setSubreddits] = useState([]);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector((state) => state.listings.selectedSubreddit);

    const handleSubredditClick = (subreddit) => {
        dispatch(setSelectedSubreddit(subreddit));
        dispatch(fetchListings({ subreddit, limit: 10 }));
    }

    useEffect(() => {
        const fetchSubReddits = async () => {
            try {
                const response = await getSubreddits("popular");
                setSubreddits(response.data.children);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchSubReddits();
    }, [])

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container subreddit-container">
            <h2>SubReddits</h2>
            <ul>
                {subreddits.map((subreddit) => (
                    <li className="subreddit-list-container" key={subreddit.data.id}>

                        <button
                            className={selectedSubreddit === subreddit.data.display_name ? "selected" : ""}
                            onClick={() => handleSubredditClick(subreddit.data.display_name)}>
                            <img src={subreddit.data.icon_img} alt="" />
                            {subreddit.data.display_name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}