import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // New state for loading spinner

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    setIsProcessing(true); // Show spinner when button is clicked
    setErrorMessage(null); // Clear previous errors

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setIsProcessing(false); // Stop spinner if error occurs
        return;
      }

      const res = await fetch(
        "https://api.soccerforchange.org:444/create-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const { client_secret: clientSecret } = await res.json();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "https://www.soccerforchange.org/success",
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false); // Stop spinner if error occurs
      } else {
        setSuccessMessage("Payment successful! Thank you for your purchase.");
        // Redirect happens automatically because of return_url
      }
    } catch (error) {
      setErrorMessage(
        error.message || "An unexpected error occurred. Try again later."
      );
      setIsProcessing(false); // Stop spinner if error occurs
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-8 rounded-xl flex flex-col gap-4"
    >
      <PaymentElement />

      <div className="text-[15px] w-full flex flex-col gap-0.5">
        <p>Receipt Email</p>
        <input
          className="p-3 border rounded-[5px] shadow-sm placeholder:text-gray-500 w-full"
          type="text"
          placeholder={"address@example.com"}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className={`px-6 py-3 ${
          !stripe || !elements || isProcessing
            ? "bg-gray-400"
            : "bg-emerald-600"
        } rounded uppercase text-sm font-semibold text-white tracking-wider flex items-center justify-center w-fit`}
      >
        {isProcessing ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        ) : (
          "Pay Now - $10"
        )}
      </button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && (
        <div className="text-green-500 text-center mt-4">{successMessage}</div>
      )}
    </form>
  );
};

export function PaymentSuccess() {
  const check = (
    <svg className="w-24 h-24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" class="primary fill-emerald-600"></circle>
      <path
        class="secondary fill-white"
        d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
      ></path>
    </svg>
  );

  return (
    <div className="w-full h-full py-20 flex justify-center">
      <div className="shadow-lg border h-fit flex flex-col py-20 px-6 rounded-xl  items-center gap-8">
        {check}
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold text-3xl">Payment Successful</h2>
          <p className="max-w-[40ch] text-center">
            Thank you for your payment. A receipt will be sent to the email you
            specified shortly.
          </p>
        </div>
      </div>
    </div>
  );
}
