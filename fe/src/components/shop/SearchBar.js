import React, { useState } from "react"

const SearchBar = ({ setSearch }) => {



    return (
        <div style={{ border: '1px solid black' }}>
            <input
                type="text"
                placeholder="제품을 검색하세여"
                className="searchBar"
                name="searchText"
                onChange={(e) => setSearch(e.target.value)}
            />
            <br />


            <h4>SearchBar부분</h4>
        </div >
    )
}

export default SearchBar