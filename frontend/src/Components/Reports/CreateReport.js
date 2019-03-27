// Foundational
import React, {Component, Fragment} from 'react';
import * as actions from '../../store/actions'
import {connect} from 'react-redux';
import {withRouter, Redirect, Switch, Route} from 'react-router-dom';

// util
import axios from 'axios';
import {Typography} from '@material-ui/core'
import PropTypes from 'prop-types';
import moment from 'moment';

// Own Components
import '../../css/CreateReport.css';
import ReportPage1 from "./Pages/ReportPage1";
import ReportsPage2 from "./Pages/ReportPage2";
import ReportsPage3 from "./Pages/ReportPage3";
import Action from "./Actions/Action";
import Divider from "@material-ui/core/Divider/Divider";

class CreateReport extends Component {
    state = {
        id: "",
        reportType: 1,
        chemicals: "true",
        fireRetardant: "true",
        teamActions: "",
        description: "",
        timeArrived: "",
        timeDispatched: "",
        createDate: moment().format("YYYY-MM-DD"),
        search: "",
        redirect: false,
        error: false,
        disabled: false,
        searchResult: [],
        teamMembers: [],
        newMembers: 0
    };

    static getDerivedStateFromProps(nextProps) {
        return {...nextProps.user}
    }


    inputHandler = type => event => {
        if (type === "createDate"){
            if(event > new Date()) {
                this.props.showModal(["Whoa", "Can you see into the future?", "Select a past date"])
            }  else {
                this.setState({createDate: moment(event).format("YYYY-MM-DD")})
            }
        } else {
        this.setState({
            [type]: event.target.value
        })
    }
    };

    searchFirefighters = event => {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.search === "") {
            this.setState({searchResult: []})
        } else {
            this.props.toggleLoading();
            axios.get(`/api/firefighters?search=${this.state.search}`)
                .then(res => {
                    this.props.toggleLoading();
                    this.setState({searchResult: res.data})
                })
                .catch(() => {
                    this.props.toggleLoading();
                })
        }
    };

    addFiremanToTeam = fireman => {
        let searchResults = [...this.state.searchResult];
        const selectedIndex = searchResults.findIndex(result => {
            return result.id === fireman.id
        });
        let goodToGo = true;
        [...this.state.teamMembers].forEach(result => {
            if (result.id === fireman.id){
                goodToGo = false;
            }
        });
        if (goodToGo){
            searchResults.splice(selectedIndex, 1);
            this.setState(prevState => ({
                newMembers: prevState.newMembers + 1,
                teamMembers: [...prevState.teamMembers, fireman],
                searchResult: searchResults
            }))
        } else {
            this.setState({
                teamMemberTaken: true,
                modalOpen: true
            });
        }
    };

    removeFiremanFromTeam = firemanId => {
        let updatedRoster = this.state.teamMembers.filter(teamMember => teamMember.id !== firemanId);
        this.setState({teamMembers: updatedRoster})
    };

    clearNotifications = () => {
        this.setState({newMembers: 0})
    };

    determinePage = () => {
        switch (this.props.match.params.pageNumber) {
            case "1":
                return <ReportPage1 {...this.state} inputHandler={this.inputHandler}/>;
            case "2":
                return <ReportsPage2 {...this.state} inputHandler={this.inputHandler}/>;
            case "3":
                return <ReportsPage3 {...this.state} inputHandler={this.inputHandler}
                                     addFiremanToTeam={this.addFiremanToTeam}
                                     searchFirefighters={this.searchFirefighters}
                                     clearSearch={this.clearSearch}
                                     clearNotifications={this.clearNotifications}
                                     removeFiremanFromTeam={this.removeFiremanFromTeam}
                />;
            default:
                return;
        }
    };

    clearSearch = () => {
        this.setState({
            search: "",
            searchResult: []
        })
    };

    submitReport = () => {
            this.props.toggleLoading();
            axios.post("/api/create-report", {
                createDate: this.state.createDate,
                exposedToChemicals: this.state.chemicals,
                timeDispatched: this.state.timeDispatched,
                timeArrived: this.state.timeArrived,
                users: this.state.teamMembers,
                fireRetardantPresent: this.state.fireRetardant,
                teamActions: this.state.teamActions,
                description: this.state.description,
                creator: {id: this.state.id},
                type: {id: this.state.reportType}
            }).then(() => {
                this.props.toggleLoading();
                this.setState({redirect: true})
            })
                .catch(() => {
                    this.props.toggleLoading();
                    this.props.showModal(["Oops", "Something went wrong", "Please try again later"])
                })
        };

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/reports/${this.state.id}`}/>
        }
        return (
            <Fragment>
                <div className={"create-report-cont"} id={"top"}>
                    <div className="report-header-cont">
                        <Typography component="h3" variant="h4" gutterBottom className={"report-header"}>
                            File a Report
                        </Typography>
                        <Divider className={"report-divider"}/>
                    </div>
                    <div className="page-nav">
                        <Typography component="h3" variant="h6" gutterBottom className={"registration-header"}>
                            Page: {this.props.match.params.pageNumber}
                        </Typography>
                    </div>
                    <div className="input-cont">
                        <Switch>
                            <Route path={"/reports/create/:id"} render={() => this.determinePage()}/>
                        </Switch>
                    </div>
                    <Divider className={"report-divider"}/>
                    <Action page={this.props.match.params.pageNumber} submitReport={this.submitReport}/>
                </div>
            </Fragment>
        )
    }
}

CreateReport.propTypes = {
    pageNumber: PropTypes.string,
    user: PropTypes.object,
    toggleLoading: PropTypes.func,
    showModal: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default withRouter(connect(mapStateToProps, actions)(CreateReport));