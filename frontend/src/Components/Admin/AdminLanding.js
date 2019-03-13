import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";

// this component is the view for the admin to route to actions

class AdminPortal extends Component {
    render(){
        return (
            <div className="admin-cont">
                <div className="admin-header">
                    <Typography variant="h5" component="h2">
                        Admin Portal
                    </Typography>
                </div>
                <div className="admin-info">
                    <Typography component="p" variant="body1">
                        Do stuuuuuuuffffffff
                    </Typography>
                </div>
                <div className="admin-actions">
                    <Link to={"/admin/requests"}><Button variant="contained" color="primary" className={"landing-button"}>
                        Review Requests
                    </Button>
                    </Link>
                    <Link to={"/admin/create/vacancy"}><Button variant="contained" color="primary" className={"landing-button"}>
                        Create Vacancy
                    </Button>
                    </Link>
                    <Link to={"/admin/review"}><Button variant="contained" color="primary" className={"landing-button"}>
                        Review New User Requests
                    </Button>
                    </Link>
                </div>
            </div>
        )
    }
}
export default AdminPortal;