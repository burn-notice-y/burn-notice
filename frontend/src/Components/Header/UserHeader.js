import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CardHeader from '@material-ui/core/CardHeader';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import Assignment from '@material-ui/icons/Assignment';
import Description from '@material-ui/icons/Description';
import LocationCity from '@material-ui/icons/LocationCity';
import ListAlt from '@material-ui/icons/ListAlt';
import Store from '@material-ui/icons/Store';
import Search from '@material-ui/icons/Search';
import PersonalActions from "./PersonalActions";
import * as PropTypes from "prop-types";
import DropDownList from "./DropDownList";


class UserHeader extends Component{
    state = {
        firstName: "",
        lastName: "",
        open: false
    };

    static getDerivedStateFromProps(nextState){
        return {...nextState.user}
    }

    determineIcon = text => {
        switch (text) {
            case "Vacancies":
                return <Store/>;
            case "Assignment History":
                return <Assignment/>;
            case "Station List":
                return <LocationCity/>;    
            default: return;
        }
    };

    render(){
        return (
            <Drawer variant={"temporary"} open={this.props.menuShown} onClose={this.props.closeMenu.bind(this)}>
                <div className={"close-div"}
                     tabIndex={0}
                     role="button"
                     onScrollCapture={this.props.closeMenu}>
                    <div className={"nav-items-test"}>
                        <CardHeader title={"Burn Notice"} subheader={`Welcome, ${this.state.firstName} ${this.state.lastName}`}/>
                        <List>
                            <ListSubheader>Actions</ListSubheader>
                            <DropDownList closeMenu={this.props.closeMenu}
                                          primaryText={"Reports"}
                                          mainIcon={<ListAlt/>}
                                          listItems={[
                                              [<LibraryAdd/>, "Create Report", "/reports/create/1"],
                                              [<Description/>, "My Reports", "/reports"]
                                          ]}
                            />
                            <DropDownList closeMenu={this.props.closeMenu}
                                          primaryText={"Vacancies"}
                                          mainIcon={<Store/>}
                                          listItems={[
                                              [<Search/>, 'Search', `/vacancy/show`],
                                              [<Description/>, 'My Applications', `/transfer/view/${this.props.user ? this.props.user.id : ""}`]

                                          ]}
                            />



                            {[[`Assignment History`, `/assignments/show/${this.props.user ? this.props.user.id : ""}`], ['Station List', '/stations/all']].map((text, index) => (
                                <Link component={RouterLink} to={text[1]} className={"link"} key={index}>
                                    <ListItem button key={index} onClick={this.props.closeMenu}>
                                        <ListItemIcon>{text[0] === "Ads" ? <LibraryBooks/> : this.determineIcon(text[0]) }</ListItemIcon>
                                        <ListItemText primary={text[0]}/>
                                    </ListItem>
                                </Link>
                                )
                            )}
                        </List>
                        <Divider/>
                        <PersonalActions closeMenu={this.props.closeMenu} logout={this.props.logout}/>
                    </div>
                </div>
            </Drawer>
        )
    }
}

UserHeader.propTypes = {
    closeMenu: PropTypes.func,
    menuShown: PropTypes.bool,
    logout: PropTypes.func,

};

const mapStateToProps = state => {
    return {
        user: state.user,
        menuShown: state.menuShown
    }
};
export default connect(mapStateToProps, actions)(UserHeader);



