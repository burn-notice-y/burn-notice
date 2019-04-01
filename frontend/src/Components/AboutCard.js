import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

const AboutCard = props => {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title={props.altText || "oops!"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography component="p">
                        {props.content || ""}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <CopyToClipboard text={props.email} onCopy={() => {
                    props.showPopup("Copied!");
                    setTimeout(() => {
                        props.closePopup();
                    }, 3000)
                }}>
                    <Button size="small" color="primary">
                        Email
                    </Button>
                </CopyToClipboard>
                <a href={props.github} target={"_blank"}>
                    <Button size="small" color="primary">
                        Github
                    </Button>
                </a>
            </CardActions>
        </Card>
    );
};

AboutCard.propTypes = {
    classes: PropTypes.object.isRequired,
    image: PropTypes.any,
    altText: PropTypes.string,
    content: PropTypes.string,
    email: PropTypes.string,
    github: PropTypes.string,
    showPopup: PropTypes.func,
    closePopup: PropTypes.func,
};

export default connect(null, actions)(withStyles(styles)(AboutCard));