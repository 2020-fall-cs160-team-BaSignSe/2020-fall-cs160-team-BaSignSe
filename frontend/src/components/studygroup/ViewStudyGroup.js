import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getStudyGroups } from "../../actions/studygroup";
import PropTypes from "prop-types";

class ViewStudyGroup extends Component {

  static propTypes = {
    getStudyGroups: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const query = this.props.location.query || {courseId:'',courseCode:''};
    let courseId = query.courseId;
    let courseCode = query.courseCode;
    this.props.getStudyGroups(courseId,courseCode);
    console.log(this.props);
  }

  render() {
    let studyGroups= this.props.studyGroups.docs;
    if(studyGroups == undefined)
    {
        studyGroups = [];
    }
    return (
        <Container>
        <h1 style={{ color: 'black', textAlign: 'center', fontSize: '30px'}}>Study Groups:</h1>
        <div className="vsg-table">
        <Table bordered>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Repeating</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>
          <ListGroup>
          <TransitionGroup className="mylist">
            {studyGroups.map(({ id, groupName }) => (
                <ListGroupItem>
                  {groupName}
                </ListGroupItem>
            ))}
          </TransitionGroup>
        </ListGroup>
          </td>
          <td>
          <ListGroup>
          <TransitionGroup className="mylist">
            {studyGroups.map(({ id, startDate }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {startDate}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
          </td>
          <td>
          <ListGroup>
          <TransitionGroup className="mylist">
            {studyGroups.map(({ id, endDate }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {endDate}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
          </td>
          <td>
          <ListGroup>
          <TransitionGroup className="mylist">
            {studyGroups.map(({ id, repeating }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {repeating}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
          </td>
          <td>
          <ListGroup>
          <TransitionGroup className="mylist">
            {studyGroups.map(({ id, description }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {description}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
          </td>
        </tr>
      </tbody>
      </Table>
      </div> 
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log("State");
  console.log(state);
  return {
    studyGroups: state.studygroupReducer.studyGroups
  }
}

/** 
const mapStateToProps = (state) => ({
  studyGroups: state.studygroupReducer.studyGroups,
});
*/
export default connect(mapStateToProps, { getStudyGroups })(ViewStudyGroup);