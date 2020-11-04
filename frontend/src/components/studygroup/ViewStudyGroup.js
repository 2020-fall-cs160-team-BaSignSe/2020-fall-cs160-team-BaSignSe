import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
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
          <ListGroup>
          <TransitionGroup className="mylist">
            {studyGroups.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
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