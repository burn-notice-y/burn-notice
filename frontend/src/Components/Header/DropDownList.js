import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem/ListItem";
import Collapse from "@material-ui/core/Collapse/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Link from "react-router-dom/es/Link";

class DropDownList extends Component {
    state = {
      open: false
    };

    handleClick = ()=> {
        this.setState(state => ({ open: !state.open }));
    };

    // listItems is an array of arrays, holding 3 things each.
    // The 1st is the icon, the second is the name of the link, the 3rd is the route

    render() {
        return (
            <Fragment>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        {this.props.mainIcon}
                    </ListItemIcon>
                    <ListItemText inset primary={this.props.primaryText}/>
                    {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.props.listItems.map((itemArray, index) => (
                            <Link to={itemArray[2]} className={"sub-link"} key={index}>
                                <ListItem button>
                                    <ListItemIcon>
                                     {itemArray[0]}
                                    </ListItemIcon>
                                    <ListItemText inset primary={itemArray[1]} onClick={this.props.closeMenu}/>
                                </ListItem>
                            </Link>
                        ))}

                    </List>
                </Collapse>
            </Fragment>
        );
    }
}

DropDownList.propTypes = {
    primaryText: PropTypes.string,
    closeMenu: PropTypes.func,
    mainIcon: PropTypes.any,
    listItems: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any, PropTypes.string, PropTypes.string)),
};

export default DropDownList;
