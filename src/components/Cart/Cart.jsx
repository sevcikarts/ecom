import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link, useLocation } from "react-router-dom";

const Cart = ({cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart}) => {
    const classes = useStyles();

    console.log(cart)
    const renderEmptyCart = () => (
        <Typography variant="subtitle1">V košíku nemáte žádné zboží,
         <Link className={classes.link} to="/">zde můžete začít nakupovat</Link>!
        </Typography>
      );

      const renderCart = () => (
        <>
        <Grid container spacing={3} >
            {cart.line_items.map((item)=>
            <Grid item xs={12} sm={4} key={item.id} >
                <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart}/>
            </Grid>
            )}

        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h4">
                Celkem: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={()=>onEmptyCart()} >Odstranit vše</Button>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary" >Objednat</Button>
        </div>

        </div>
        </>
      );

      if (!cart.line_items) return 'Loading...';


    return (
        <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Váš nákupní košík</Typography>
      { !cart.line_items.length ? renderEmptyCart() : renderCart() }
    </Container>
    )
}

export default Cart
