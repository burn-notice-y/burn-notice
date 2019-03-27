import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import DropDownList from "../DropDownList";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import Link from "react-router-dom/es/Link";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Description from '@material-ui/icons/Description';
import ListAlt from '@material-ui/icons/ListAlt';
import Store from '@material-ui/icons/Store';
import Search from '@material-ui/icons/Search';
import LocationCity from '@material-ui/icons/LocationCity';

const UserActions = ({ closeMenu, user}) => {
    return (
       <Fragment>
           <ListSubheader>Actions</ListSubheader>
           <DropDownList closeMenu={closeMenu}
                         primaryText={"Reports"}
                         mainIcon={<ListAlt/>}
                         listItems={[
                             [<LibraryAdd/>, "Create Report", "/reports/create/1"],
                             [<Description/>, "My Reports", `/reports/${user ? user.id : ""}`]
                         ]}
           />
           <DropDownList closeMenu={closeMenu}
                         primaryText={"Vacancies"}
                         mainIcon={<Store/>}
                         listItems={[
                             [<Search/>, 'Search', `/vacancy/show`],
                             [<Description/>, 'My Applications', `/transfer/view/${user ? user.id : ""}`]

                         ]}
           />


           {[[`Assignment History`, `/assignments/show/${user ? user.id : ""}`], ['Station List', '/stations/all']].map((text, index) => (
                   <Link to={text[1]} className={"link"} key={index}>
                       <ListItem button key={index} onClick={closeMenu} className={"router-link"}>
                           <ListItemIcon>{text[0] === "Assignment History" ?
                               <Description/> : <LocationCity/> }</ListItemIcon>
                           <ListItemText primary={text[0]}/>
                       </ListItem>
                   </Link>
               )
           )}
       </Fragment>
    );
};

UserActions.propTypes = {
    closeMenu: PropTypes.func,
    user: PropTypes.object,

};

export default UserActions;
