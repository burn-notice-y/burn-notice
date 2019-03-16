import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import Radio from "@material-ui/core/Radio/Radio";

const TwoOptionSelect = props => (
    <div className={`${props.className} reg-input`}>
        <FormLabel component="legend">{props.title}</FormLabel>
        <div>
            <RadioGroup
                className="role-cont group"
                name="engine"
                value={props.value}
                onChange={props.inputHandler}
            >
                <FormControlLabel value={props.oneVal} control={<Radio/>} label={props.oneName}/>
                <FormControlLabel value={props.twoVal} control={<Radio/>} label={props.twoName}/>
            </RadioGroup>
        </div>
    </div>
);

TwoOptionSelect.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.any,
    inputHandler: PropTypes.func,
    oneVal: PropTypes.string,
    twoVal: PropTypes.string,
    oneName: PropTypes.string,
    twoName: PropTypes.string
};

export default TwoOptionSelect;