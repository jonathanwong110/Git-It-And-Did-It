import React from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchTask(props) {

  const searchIcon = <FontAwesomeIcon icon={faSearch} />

  return (
    <div className="searchForm">
      <input
        type="text"
        name="search"
        value={props.searchEntry}
        placeholder="Search for a Task by Title"
        onKeyPress={props.onKeyPress}
        onChange={e => props.handleChange(e)} />
      <button id="search-tasks" type="submit" onClick={e => props.handleSubmit(e)}>
        {searchIcon}
      </button>
    </div>
  );
}