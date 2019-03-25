import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import Link from '@material-ui/core/Link'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VideoLabel from '@material-ui/icons/VideoLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import CardHeader from '@material-ui/core/CardHeader';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';

class LoggedOutMenu extends Component{
    render(){
        const navItems = (
            <div className={"nav-items-test"}>
                <CardHeader title={"Burn Notice"}/>
                <List>
                    <ListItem button>
                        <ListItemIcon>{<VideoLabel/>}</ListItemIcon>
                        <Link component={RouterLink} to={"/"}><ListItemText primary={'Home'}/></Link>
                    </ListItem>
                </List>
               
                <List>
                    <ListSubheader>Users</ListSubheader>
                    {['Login', 'Register'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <Person/> : <PersonAdd/>}</ListItemIcon>
                            <Link component={RouterLink} to={index % 2 === 0 ? "/visitor/login": "/visitor/register"}><ListItemText primary={text}/></Link>
                        </ListItem>
                    ))}
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
        menuShown: state.menuShown
    }
};
export default connect(mapStateToProps, actions)(LoggedOutMenu);



