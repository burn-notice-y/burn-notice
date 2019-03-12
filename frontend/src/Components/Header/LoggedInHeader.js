import React, { Component } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import Link from '@material-ui/core/Link'
import axios from 'axios';
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
import CompareArrows from '@material-ui/icons/CompareArrows';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import ContactMail from '@material-ui/icons/ContactMail';
import Assignment from '@material-ui/icons/Assignment';
import Forum from '@material-ui/icons/Forum';

class LoggedInMenu extends Component{
    state = {
        redirect: false
    };

    determineIcon = text => {
        switch (text) {
            case "Vacancies":
                return <Forum/>;
            case "Create Report":
                return <LibraryAdd/>;
            case "Assignment History":
                return <Assignment/>;
            default: return;
        }
    };
    logout = () => {
        axios.get("/api/logout").then(() => this.setState({redirect: true}))
            .catch(error => {console.log(error)})
    };

    render(){
        if (this.state.redirect){
            return ( <Redirect to={"/"}/>)
        }
        let username = "";
        if (this.props.user !== false){
            username = this.props.user.username
        }
        const navItems = (
            <div className={"nav-items-test"}>
                <CardHeader title={"Burn Notice"}/>
                <List>
                    <ListSubheader>Actions</ListSubheader>
                    {[ ['Vacancies', '/ads/create'], ['Create Report', `/ads/show/${username}`], [`Assignment History`,`/assignments`]].map((text, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon>{text[0] === "Ads" ? <LibraryBooks/> : this.determineIcon(text[0]) }</ListItemIcon>
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
                        <Link component={RouterLink} to={"/profile"}><ListItemText primary={"Profile"}/></Link>
                    </ListItem>
                
                    <ListItem button>
                        <ListItemIcon><PersonOutline/></ListItemIcon>
                        <div className={"close-div"}
                             tabIndex={0}
                             role="button"
                             onClick={this.logout}>
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
const mapStateToProps = state => {
    return {
        menuShown: state.menuShown,
        user: state.user
    }
};
export default connect(mapStateToProps, actions)(LoggedInMenu);



