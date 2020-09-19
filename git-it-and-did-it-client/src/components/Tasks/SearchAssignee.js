import React, {Component} from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class SearchAssignee extends Component {

  constructor() {
    super();
    this.state = {
      assignee: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      assignee: e.target.value,
    })
  }

  render() {
    return (
      <>
      <input type="text" name="Assignee" placeholder="Assignee" onChange={e => this.handleChange(e)} />
      <Button variant="primary" id="assignee-search">
        <Link to={`/tasks/assignee/${this.state.assignee}`}>
          <FontAwesomeIcon icon={faSearch} />
          </Link>
      </Button>
      </>
    )
  }
}

export default SearchAssignee