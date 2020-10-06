import React, { Component } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.state.assignee.length) {
        this.props.history.push(`/tasks/assignee/${this.state.assignee}`)
      } else {
        this.props.history.push('/tasks')
      }
    }
  }

  render() {

    return (
      <>
        <input type="text" name="Assignee" placeholder="Assignee (Case-Sensitive)" id="assignee-search-input" onChange={e => this.handleChange(e)} onKeyPress={this.handleKeyPress} />
        <Button variant="primary" id="assignee-search-button">
          {this.state.assignee.length !== 0 ? <Link to={`/tasks/assignee/${this.state.assignee}`}>
            <FontAwesomeIcon icon={faSearch} />
          </Link> :
            <Link to='/tasks'>
              <FontAwesomeIcon icon={faSearch} />
            </Link>
          }
        </Button>
      </>
    )
  }
}

export default SearchAssignee