import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import DatePick from "../../DatePickClass";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";


class SearchByOne extends Component {

    determineSearchType = () => {
        switch (this.props.type) {
            case "By Date":
                return <div className={"date"}>
                    <DatePick value={this.props.createDate} argumentName={"oneDate"}
                              handleChange={this.props.handleChange} labelDisplay={"Reports on this Date"}/>
                    <div className={"button-cont"}>
                        <Button variant="contained" color="primary" className="date-search"
                                onClick={this.props.searchShow}>
                            Search
                        </Button>
                    </div>
                </div>;
            case "By Last Name":
                return (
                    <form>
                        <div className={"search-name"}>
                        <TextField
                            label="Creator Last Name"
                            type="text"
                            value={this.props.name}
                            onChange={this.props.handleChange('name')}
                            margin="normal"
                            variant="outlined"
                        />
                        <div>
                            <Button variant="contained" color="primary" type={"submit"} onClick={this.props.searchShow}>Search</Button>
                        </div>
                    </div>
                    </form>
                );
            default: return;
        }
    };

    render() {
        return (
            <Fragment>
                {this.determineSearchType()}
            </Fragment>
        )
    }
}

SearchByOne.propTypes = {
    searchShow: PropTypes.func,
    handleChange: PropTypes.func
};

export default SearchByOne;