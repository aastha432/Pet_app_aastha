import { Box, Button, Container} from "@material-ui/core";
import React, { useState,useEffect } from "react";
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
import { addCartItems, getProducts } from "./coreAPIcalls/ecommerceAPIcalls";




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

      const[products, setProducts]= useState([]);

      const preload = () => {
        getProducts()
        .then(data => {
            setProducts(data.msg);
        })
        .catch(error => console.log(error));
      };
    
      useEffect(() => {
        preload();
      }, []);

    const CardCompoment =() => {


        return  (
          <div className={classes.root1}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={4} key={product.productid}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={product.productImageURL}
                        title={product.productname}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.productname}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {product.productdescription}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <div style={{ width: '100%' }}>
                      <Box display="flex" justifyContent="center" m={1} p={1}>
                        <Box p={1}>
                          <Button size="small" color="primary" onClick= {() => {
                                const data = {
                                  "productid": product.productid,
                                  "productquantity": "1"
                              }
                                addCartItems(data)
                                .then(res => console.log(res))
                                .catch(error => console.log(error));
                          }}>
                            Add to Cart
                          </Button>
                        </Box>
                        <Box p={1}>
                          <Button size="small" color="secondary">
                            {product.productcurrency} {product.productrate}
                          </Button>
                        </Box>
                      </Box>
                    </div>
                    </CardActions>
                  </Card>
              </Grid>
            ))}
          </Grid>
         </div> 

    );
    }


      const addItemsToCart = (productid)=> {
        const data = {
          "productid": productid,
          "productquantity": "1"
      }
        addCartItems(data)
        .then(res => console.log(res))
        .catch(error => console.log(error));
      };
    


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
       <CardCompoment/>
      </center>
    </div>
    )
}

export default E_commerce;