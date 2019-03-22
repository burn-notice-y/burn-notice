import React, {Component} from 'react';
import {Link as RouterLink } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import Link from '@material-ui/core/Link'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CardHeader from '@material-ui/core/CardHeader';
import Person from '@material-ui/icons/Person';
import PersonOutline from '@material-ui/icons/PersonOutline';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Assignment from '@material-ui/icons/Assignment';
import LocationCity from '@material-ui/icons/LocationCity';
import Description from '@material-ui/icons/Description';
import PropTypes from "prop-types";

class AdminHeader extends Component {
    state = {
        redirect: false
    };

    determineIcon = text => {
        switch (text) {
            case "Vacancies":
                return <Description/>;
            case "Create Vacancy":
                return <LibraryAdd/>;
            case "Review Requests":
                return <AssignmentTurnedIn/>;
            case "Assignment History":
                return <Assignment/>;
            case "Station List":
                return <LocationCity/>;
            default:
                return;
        }
    };



    render() {
        const navItems = (
            <div className={"nav-items-test"}>
                <CardHeader title={"Burn Notice"} subheader={`Welcome, Chief ${this.props.user.lastName}`}/>
                <List>
                    <ListSubheader>Actions</ListSubheader>
                    {[['Vacancies', '/vacancy/show'], ['Create Vacancy', `/vacancy/create`], ['Review Requests', '/request'], [`Assignment History`, `/assignments/show`], ['Station List', '/stations/all']].map((text, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon>{text[0] === "Ads" ?
                                    <LibraryBooks/> : this.determineIcon(text[0])}</ListItemIcon>
                                <Link component={RouterLink} to={text[1]}><ListItemText primary={text[0]}/></Link>
                            </ListItem>
                        )
                    )}
                </List>
                <Divider/>
                <List>
                    <ListSubheader>Personal</ListSubheader>
                    <ListItem button>
                        <ListItemIcon><Person/></ListItemIcon>
                        <Link component={RouterLink} to={"/user/profile"}><ListItemText primary={"Profile"}/></Link>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon><PersonOutline/></ListItemIcon>
                        <div className={"close-div"}
                             tabIndex={0}
                             role="button"
                             onClick={this.props.logout}>
                            <ListItemText primary={"Logout"}/></div>
                    </ListItem>
                </List>
            </div>
        );


        return (
            <Drawer variant={"temporary"} open={this.props.menuShown} onClose={this.props.closeMenu.bind(this)}>
                <div className={"close-div"}
                     tabIndex={0}
                     role="button"
                     onClick={this.props.closeMenu}
                     onKeyDown={this.props.closeMenu}
                     onScrollCapture={this.props.closeMenu}>
                    {navItems}
                </div>
            </Drawer>
        )
    }
}

AdminHeader.propTypes = {
    closeMenu: PropTypes.any.isRequired
};

const mapStateToProps = state => {
    return {
        menuShown: state.menuShown,
        user: state.user
    }
};
export default connect(mapStateToProps, actions)(AdminHeader);



