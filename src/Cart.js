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
import { createOrder, deleteCartItems, getaProduct, getCartItems, updateCartItems } from "./coreAPIcalls/ecommerceAPIcalls";
import { forEach } from "lodash";
import { order_details } from "./redux/actions/orderActions";
import { useDispatch } from "react-redux";




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
      const [refresh, setRefresh]= useState(false);
      const[redirect, setRedirect] = useState(false);
      const dispatch = useDispatch();
       

      const preload = () => {
        getCartItems()
        .then(data => {
          setCartProducts(data.msg);
        })
        .catch(error => console.log(error));
      };

      let total =0;
      let orderitems = [];

      const handleTotal = (price) => {
        total = total + price;
      }
    
      const handleOrderItems = (product) => {
        orderitems.push({
          "productid": product.productid,
            "productname": product.productname,
            "productquantity": product.productquantity,
            "productcurrency": product.productcurrency,
            "productrate": product.productrate
        });
      }


      useEffect(() => {
          preload();
      }, [refresh]);


      const Product= () => {

        return (
          <div>
          {cartProducts.map((product) => (

            <div style={{ width: '100%' }} key={product.id}>
              {handleTotal(Math.round((product.productrate * product.productquantity)*100) / 100 )}
              {handleOrderItems(product)}

            <Box display="flex" p={1} bgcolor="background.paper">

              <Box p={1} flexGrow={1} bgcolor="grey.300">
                <h3>{product.productname}</h3>
              </Box>

              <Box p={1} bgcolor="grey.300">
                <h3>Price = {product.productcurrency} {Math.round((product.productrate * product.productquantity)*100) / 100}</h3> 
              </Box>

              <Box p={1} bgcolor="grey.300">
                <Button
                  onClick={()=>{
                    const productID = {"productid" : product.productid, "productquantity" : product.productquantity - 1}
                    updateCartItems(productID)
                    .then(res => {
                      console.log(res);
                      refresh ? setRefresh(false) : setRefresh(true);
                    })
                    .catch(error => console.log(error));
                  }}
                  variant="contained"
                  className={classes.counter}
                >
                  -
                </Button>
                <TextField id="outlined-basic" variant="outlined" value={product.productquantity}  />
                <Button
                  onClick={()=>{
                    const productID = {"productid" : product.productid, "productquantity" : product.productquantity + 1}
                    updateCartItems(productID)
                    .then(res => {
                      console.log(res);
                      refresh ? setRefresh(false) : setRefresh(true);
                    })
                    .catch(error => console.log(error));
                  }}
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
          <br></br><br></br><br></br>
            <h3>Total price = {total}</h3>
            <Button onClick={onSubmitOrder} variant="contained" className={classes.save}>
            Place Order
            </Button>
         </div> 
        )
      }

      const onSubmitOrder = () => {
        const data= {
          "ordercurrency": "INR",
          "orderamount": total,
          "orderitems": orderitems
        }
        createOrder(data)
        .then((res) => {
          console.log(res);
          dispatch(order_details(res));
          setRedirect(true);
        })
        .catch((err) => console.log(err))
      }

    return (
    redirect ? <Redirect to="/payment"/> :
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
        
      </center>
    </div>
    )
}

export default Cart;