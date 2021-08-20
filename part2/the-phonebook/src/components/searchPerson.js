import React, { useState } from 'react'

const SearchPerson = ({newSearch, handleSearchChange}) => {
    return (
        <form>
        filter shown with
          <input
            value={newSearch}
            onChange={handleSearchChange}>
          </input>
        </form>
    )
}

export default SearchPerson