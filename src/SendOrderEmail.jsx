import React from "react";
import emailjs from "@emailjs/browser";

function SendOrderEmail({ cartItems, finalAmount, tax, customerEmail, totalAmount, discountAmount ,shipping }) {

    const sendEmail = () => {

        const templateParams = {
            orders: cartItems.map(item => ({
                units: item.quantity,
                name: item.name,
                price: item.price,
                img: `${window.location.origin}/${item.img}`
            })),

            order_id: Date.now(),
            subtotal: totalAmount.toFixed(2),
            coupon: discountAmount,
            shipping:shipping,
            tax: tax.toFixed(2),

            total: finalAmount.toFixed(2),  // or finalAmount.toFixed(2)
            email: customerEmail

        };

        emailjs
            .send(
                "service_6f3jmgg",        // your EmailJS service ID
                "template_pitw1w6",       // your EmailJS template ID
                templateParams,
                "pX9Fqme0f-_DmbspW"         // your EmailJS public key
            )
            .then(
                (response) => {
                    console.log("SUCCESS!", response.status, response.text);
                    alert("Order email sent successfully!");
                },
                (error) => {
                    console.log("FAILED...", error);
                    alert("Failed to send email.");
                }
            );
    };

    return (
       <div className="flex justify-center mt-0">
         <button
            onClick={sendEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
            Send Order Email
        </button>
       </div>
    );
}

export default SendOrderEmail;
