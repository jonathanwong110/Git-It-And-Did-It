import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'
import { CardDeck, Container, Col, Row, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class UserShow extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { users, match } = this.props
    const individualUserId = (match.url.slice(-1)[0] - 1)
    const specificUser = users[individualUserId]

    if (users.length === 0) {
      return <div>There are no tasks</div>
    }

    return (
      <div>
        <h1>{specificUser["username"]}</h1>
        {specificUser["email"]}
        <br></br>
        <br></br>
        <h2>Tasks Created</h2>
        <CardDeck>
          <Container>
            <Row>
              {specificUser["tasks"].map(task => {
                console.log(task)
                return (
                  <Col key={task.id}>
                    <Card style={{ width: '13rem', margin: '20px' }} key={task.id}>
                      <Card.Body key={task.id}>
                        <Card.Title>
                          {this.capitalizeFirstLetter(task.title)}
                        </Card.Title>
                        <Card.Text>
                          {specificUser["username"]}
                        </Card.Text>
                        <Card.Text>
                          {this.capitalizeFirstLetter(task.category)}
                        </Card.Text>
                        <Card.Text>
                          {this.capitalizeFirstLetter(task.priority)}
                        </Card.Text>
                        <Card.Text>
                          {this.capitalizeFirstLetter(task.status)}
                        </Card.Text>
                        <Button variant="primary"><Link to={`/tasks/${task.id}`} className="more-details">View Details</Link></Button>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </Container>
        </CardDeck>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    users: state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(loadUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)