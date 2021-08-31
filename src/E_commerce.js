import { Button, Container} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Redirect,Link } from "react-router-dom";




const E_commerce =() =>{ 

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(0),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: "100%", // Fix IE 11 issue.
          marginTop: theme.spacing(5),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        save: {
          width: "179px",
          height: "49px",
          margin: "3px 15px 11px 118px",
          padding: "14px 65px 13px 66px",
          borderRadius: "34.5px",
          backgroundColor: "#4de382",
          justifyContent: "center",
          color: "#ffffff",
          float: "right",
        },
        changepassword: {
          width: "300px",
          height: "49px",
          margin: "3px 15px 11px 118px",
          padding: "14px 65px 13px 66px",
          borderRadius: "34.5px",
          backgroundColor: "red",
          justifyContent: "center",
          color: "#ffffff",
          float: "right",
        },
        button: {
            margin: theme.spacing(1),
          },
          root: {
            maxWidth: 345,
          },
          media: {
            height: 140,
          },
          root1: {
            flexGrow: 1,
          },
      }));
    
      const classes = useStyles();

    const CardCompoment =() => {


        return  (
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1618939404235-8747e5c37089?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            title="Tracking device"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Device
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lorem ipsum ftgiuvnjfgtihiyh Lorem ipsum ftgiuvnjfgtihiyh
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    );
    }


    return (
    <div>
      <center>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
                <h1>Products</h1> 
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    endIcon={<Icon><AddShoppingCartIcon/></Icon>}
                >
                  <Link to="/cart">View Cart
                  </Link>
                </Button>
                <br></br> 
                <br></br>
                <br></br>
            </div>
           
        </Container>
        <div className={classes.root1}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <CardCompoment/>
                </Grid>
                <Grid item xs={4}>
                    <CardCompoment/>
                </Grid>
                <Grid item xs={4}>
                    <CardCompoment/>
                </Grid>
                <Grid item xs={4}>
                    <CardCompoment/>
                </Grid>
                <Grid item xs={4}>
                    <CardCompoment/>
                </Grid>
                <Grid item xs={4}>
                    <CardCompoment/>
                </Grid>
            </Grid>
           </div> 
      </center>
    </div>
    )
}

export default E_commerce;