import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterListings, resetFilteredListings } from "../listings/listingsSlice";

export default function Search() {

    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClick = () => {
        if(searchTerm.trim() === ""){
            dispatch(resetFilteredListings());
        }
        else {
            dispatch(filterListings(searchTerm));
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                id="searchTerm"
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}>
            </input>
            <button className="searchButton" type="button" onClick={handleClick}>🔍</button>
        </div>
    );
}