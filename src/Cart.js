import { Button, Container} from "@material-ui/core";
import {React, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TextField from "@material-ui/core/TextField";


const Cart =() =>{ 

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
          counter: {
            background: " #eec311",
            padding: "10px",
            width: "64px",
            height: "54px",
            fontSize: "20px",
            color: "#fffff",
          }
      }));
    
      const classes = useStyles();

      const[state, setState] = useState({count : 0})
      let {count} = state;
    
      /*const onSubmit = (event) => {
        event.preventDefault();
        const data = {
          count,
        };
      };*/

    const Product = () => {

    function increase() {
        setState({
            ...state,
            count : count +1
        })
        }
        function decrease() {
        if (state.count>0){
            setState({
            ...state,
            count : count -1
            })
        }
        }
        /*function detleteProduct(){
            //
        }*/
     return(
         <div>
             <br>
             <h3>Product</h3>
            <div><Button
                variant="contained"
                className={classes.counter}
                onClick={decrease}
            >
                -
            </Button>
            <TextField id="outlined-basic" variant="outlined" value={count} onChange={(e) => setState({ ...state, count: e.target.value })}/>
            <Button
                onClick={increase}
                variant="contained"
                className={classes.counter}
            >
                +
            </Button></div>
           </br>
      </div>)
    }

    return (
    <div>
      <center>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
                <h1>My Cart <AddShoppingCartIcon/></h1> 
                <br></br> 
                <br></br>
                <br></br>
            </div>
           <Product/>
        </Container>
       
      </center>
    </div>
    )
}

export default Cart;