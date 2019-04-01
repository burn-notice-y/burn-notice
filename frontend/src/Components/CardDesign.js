import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import reportImage from '../assets/images/reports-1065.png';
import '../css/Landing.css';
import vacancyImage from '../assets/images/vacancy.jpeg';



const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 180,
    },
};

const MediaCard =(props) => {
    const {classes} = props;
    return (
    <div className={"ind-card-cont"}>
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title={props.altText || "Image Text"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography component="p">
                        {props.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </div>
    );
};

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
    image: PropTypes.any,
    title: PropTypes.string,
    content: PropTypes.string,
    altText: PropTypes.string,
};

export default withStyles(styles)(MediaCard);

