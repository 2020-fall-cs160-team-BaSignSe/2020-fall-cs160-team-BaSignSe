import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getStudyGroups } from "../../actions/studygroup";
import PropTypes from "prop-types";

class ViewStudyGroup extends Component {

  static propTypes = {
    getStudyGroups: PropTypes.func.isRequired,
    studyGroups: PropTypes.array.isRequired,
  };


  componentDidMount() {
    this.props.getStudyGroups();
    console.log(this.props);
  }

  render() {
    return (
        <Container>
          <ListGroup>
          <TransitionGroup className="mylist">
            {this.props.studyGroups.map(({ id, groupName }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {groupName}
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