import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    alert("Order placed successfully!");
    setCart([]); // clear cart
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5" }}>
      <h1 style={{ textAlign: "center", padding: "10px", color:"black" }}>
        🛒 E-commerce App
      </h1>

      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        
        {/* PRODUCTS */}
        <div style={{ flex: 3 }}>
          <h2 style={{color:"black"}}>Products</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  style={{ height: "120px", objectFit: "cover" }}
                />
                <h4 style={{ fontSize: "14px" }}>{p.title}</h4>
                <p style={{ fontWeight: "bold" }}>₹{p.price}</p>

                <button
                  onClick={() => addToCart(p)}
                  style={{
                    padding: "8px 12px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CART */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: "10px",
            padding: "15px",
            height: "fit-content",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{color:"black"}}>Cart ({cart.length})</h2>

          {cart.length === 0 ? (
            <p>No items</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "5px",
                  }}
                >
                  <span style={{ fontSize: "13px" }}>{item.title}</span>
                  <span>
                    ₹{item.price}
                    <button
                      onClick={() => removeFromCart(index)}
                      style={{
                        marginLeft: "5px",
                        background: "red",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      ❌
                    </button>
                  </span>
                </div>
              ))}

              {/* TOTAL */}
              <h3 style={{ marginTop: "10px" }}>Total: ₹{total.toFixed(2)}</h3>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={handleCheckout}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "10px",
                  background: "green",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Checkout 🛍️
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}