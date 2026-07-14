

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "./Store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const dispatch = useDispatch();
  const [screen, setScreen] = useState("login");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { loading, error } = useSelector((state) => state.users);

  const navigate = useNavigate();

  // ---------------- REGISTER ----------------
  const handleRegister = (data) => {
    dispatch(registerUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        Swal.fire({
          title: "Registration Successful!",
          text: "Welcome to FoodVerse — enjoy your shopping!",
          icon: "success",
        });

        reset();
        navigate("/home");
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
  const handleLogin = (data) => {
    dispatch(loginUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const user = res.payload.user;

        Swal.fire({
          title: `Welcome ${user.username}!`,
          text: "Happy Shopping!",
          icon: "success",
        });

        reset();
        navigate("/home");
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
    <div
      className="min-h-screen flex justify-center items-center p-2 overflow-y-auto
  bg-gradient-to-br from-slate-100 via-gray-100 to-blue-100"
    >
      {/* CARD */}
      <div
        className="w-full max-w-[340px] backdrop-blur-xl bg-white/80
  border border-gray-200 shadow-xl rounded-xl p-4"
      >
        {/* LOGO / BRAND */}
        <div className="text-center mb-3">
          <p className="text-black text-2xl font-bold tracking-wide">
            FOODVERSE
          </p>

          <p className="text-gray-500 text-xs mt-1">
            Fresh Food Delivered Fast
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-6 mb-4">          <button
          onClick={() => setScreen("login")}
          className={`font-semibold transition-all duration-300 pb-2 ${screen === "login"
            ? "text-black border-b-2 border-black"
            : "text-gray-500 hover:text-blue-500"
            }`}
        >
          Sign In
        </button>

          <button
            onClick={() => setScreen("register")}
            className={`font-semibold transition-all duration-300 pb-2 ${screen === "register"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-500"
              }`}
          >
            Register
          </button>
        </div>

        {/* LOGIN FORM */}
        {screen === "login" && (
          <div className="animate-[slideUp_0.4s_ease]">
            <h2 className="text-lg font-bold text-center text-gray-800">
              Welcome Back
            </h2>

            <p className="text-center text-gray-500 text-xs mt-1 mb-3">
              Sign in to continue shopping
            </p>

            <form
              onSubmit={handleSubmit(handleLogin)}
              className="space-y-2"
            >
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300
        bg-white text-black placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.email && (
                <p className="text-red-500 text-xs">
                  {errors.email.message}
                </p>
              )}

              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300
        bg-white text-black placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2 rounded-lg font-semibold text-white
        bg-blue-600 hover:bg-blue-700 transition-all duration-300"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        )}
        {/* REGISTER FORM */}
        {screen === "register" && (
          <div className="animate-[slideUp_0.4s_ease]">
            <h2 className="text-xl font-bold text-center text-gray-800">
              Create Your Account
            </h2>

            <p className="text-center text-gray-500 text-sm mt-1 mb-4">
              Join FoodVerse and start shopping today
            </p>

            <form
              onSubmit={handleSubmit(handleRegister)}
              className="space-y-2"
            >
              {/* Username */}
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300
bg-white text-black placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300
bg-white text-black placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone must be 10 digits",
                    },
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300
bg-white text-black placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300
bg-white text-black placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300
bg-white text-black placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg font-semibold text-white
        bg-slate-700 hover:bg-slate-800
        transition-all duration-300 shadow-md"
              >
                {loading ? "Registering..." : "Create Account"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.96);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            } 
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default RegisterUser;
