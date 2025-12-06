import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "./Store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const dispatch = useDispatch();
  const [screen, setScreen] = useState("login");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { loading, error } = useSelector((state) => state.users);

  const navigate = useNavigate();

  // ---------------- REGISTER ----------------
  const handleRegister = (data) => {
    dispatch(registerUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        Swal.fire({
          title: "Registration Successful!",
          text: "Welcome to FoodVerse — enjoy your shopping🛍️!",
          icon: "success",
        });
        reset();
        setScreen("login");
      } else {
        Swal.fire({
          title: "Registration Failed",
          text: error || "Something went wrong.",
          icon: "error",
        });
      }

    });
  };

  // ---------------- LOGIN ----------------
  // const handleLogin = (data) => {
  //   dispatch(loginUser(data)).then((res) => {
  //     if (res.meta.requestStatus === "fulfilled") {
  //       Swal.fire({
  //         title: "Welcome Back!",
  //         text: "Happy shopping 💅🛍️",
  //         icon: "success",
  //       });
  //       reset();
  //     } else {
  //       Swal.fire({
  //         title: "Login Failed",
  //         text: error || "Invalid email or password",
  //         icon: "error",
  //       });
  //     }
  //   });
  // };
  const handleLogin = (data) => {
    dispatch(loginUser(data)).then((res) => {

      if (res.meta.requestStatus === "fulfilled") {
        const user = res.payload.user;  // <-- username access

        Swal.fire({
          title: `Welcome ${user.username}! 🩷`,
          text: "Happy shopping 💅🛍️",
          icon: "success",
        });

        reset();
        navigate("/checkout"); // <-- redirect

      } else {
        Swal.fire({
          title: "Login Failed",
          text: error || "Invalid email or password",
          icon: "error",
        });
      }
    });
  };


  return (
    <div className="min-h-screen flex justify-center items-center p-4 
                    bg-gradient-to-br from-pink-100 via-peach-200 to-pink-200 text-gray-700
">

      {/* GLASSMORPHIC CARD */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/40 
                      border border-white/30 shadow-2xl rounded-3xl p-10
                      animate-[fadeIn_0.6s_ease-in-out]">

        {/* LINKS */}
        <div className="flex justify-center gap-6 mb-6 text-lg font-semibold">
          <span
            onClick={() => setScreen("login")}
            className={`cursor-pointer ${screen === "login" ? " text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600" : "text-gray-600"
              }`}
          >
            Sign In
          </span>

          <span
            onClick={() => setScreen("register")}
            className={`cursor-pointer ${screen === "register" ? " text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600" : "text-gray-600"
              }`}
          >
            Register
          </span>
        </div>

        {/* SIGN IN */}
        {screen === "login" && (
          <div className="animate-[slideUp_0.4s_ease]">
            <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
              Heyy , Welcome Back !!😍
            </h2>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="border p-3 w-full rounded-xl bg-white/60 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="border p-3 w-full rounded-xl bg-white/60 focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-400 text-white py-3 w-full rounded-xl font-semibold 
                           hover:bg-blue-700 transition"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        )}

        {/* REGISTER */}
        {screen === "register" && (
          <div className="animate-[slideUp_0.4s_ease]">
            <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
              Create Account 🩷
            </h2>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                className="border p-3 w-full rounded-xl bg-white/60 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="border p-3 w-full rounded-xl bg-white/60 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Phone (10 digits)"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Phone must be 10 digits" },
                })}
                className="border p-3 w-full rounded-xl bg-white/60 focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}

              <input
                type="text"
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
                className="border p-3 w-full rounded-xl bg-white/60 focus:outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="border p-3 w-full rounded-xl bg-white/60 focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-400 text-white py-3 w-full rounded-xl font-semibold 
                           hover:bg-green-700 transition"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default RegisterUser;
