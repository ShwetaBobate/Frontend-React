import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./axiosConfig";
// import { fetchAllProducts } from "../backend/ProductService";
// const BASE_URL = "http://localhost:3000/API/v1/orders";


export const Coupons = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME: 5,
  FESTIVE25: 25
};

// ---------------- CART SLICE ----------------
const cartslice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      let item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      let index = state.findIndex((i) => i.id === action.payload);
      if (index !== -1) state.splice(index, 1);
    },

    incrementQty: (state, action) => {
      let index = state.findIndex((i) => i.id === action.payload);
      if (index !== -1) state[index].quantity += 1;
    },

    decrementQty: (state, action) => {
      let index = state.findIndex((i) => i.id === action.payload);
      if (index !== -1) {
        if (state[index].quantity > 1) state[index].quantity -= 1;
        else state.splice(index, 1);
      }
    }
  }
});

// ---------------- COUPON SLICE ----------------
const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: "",
    discount: 0, // % from coupon
    applied: false,
    message: ""
  },
  reducers: {
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase();

      if (Coupons[code]) {
        state.code = code;
        state.discount = Coupons[code];
        state.applied = true;
        state.message = `Coupon ${code} applied! (${Coupons[code]}% OFF)`;
      } else {
        state.code = "";
        state.discount = 0;
        state.applied = false;
        state.message = "Invalid Coupon Code ❌";
      }
    }
  }
});

// export const fetchVegItems = createAsyncThunk(
//   "veg/fetchVegProduct",
//   async () => {
//     const response = await API.get("/API/v1/veg/getVegItems");
//     return response.data;
//   }
// );
export const fetchVegItems = createAsyncThunk(
  "veg/fetchVegProduct",
  async () => {
const token = localStorage.getItem("token");

    const response = await API.get("/api/v1/veg/getVegItems", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  }
);

const vegSlice = createSlice({
  name: "veg",
  initialState: {
    vegItems: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.
      addCase(fetchVegItems.fulfilled, (state, action) => {
        state.loading = false;
        state.vegItems = action.payload;
      })
      .addCase(fetchVegItems.pending, state => {
        state.loading = true;
      })
      .addCase(fetchVegItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
})

// Async thunk to fetch non-veg items
export const fetchNonVegItems = createAsyncThunk(
  "nonVeg/fetchNonVegItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/v1/nonVeg/getNonVegItems");
      console.log("NON-VEG API RESPONSE:", response.data);

      return response.data; // assuming backend returns array of items
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const nonVegSlice = createSlice({
  name: "nonVeg",
  initialState: {
    nonVegItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    // optional: you can add reducers like addToCart here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNonVegItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNonVegItems.fulfilled, (state, action) => {
        state.loading = false;
        state.nonVegItems = action.payload;
      })
      .addCase(fetchNonVegItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});






// =========================
// THUNK → placeOrder
// =========================
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        "/api/v1/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data; // backend returns { message, result }
      
    } catch (error) {
      return rejectWithValue(error.response.data || "Order failed");
    }
  }
);


// =========================
// THUNK → getAllOrders
// =========================
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
 const response = await API.get(
        "/api/v1/orders",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );; // GET all orders
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);



//=========================================================
// ⭐ BEST PRACTICE (Recommended)
// 🟢 Keep everything in one slice → orderSlice

// Inside one slice, handle:

// placeOrder (POST)

// getAllOrders (GET)

// updateOrder (PUT)

// updateOrderStatus (PATCH)

// deleteOrder (DELETE)
//==========================================================

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],       // for GET all orders
    lastOrder: null,  // for POST order
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // PLACE ORDER
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload; // store placed order only
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL ORDERS
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // store all orders list
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// =========================
// THUNK → registerUser
// =========================


export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/v1/registerUser", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);
// =========================
// THUNK → loginUser
// =========================

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/v1/login", userData);
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    token:localStorage.getItem("token")|| null,
    user: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
  builder

    // REGISTER
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
       // Save JWT token in localStorage
       localStorage.setItem("token", action.payload.token);
      state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // LOGIN
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      // Save JWT token in localStorage
       localStorage.setItem("token", action.payload.token);
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
 
});

// =========================
// Checkout slice
// =========================


const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    total: 0,
    discountAmount: 0,
    gst: 0,
    shipping: 0,
    finalAmount: 0,
  },
  reducers: {
    saveCheckoutData: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});



// ---------------- EXPORT ACTIONS ----------------
export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartslice.actions;

export const { applyCoupon } = couponSlice.actions;
export const {saveCheckoutData}=checkoutSlice.actions;

// ---------------- STORE ----------------
const store = configureStore({
  reducer: {
    cart: cartslice.reducer,
    coupon: couponSlice.reducer,
    veg: vegSlice.reducer,
    orders:orderSlice.reducer,
    nonVeg:nonVegSlice.reducer,
    users:userSlice.reducer,
    checkout:checkoutSlice.reducer

  }
});

export default store;
