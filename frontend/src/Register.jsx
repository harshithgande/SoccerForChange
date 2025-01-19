import { useEffect, useState } from "react";
import { FormCard } from "./Apply";
import axios from "axios";
import { CheckoutForm } from "./Pay";
import {
  PaymentElement,
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function Register() {
  const [camps, setCamps] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.soccerforchange.org:444/api/camps")
      .then((response) => {
        setCamps(response.data);
      });
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="py-12 pb-32 px-8 md:px-24 sm:px-16 flex flex-col gap-12">
        <h1 className="text-3xl font-semibold">Available Camps</h1>
        {!camps || camps["camps"].length === 0 ? (
          <p className="h-screen">No camps at this time.</p>
        ) : (
          camps["camps"].map((camp, index) => (
            <CampCard {...camp} key={index} />
          ))
        )}
      </div>
    </div>
  );
}

function CampCard({ name, description, location, date, id }) {
  const [showPopUp, setShowPopUp] = useState(false);

  const arrow = (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path
        class="fill-white"
        d="M14.59 13H7a1 1 0 0 1 0-2h7.59l-2.3-2.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4l2.3-2.3z"
      ></path>
    </svg>
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-md flex flex-col lg:flex-row overflow-hidden w-fit">
        <img
          className="max-w-full lg:max-w-80 lg:max-h-full max-h-40 object-top object-cover"
          src="register.webp"
        />

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-4 px-8 pt-8 md:px-12 md:pt-12">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="max-w-[75ch]">{description}</p>
          </div>

          <div className="flex flex-wrap gap-y-8 text-sm justify-between pt-8 bg-gray-50 px-8 md:px-16 pb-8 items-center">
            <div className="flex flex-wrap items-center justify-between gap-x-16 gap-y-4">
              <div className="flex items-center">
                <svg className="fill-emerald-600 mr-1.5" width={24} height={24}>
                  <path d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="M12 1a9 9 0 0 1 6.36 15.36l-5.65 5.66a1 1 0 0 1-.71.3V13a3 3 0 0 0 0-6V1z" />
                </svg>

                <span className="font-semibold">{location || "TBD"}</span>
              </div>

              <div className="flex items-center">
                <svg className="mr-1.5" width={24} height={24}>
                  <circle cx="12" cy="12" r="10" className="fill-emerald-600" />
                  <path
                    className="fill-white"
                    d="M13 11.59l3.2 3.2a1 1 0 0 1-1.4 1.42l-3.5-3.5A1 1 0 0 1 11 12V7a1 1 0 0 1 2 0v4.59z"
                  />
                </svg>

                <span className="font-semibold">{date || "TBD"}</span>
              </div>
            </div>
            <button
              className="px-10 py-3.5 bg-emerald-600 rounded uppercase font-semibold text-white tracking-wider flex items-center"
              onClick={() => setShowPopUp(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <RegisterPopUp
        name={name}
        show={showPopUp}
        onClick={() => setShowPopUp(false)}
        id={id}
      />
    </>
  );
}

const stripePromise = loadStripe(
  "pk_live_51PqMxlP7WdKeFflaD5CcGaOMKNKi0qLQrea4YKPCBzYQUlR5u1gzRUZNNcwBB14mcko3EBuAbIe8m7CiaV8HZuEe00NqzMGX4J"
);

const options = {
  mode: "payment",
  amount: 1000,
  currency: "usd",
  appearance: {},
  paymentMethodTypes: ["card"],
  link: false,
};

function RegisterPopUp({ name, show, onClick, id }) {
  const fields = [
    {
      title: "email",
      placeholder: "johnjohnson@example.com",
    },
    {
      title: "campId",
      value: id,
    },
  ];

  return (
    <div
      onClick={onClick}
      className={`${
        show
          ? "opacity-100 bg-opacity-45 pointer-events-auto"
          : "opacity-0 bg-opacity-0 pointer-events-none"
      }  bg-black w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center transition-all`}
    >
      <div
        className="fixed max-w-[1000px]  w-full px-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
      <h2 className="absolute bottom-10 font-semibold text-white text-lg">
        Tap anywhere outside the form to dismiss
      </h2>
    </div>
  );
}
