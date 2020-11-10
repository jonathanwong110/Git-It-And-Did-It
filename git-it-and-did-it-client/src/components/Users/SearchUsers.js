import React from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap'

export default function SearchUsers(props) {

  return (
    <div>
      <input type="text" name="search" className="searchForm" value={props.searchEntry} placeholder="Search" onKeyPress={props.onKeyPress} onChange={e => props.handleChange(e)} />
      <Button variant="primary" id="searchUsers" type="submit" onClick={e => props.handleSubmit(e)}>
        <FontAwesomeIcon icon={faSearch}/>
      </Button>
    </div>
  );
}