import { useContext } from "react";
import { CartContext } from "../../components/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseInt(item.price.replace("₵", "")) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <section className="cart empty">
        <h2>Your cart is empty</h2>
        <p>Add some signature dishes to get started.</p>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <span className="qty">
                Qty: {item.quantity}
              </span>
            </div>

            <div className="cart-actions">
              <span className="price">{item.price}</span>
              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ₵{total}</h3>

        <div className="cart-buttons">
          <button className="clear" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="checkout">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
// End of file: rest/src/Pages/Cart/Cart.jsx