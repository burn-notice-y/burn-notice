import React, {Fragment} from 'react';
import ListItem from "@material-ui/core/ListItem/ListItem";
import {Link as RouterLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Link from "@material-ui/core/Link/Link";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import VideoLabel from '@material-ui/icons/VideoLabel';
import List from "@material-ui/core/List/List";

const LoggedOutContent = () => {
    return (
        <Fragment>
            <List>
                <Link component={RouterLink} to={"/"}>
                    <ListItem button>
                        <ListItemIcon>{<VideoLabel className={"icon"}/>}</ListItemIcon>
                        <ListItemText primary={'Home'}/>
                    </ListItem>
                </Link>
            </List>

            <List>
                <ListSubheader>Users</ListSubheader>
                {['Login', 'Register'].map((text, index) => (
                        <Link component={RouterLink} key={text} to={index % 2 === 0 ? "/visitor/login": "/visitor/register"} className={"router-link"}>
                            <ListItem button>
                                <ListItemIcon>{index % 2 === 0 ? <Person className={"icon"}/> : <PersonAdd className={"icon"}/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                            </ListItem>
                        </Link>
                ))}
            </List>
        </Fragment>
    );
};

export default LoggedOutContent;
