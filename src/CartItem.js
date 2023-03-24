import React from "react";

const CartItem = (props) => {

    const { price, title, qty } = props.product;
    return (
        <div className="cart-item">
            <div className="left-block">
                <img src={props.product.img} style={styles.image} alt='' />
            </div>
            <div className="right-block">
                <div style={{ fontSize: 25 }}>{title}</div>
                <div style={{ color: '#777' }}>Price: Rs {price}</div>
                <div style={{ color: '#777' }}>Qty: {qty}</div>
                <div className="cart-item-actions">
                    {/* Buttons */}
                    <img
                        alt="increase"
                        className="action-icons"
                        src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                        onClick={() => props.onIncreaseQuantity(props.product)} />
                    <img
                        alt="decrease"
                        className="action-icons"
                        src="https://cdn-icons-png.flaticon.com/512/992/992683.png"
                        onClick={() => props.onDecreaseQuantity(props.product)} />
                    <img
                        alt="delete"
                        className="action-icons"
                        src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
                        onClick={() => props.onDeleteItem(props.product.id)} />
                </div>
            </div>
        </div>
    );
}


const styles = {
    image:{
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;