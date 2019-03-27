import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";

const EmptyDisplay = ({items, name, variant}) => {
    let content = null;
    if (items.length === 0) {
        content = (
            <div className={"no-vac"}>
                <Typography component="h2" variant={variant}>
                    There are no {name} at this time
                </Typography>
            </div>
        );
    }
        return (
            <Fragment>
                {content}
            </Fragment>
        );
};

EmptyDisplay.propTypes = {
    items: PropTypes.array,
    name: PropTypes.string,
    variant: PropTypes.string,
};

export default EmptyDisplay;
