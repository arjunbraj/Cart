import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase/compat/app";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    };
  }

  componentDidMount(){
    // firebase
    // .firestore()
    // .collection('products')
    // .get()
    // .then((snapshot) => {
    //   // snapshot.docs.map((doc) => {
    //   //   console.log(doc.data());
    //   // })
    //   const products = snapshot.docs.map((doc) => {
    //     const data = doc.data();
    //     data['id'] = doc.id;
    //     return data;
    //   });
    //   this.setState({
    //     products,
    //     loading: false
    //   });
    // })

    firebase
    .firestore()
    .collection('products')
    .onSnapshot((snapshot) => {
      // snapshot.docs.map((doc) => {
      //   console.log(doc.data());
      // })
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      });
      this.setState({
        products,
        loading: false
      });
    })
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;

    // this.setState({
    //   products
    // });

    const docRef = firebase.firestore().collection('products').doc(products[index].id);
    docRef
    .update({
      qty: products[index].qty + 1
    })
    .then(() => {
      console.log('Product updated successfully');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty === 0) {
      return;
    }
    // products[index].qty -= 1;

    // this.setState({
    //   products
    // });
    const docRef = firebase.firestore().collection('products').doc(products[index].id);
    docRef
    .update({
      qty: products[index].qty - 1
    })
    .then(() => {
      console.log('Product updated successfully');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleDeleteItem = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id);

    // this.setState({
    //   products: items
    // })
    const docRef = firebase.firestore().collection('products').doc(id);
    docRef
    .delete()
    .then(() => {
      console.log('Product deleted successfully');
    })
    .catch((err) => {
      console.log(err);
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

  addProduct = () => {
    firebase
     .firestore()
     .collection('products')
     .add({
      img: '',
      qty: 1,
      price: 9999,
      title: 'Washing Machine'
     })
     .then((docRef) => {
      console.log('Product added successfully', docRef);
     })
     .catch((err) => {
      console.log(err);
     })
  }

  render() {
    const {products, loading} = this.state;
    return (
      <div className="App">
        <Navbar 
          count={this.getCartCount()}
        />
        <button onClick={this.addProduct} style={{padding: 20, fontSize: 20}}>Add a Product (Washing Machine)</button>
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity} 
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteItem={this.handleDeleteItem}
        />
        {loading && <h1>Loading Products ...</h1>}
        <div style={{padding: 10, fontSize: 20}}>
          Total: Rs.{this.getTotal()}
        </div>
      </div>
    );
  }
}

export default App;
