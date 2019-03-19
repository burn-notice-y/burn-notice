// Foundational
import React, {Component, Fragment} from 'react';
import * as actions from '../../store/actions'
import {connect} from 'react-redux';
import {withRouter, Redirect, Switch, Route} from 'react-router-dom';

// util
import axios from 'axios';
import {Typography} from '@material-ui/core'
import PropTypes from 'prop-types';
import differenceWith from 'lodash.differencewith';
import difference from 'lodash.difference';

// Own Components
import '../../css/CreateReport.css';
import ReportPage1 from "./Pages/ReportPage1";
import ReportsPage2 from "./Pages/ReportPage2";
import ReportsPage3 from "./Pages/ReportPage3";
import Action from "./Actions/Action";
import OwnModal from "../OwnModal";


class CreateReport extends Component {
    state = {
        reportType: "",
        chemicals: "",
        fireRetardant: "",
        primaryTeamActions: "",
        secondaryTeamActions: "",
        team: "primaryTeam",
        description: "",
        timeArrived: "",
        timeDispatched: "",
        createDate: new Date(),
        search: "",
        redirect: false,
        error: false,
        disabled: false,
        searchResult: [],
        primaryTeam: [],
        secondaryTeam: [],
        modalOpen: false
    };


    inputHandler = type => event => {
        if (type === "createDate"){
            if(event > new Date()){
                alert("Can you see the future?")
            } else {
                this.setState({createDate: event})
            }
            
        } else {
        this.setState({
            [type]: event.target.value
        })
    }
    };

    searchFirefighters = () => {
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

    addFiremanToTeam = (team, fireman) => {
        let searchResults = [...this.state.searchResult];
        const selectedIndex = searchResults.findIndex(result => {
            return result.id === fireman.id
        });
        let goodToGo = true;
        [...this.state[team]].forEach(result => {
            if (result.id === fireman.id){
                goodToGo = false;
            }
        });
        if (goodToGo){
            searchResults.splice(selectedIndex, 1);
            this.setState({
                [team]: [...this.state[team], fireman],
                searchResult: searchResults
            })
        } else {
            this.setState({modalOpen: true});
        }
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

    modalClose = () => {
        this.setState({modalOpen: false})
    };

    submitReport = () => {
        axios.post("/api/create-report", {
            createDate: this.state.createDate,
            exposedToChemicals: this.state.chemicals,
            timeDispatched: this.state.timeDispatched,
            timeArrived: this.state.timeArrived,
            teamMembers: [{id: 46, sap: 123456}],
            secondaryTeam: this.state.secondaryTeam,
            fireRetardantPresent: this.state.fireRetardant,
            primaryTeamActions: this.state.primaryTeamActions,
            secondaryTeamActions: this.state.secondaryTeamActions,
            description: this.state.description,
            user: {id: 46},
            type: {id: 1, name: "Single Family Dwelling Fire"}
        }).then(result => {
            console.log(result)
        })
        .catch(error => console.log(error))
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={"/reports"}/>
        }
        console.log(this.state.primaryTeam);

        return (
            <Fragment>
                <div className={"create-report-cont"} id={"top"}>
                    <div className="register-header">
                        <Typography component="h3" variant="h3" gutterBottom className={"registration-header"}>
                            File a Report
                        </Typography>
                        <div className="page-nav">
                            <Typography component="h3" variant="h6" gutterBottom className={"registration-header"}>
                                Page: {this.props.match.params.pageNumber}
                            </Typography>
                        </div>
                    </div>
                    <div className="input-cont">
                        <Switch>
                            <Route path={"/reports/create/:id"} render={() => this.determinePage()}/>
                        </Switch>
                    </div>
                    <div className="actions-cont">
                        <Action page={this.props.match.params.pageNumber} submitReport={this.submitReport}/>
                    </div>
                </div>
                <OwnModal open={this.state.modalOpen} handleClose={this.modalClose}
                          header={"Oops"} body={"That firefighter is already on a team"}
                          
                />
            </Fragment>
        )
    }
}

CreateReport.propTypes = {
    pageNumber: PropTypes.string
};

export default withRouter(connect(null, actions)(CreateReport));