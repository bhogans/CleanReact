import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Users';
import { bindActionCreators } from 'redux';

class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLinkShowing: true
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleNavLink() {
        //this.props.changeUser();
        this.setState = { isLinkShowing: true };
        if (this.props.user.userRole > -1) {
            this.setState({
                isLinkShowing: !this.state.isLinkShowing
            });
        }
    }

    render() {
        //const canSee = this.props.auth.currentUser.roles.indexOf("submitter");
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
                    <Container>
                        <NavbarBrand tag={Link} to="/">KCIC Recruiting Challenge</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    {this.state.isLinkShowing ? <NavLink tag={Link} className="text-dark" to="/queue">Approval Queue</NavLink> : null}
                                </NavItem>
                                {/*<NavItem>
                  <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                </NavItem>*/}
                                <NavItem>
                                    <NavLink>
                                        <select onChange={this.props.changeUser} value={this.state.value}>
                                            {this.props.users.map((user) => {
                                                return <option key={user.id} value={user.id}>{user.username}</option>;
                                            })}
                                        </select>
                                    </NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>

        );


    }
}

//TODO: Move this to the app level?  or as a provider such that all child components can access the portion of state
export default connect(
    state => state.auth,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(NavMenu);
