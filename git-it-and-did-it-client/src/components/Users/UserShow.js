import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'
import { setCurrentUser } from '../../redux/Auth/actions'
import { CardDeck, Container, Row, Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter, categoryNameChanger, statusNameChanger } from '../../appearance/appearanceFunctions'

class UserShow extends Component {

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('token'))
    if (this.props.users.length === 0) {
      this.props.loadUsers()
    } else {
      let { match } = this.props
      let userId = match.params.id
      this.props.setCurrentUser(userId)
      if (currentUser.id === userId) {
        return this.props.history.push('/dashboard')
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    let { match } = this.props
    let userId = match.params.id
    if (nextProps.currentUser === null && nextProps.users.length) {
      this.props.setCurrentUser(userId)
    }
  }

  render() {
    const { users, match } = this.props
    const individualUserId = parseInt((match.url.slice(7)))
    const specificUser = users[individualUserId-1]
    // const currentUser = JSON.parse(localStorage.getItem('token'))

    // if (currentUser.id === individualUserId) {
    //   return this.props.history.push('/dashboard')
    // }

    return (
      <div>
        <Image src={specificUser["profile_icon"]} id="specificUserProfileIcon" />
        <br></br>
        <h1 className="specificUserUsername">{specificUser["username"]}</h1>
        <br></br>
        <h5 className="specificUserEmail">{specificUser["email"]}</h5>
        <br></br>
        <br></br>
        <h2 className="user-section">Tasks Reported</h2>
        <br></br>
        <CardDeck>
          <Container>
            <Row id="task-row">
              {specificUser["tasks"].map(task => {
                return (
                  <Card style={{ width: '13rem' }} key={task.id} id="cardDisplay">
                    <Card.Body key={task.id} id="cardBodyDisplay">
                      <Card.Title id="cardTitle">
                        {capitalizeFirstLetter(task.title)}
                      </Card.Title>
                      <Card.Text>
                        {categoryNameChanger(task.category)}
                      </Card.Text>
                      <Card.Text>
                        {capitalizeFirstLetter(task.priority)}
                      </Card.Text>
                      <Card.Text>
                        {statusNameChanger(task.status)}
                      </Card.Text>
                      <Card.Text>
                        Reporter: {specificUser["username"]}
                      </Card.Text>
                      <Card.Text>
                        Assignee: {capitalizeFirstLetter(task.assignee)}
                      </Card.Text>
                      <Button variant="primary">
                        <Link to={`/tasks/${task.id}`} className="more-details">
                          View Details
                        </Link>
                      </Button>
                      <br></br>
                      <br></br>
                    </Card.Body>
                  </Card>
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

export default connect(mapStateToProps, { loadUsers, setCurrentUser, capitalizeFirstLetter, categoryNameChanger, statusNameChanger })(UserShow)