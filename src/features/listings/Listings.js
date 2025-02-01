import React, { useEffect } from "react";
import Listing from "../../components/Listing";
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "./listingsSlice";

export default function Listings() {

    const dispatch = useDispatch();
    const listings = useSelector((state) => state.listings.filteredListings);
    const status = useSelector((state) => state.listings.status);
    const error = useSelector((state) => state.listings.error);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchListings({ subreddit: 'popular', limit: 10 }));
        }
    }, [dispatch, status]);

    const handleRetry = () => {
        dispatch(fetchListings({ subreddit: "popular", limit: 10 }));
    };

    return (
        <div className="listings-container">
            {status === "loading" && <div>Loading...</div>}
            {status === "failed" && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={handleRetry}>Try Again</button>
                </div>
            )}
            {status === "succeeded" && (
                <ul>
                    {listings.map(listing => (
                        <li className="container listing-container" key={listing.data.id}>
                            <Listing listingData={listing.data} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}