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

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.history.push(`/tasks/assignee/${this.state.assignee}`)
    }
  }

  render() {
    return (
      <>
      <input type="text" name="Assignee" placeholder="Assignee (Case-Sensitive)" id="assignee-search-input" onChange={e => this.handleChange(e)} onKeyPress={this.handleKeyPress} />
      <Button variant="primary" id="assignee-search-button">
        <Link to={`/tasks/assignee/${this.state.assignee}`}>
          <FontAwesomeIcon icon={faSearch} />
          </Link>
      </Button>
      </>
    )
  }
}

export default SearchAssignee