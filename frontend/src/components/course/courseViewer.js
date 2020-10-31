import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getStudyGroups } from "../../actions/studygroup";
import PropTypes from "prop-types";

class courseViewer extends Component {

    componentDidMount() {
        //this.props;
        console.log("im in the courseVierer")
        console.log(this.props);
      }

  render() {
    return (
        <Container>
          <ListGroup>
          <TransitionGroup className="mylist">
            {this.props.courses.map(({ id ,name }) => (
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
    courses: state.courseReducer.courses
  }
}

/** 
const mapStateToProps = (state) => ({
  studyGroups: state.studygroupReducer.studyGroups,
});
*/
export default connect(mapStateToProps)(courseViewer);