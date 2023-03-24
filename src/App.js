import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          price: 999,
          title: 'Phone',
          qty: 1,
          img: 'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=416&q=80',
          id: 1
        },
        {
          price: 99,
          title: 'Watch',
          qty: 1,
          img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
          id: 2
        },
        {
          price: 9999,
          title: 'Laptop',
          qty: 1,
          img: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          id: 3
        }
      ]
    };
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    products[index].qty += 1;

    this.setState({
      products
    });
  }

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty === 0) {
      return;
    }
    products[index].qty -= 1;

    this.setState({
      products
    });
  }

  handleDeleteItem = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id);

    this.setState({
      products: items
    })
  }

  getCartCount = () => {
    const {products} = this.state;
    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  }

  getTotal = () => {
    const {products} = this.state;

    let tot = 0;
    products.forEach((item) => {
      tot += item.price * item.qty;
    });

    return tot;
  }

  render() {
    const {products} = this.state;
    return (
      <div className="App">
        <Navbar 
          count={this.getCartCount()}
        />
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity} 
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteItem={this.handleDeleteItem}
        />
        <div style={{padding: 10, fontSize: 20}}>
          Total: Rs.{this.getTotal()}
        </div>
      </div>
    );
  }
}

export default App;
