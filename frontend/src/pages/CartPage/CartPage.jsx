import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import ClipLoader from "react-spinners/ClipLoader";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
    loading,
  } = useCart();

  const [actionLoading, setActionLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading your cart...");

  useEffect(() => {
    fetchCart();
  }, []);

  const items = cart?.items || [];
  const navigate = useNavigate();

  const handleUpdateQuantity = async (productId, type) => {
    setActionLoading(true);
    setLoadingText("Updating item...");
    try {
      await updateQuantity(productId, type);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setTimeout(() => setActionLoading(false), 400); // smoother UX
    }
  };

  const handleRemoveFromCart = async (productId) => {
    setActionLoading(true);
    setLoadingText("Removing item...");
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setTimeout(() => setActionLoading(false), 400);
    }
  };

  const handleClearCart = async () => {
    setActionLoading(true);
    setLoadingText("Clearing your cart...");
    try {
      await clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setTimeout(() => setActionLoading(false), 400);
    }
  };

  if (loading)
    return (
      <div className="loading-overlay">
        <ClipLoader color="#ffffff" size={50} />
        <p className="loader-text">{loadingText}</p>
      </div>
    );

  return (
    <>
      {actionLoading && (
        <div className="loading-overlay">
          <ClipLoader color="#ffffff" size={50} />
          <p className="loader-text">{loadingText}</p>
        </div>
      )}

      <div className="cart-page">
        <h2>Your Cart ({cartCount} items)</h2>

        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="cart-item-img"
                  />

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>₦{item.price?.toLocaleString()}</p>
                  </div>

                  <div className="cart-quantity-controls">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, "decrease")}
                      disabled={item.quantity <= 1 || actionLoading}
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, "increase")}
                      disabled={actionLoading}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="remove-btn"
                    disabled={actionLoading}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button
                className="clear-cart-btn"
                onClick={handleClearCart}
                disabled={actionLoading}
              >
                🧹 Clear Cart
              </button>
            </div>

            <div className="cart-summary">
              <h3>
                Total: ₦
                {items
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toLocaleString()}
              </h3>
              <button
                className="checkout-btn"
                disabled={actionLoading}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;








// src/pages/CartPage/CartPage.jsx
// import React, { useEffect, useState } from "react";
// import { useCart } from "../../Context/CartContext";
// import ClipLoader from "react-spinners/ClipLoader";
// import "./CartPage.css";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; 
// const CartPage = () => {
//   const {
//     cart,
//     cartCount,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     fetchCart,
//     loading,
//     error, // Add this from your CartContext
//   } = useCart();

//   const [actionLoading, setActionLoading] = useState(false);
//   const [loadingText, setLoadingText] = useState("Loading your cart...");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // Handle authentication errors
//   useEffect(() => {
//     if (error && (error.includes('401') || error.includes('authentication'))) {
//       toast.error('Please login to access your cart');
//       navigate('/login');
//     }
//   }, [error, navigate]);

//   const items = cart?.items || [];

//   const handleUpdateQuantity = async (productId, type) => {
//     setActionLoading(true);
//     setLoadingText("Updating item...");
    
//     try {
//       await updateQuantity(productId, type);
//       toast.success(`Item ${type === 'increase' ? 'added' : 'removed'}`);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
      
//       // Handle specific error types
//       if (error.response?.status === 401) {
//         toast.error('Please login to update your cart');
//         navigate('/login');
//       } else if (error.response?.status === 404) {
//         toast.error('Item not found in cart');
//         fetchCart(); // Refresh cart to sync
//       } else {
//         toast.error('Failed to update item quantity');
//       }
//     } finally {
//       setTimeout(() => setActionLoading(false), 400);
//     }
//   };

//   const handleRemoveFromCart = async (productId) => {
//     setActionLoading(true);
//     setLoadingText("Removing item...");
    
//     try {
//       await removeFromCart(productId);
//       toast.success('Item removed from cart');
//     } catch (error) {
//       console.error("Error removing from cart:", error);
      
//       if (error.response?.status === 401) {
//         toast.error('Please login to modify your cart');
//         navigate('/login');
//       } else {
//         toast.error('Failed to remove item from cart');
//       }
//     } finally {
//       setTimeout(() => setActionLoading(false), 400);
//     }
//   };

//   const handleClearCart = async () => {
//     // Add confirmation dialog
//     if (!window.confirm('Are you sure you want to clear your entire cart?')) {
//       return;
//     }

//     setActionLoading(true);
//     setLoadingText("Clearing your cart...");
    
//     try {
//       await clearCart();
//       toast.success('Cart cleared successfully');
//     } catch (error) {
//       console.error("Error clearing cart:", error);
      
//       if (error.response?.status === 401) {
//         toast.error('Please login to clear your cart');
//         navigate('/login');
//       } else {
//         toast.error('Failed to clear cart');
//       }
//     } finally {
//       setTimeout(() => setActionLoading(false), 400);
//     }
//   };

//   const handleCheckout = () => {
//     if (items.length === 0) {
//       toast.error('Your cart is empty');
//       return;
//     }
//     navigate("/checkout");
//   };

//   // Show error state if there's a persistent error
//   if (error && !loading) {
//     return (
//       <div className="cart-page">
//         <div className="error-state">
//           <h2>Unable to Load Cart</h2>
//           <p>Please try refreshing the page or login again.</p>
//           <button onClick={() => fetchCart()} className="retry-btn">
//             Try Again
//           </button>
//           <button onClick={() => navigate('/login')} className="login-btn">
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="loading-overlay">
//         <ClipLoader color="#ffffff" size={50} />
//         <p className="loader-text">{loadingText}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {actionLoading && (
//         <div className="loading-overlay">
//           <ClipLoader color="#ffffff" size={50} />
//           <p className="loader-text">{loadingText}</p>
//         </div>
//       )}

//       <div className="cart-page">
//         <div className="cart-header">
//           <h2>Your Cart ({cartCount} items)</h2>
//           {items.length > 0 && (
//             <button
//               className="continue-shopping-btn"
//               onClick={() => navigate('/menu')}
//             >
//               ← Continue Shopping
//             </button>
//           )}
//         </div>

//         {items.length === 0 ? (
//           <div className="empty-cart-container">
//             <div className="empty-cart-icon">🛒</div>
//             <p className="empty-cart">Your cart is empty.</p>
//             <button
//               className="start-shopping-btn"
//               onClick={() => navigate('/menu')}
//             >
//               Start Shopping
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="cart-items">
//               {items.map((item) => (
//                 <div className="cart-item" key={item._id}>
//                   <img
//                     src={item.image || "/placeholder.png"}
//                     alt={item.name}
//                     className="cart-item-img"
//                     onError={(e) => {
//                       e.target.src = "/placeholder.png";
//                     }}
//                   />

//                   <div className="cart-item-details">
//                     <h3>{item.name}</h3>
//                     <p className="item-price">₦{item.price?.toLocaleString()}</p>
//                     <p className="item-subtotal">
//                       Subtotal: ₦{(item.price * item.quantity).toLocaleString()}
//                     </p>
//                   </div>

//                   <div className="cart-quantity-controls">
//                     <button
//                       onClick={() => handleUpdateQuantity(item.productId, "decrease")}
//                       disabled={item.quantity <= 1 || actionLoading}
//                       className="quantity-btn decrease"
//                       title={item.quantity <= 1 ? "Cannot decrease below 1" : "Decrease quantity"}
//                     >
//                       –
//                     </button>
//                     <span className="quantity-display">{item.quantity}</span>
//                     <button
//                       onClick={() => handleUpdateQuantity(item.productId, "increase")}
//                       disabled={actionLoading}
//                       className="quantity-btn increase"
//                       title="Increase quantity"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => handleRemoveFromCart(item.productId)}
//                     className="remove-btn"
//                     disabled={actionLoading}
//                     title="Remove item from cart"
//                   >
//                     🗑️ Remove
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="cart-actions">
//               <button
//                 className="clear-cart-btn"
//                 onClick={handleClearCart}
//                 disabled={actionLoading}
//                 title="Clear all items from cart"
//               >
//                 🧹 Clear Cart
//               </button>
//             </div>

//             <div className="cart-summary">
//               <div className="summary-details">
//                 <div className="summary-row">
//                   <span>Items ({cartCount}):</span>
//                   <span>₦{items.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}</span>
//                 </div>
//                 <div className="summary-row total">
//                   <span>Total:</span>
//                   <span>₦{items.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}</span>
//                 </div>
//               </div>
              
//               <button
//                 className="checkout-btn"
//                 disabled={actionLoading || items.length === 0}
//                 onClick={handleCheckout}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartPage;

