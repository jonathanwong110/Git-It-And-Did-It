import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardDeck, Container, Row, Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter, categoryNameChanger, statusNameChanger } from '../../appearance/appearanceFunctions'

class Dashboard extends Component {

  render() {

    let { currentUser } = this.props
    
    return (
      // <div>Testing</div>
      <div>
        <Image src={currentUser["profile_icon"]} id="specificUserProfileIcon" />
        <br></br>
        <p className="specificUserProfileEdit"><Link to={`users/${currentUser.id}/edit`} className="specificUserProfileEdit">
          Edit Profile
        </Link></p>
        <h1 className="specificUserUsername">{currentUser["username"]}</h1>
        <br></br>
        <h5 className="specificUserEmail">{currentUser["email"]}</h5>
        <br></br>
        <br></br>
        <h2 className="user-section">Tasks Reported</h2>
        <br></br>
        <CardDeck>
          <Container>
            <Row id="task-row">
              {currentUser["tasks"].map(task => {
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
                        Reporter: {currentUser["username"]}
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
  }
}

export default connect(mapStateToProps, { capitalizeFirstLetter, categoryNameChanger, statusNameChanger })(Dashboard)