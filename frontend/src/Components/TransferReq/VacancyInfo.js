import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField/TextField";

const VacancyInfo = ({stationName, role, temporary, postDate, fillDate}) => {
    return (
        <div>
            <div className="reg-station reg-input">
                <TextField
                    label={"Station"}
                    value={stationName}
                    margin="normal"
                    variant="outlined"
                    disabled={true} />
            </div>
            <div className="reg-role reg-input">
                <TextField
                    label="Role"
                    value={role}
                    margin="normal"
                    variant="outlined"
                    disabled={true} />
            </div>
            <div className="reg-temporary reg-input">
                <TextField
                    label="Temporary"
                    value={temporary}
                    margin="normal"
                    variant="outlined"
                    disabled={true} />
            </div>
            <div className="reg-post-date reg-input">
                <TextField
                    label="Start Date"
                    value={postDate}
                    margin="normal"
                    variant="outlined"
                    disabled={true} />
            </div>
            <div className="reg-fill-date reg-input">
                <TextField
                    label="Fill Date"
                    value={fillDate}
                    margin="normal"
                    variant="outlined"
                    disabled={true} />
            </div>
        </div>
    );
};

VacancyInfo.propTypes = {
    stationName: PropTypes.string,
    role: PropTypes.string,
    temporary: PropTypes.string,
    postDate: PropTypes.string,
    fillDate: PropTypes.string
};

export default VacancyInfo;