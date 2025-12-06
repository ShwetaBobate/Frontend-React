import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "./Store";

function Orders() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (loading) return <h2>Loading orders...</h2>;
  if (error)   return <h2>Error: {error}</h2>;
  if (!orders?.length) return <h3>No orders found</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-center">Order History</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "15px 0",
            borderRadius: "8px",
          }}
        >
          <h3>Order ID: {order.id}</h3>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.OrderDate).toLocaleString()}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>

          <hr />

          <h4>Items:</h4>

          {order.items?.map((item, index) => (
            <div key={index} style={{ margin: "10px 0", display: "flex", gap: "15px" }}>
              
              <img 
                src={`http://localhost:3000${item.imageUrl}`}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />

              <div>
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
              </div>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
