import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { getUsers } from "../actions/UserActions";
import PropTypes from "prop-types";

class List extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props.user;
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const username = prompt("Enter User");
            if (username) {
              this.setState((state) => ({
                users: [
                  ...state.items,
                  { id: uuid(), username, password: "password" },
                ],
              }));
            }
          }}
        >
          Add Item
        </Button>

        <ListGroup>
          <TransitionGroup className="mylist">
            {users.map(({ id, username, password }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {username}:{password}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

List.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(List);
