import { Button, Container} from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';


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
import { deleteCartItems, getaProduct, getCartItems, updateCartItems } from "./coreAPIcalls/ecommerceAPIcalls";
import { forEach } from "lodash";




const Cart = () => { 

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
          width: "300px",
          height: "49px",
          margin: "3px 15px 11px 118px",
          padding: "14px 65px 13px 66px",
          borderRadius: "34.5px",
          backgroundColor: "green",
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
          counter: {
            background: " #eec311",
            padding: "10px",
            width: "64px",
            height: "54px",
            fontSize: "20px",
            color: "#fffff",
          },
          delete: {
            background: "red",
            padding: "10px",
            width: "100px",
            height: "54px",
            fontSize: "15px",
            color: "#fffff",
          }
      }));
    
      const classes = useStyles();
      const [count,setCount] = useState(0);
      const[cartProducts, setCartProducts]= useState([]);
      const[cartProductsDetails, setCartProductsDetails] = useState([]);
      const [refresh, setRefresh]= useState(false);
      const[total, setTotal] = useState(0);

      const preload = () => {
        getCartItems()
        .then(data => {
          setCartProducts(data.msg);
          console.log(cartProducts);
        })
        .catch(error => console.log(error));
      };
    

      const populateCartProductsDetails = () => {
        let response = null;
        console.log(response);

        cartProducts.forEach((product) => {
          //not working
          console.log(product.prouctid);

          getaProduct(product.productid)
          .then(res => {response = res;})
          .catch(err => console.log(err));

          setCartProductsDetails(prevItems => [...prevItems, {
            "productid" : product.productid,
            "productquantity" : product.productquantity,
            "productname" : response.productname,
            "productcurrency": response.productcurrency,
            "productrate": response.productrate,
          }]);
          console.log(cartProductsDetails);
          })

      }

      useEffect(() => {
          preload();
          populateCartProductsDetails();
      }, [refresh]);


      const Product= () => {

        return (
          <div>
          {cartProductsDetails.map((product) => (

            <div style={{ width: '100%' }} key={product.id}>
            <Box display="flex" p={1} bgcolor="background.paper">
              <Box p={1} flexGrow={1} bgcolor="grey.300">
                <h3>{product.productname}</h3>
              </Box>
              <Box p={1} bgcolor="grey.300">
                <h3>Price = {product.productrate * product.productquantity}</h3> 
                {()=> {
                  setTotal(
                    total = total + (product.productrate * product.productquantity)
                  )
                }}
              </Box>
              <Box p={1} bgcolor="grey.300">
                <Button
                  variant="contained"
                  className={classes.counter}
                >
                  -
                </Button>
                <TextField id="outlined-basic" variant="outlined" value={product.productquantity} 
                  onChange={()=>{
                    const productID = {"productid" : product.productid, "productquantity" : product.productquantity}
                    updateCartItems(productID)
                    .then(res => {
                      console.log(res);
                      //refresh ? setRefresh(false) : setRefresh(true);
                    })
                    .catch(error => console.log(error));
                  }
                } />
                <Button
                  /*onClick={()=>{
                    product.productquantity = product.productquantity+1;
                  }}*/
                  variant="contained"
                  className={classes.counter}
                >
                  +
                </Button>
                <Button
                  onClick={()=>{
                    const productID = {"productid" : product.productid}
                    deleteCartItems(productID)
                    .then(res => {
                      console.log(res);
                      refresh ? setRefresh(false) : setRefresh(true);
                    })
                    .catch(error => console.log(error));
                  }}
                  variant="contained"
                  className={classes.delete}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </div>
          ))}
         </div> 
        )
      }

      const onSubmitOrder = () => {
          //
      }

    return (
    <div>
      <center>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
                <h1>My Cart <AddShoppingCartIcon/></h1> 
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                >
                  <Link to="/E_commerce">Back to E-Store
                  </Link>
                </Button>
                <br></br> 
                <br></br>
                <br></br>
            </div>
        </Container>
        <Product/>
        <br></br><br></br><br></br>
        <h3>Total price = {total}</h3>
        <Button onClick={onSubmitOrder} variant="contained" className={classes.save}>
         Place Order
        </Button>
      </center>
    </div>
    )
}

export default Cart;