import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin, // Redirect user after successful payment
      },
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log("Payment Successful:", paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-md transition w-full"
      >
        Pay ${totalAmount} Now
      </button>
    </form>
  );
}
