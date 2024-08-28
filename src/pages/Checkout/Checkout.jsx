import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFrom from "./CheckoutFrom";


// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Checkout = () => {




    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {/* Banner Section */}
            <div className="w-full bg-blue-600 text-white text-center py-10">
                <h1 className="text-4xl font-bold">Checkout</h1>
                <p className="mt-2 text-lg">Secure your contact request with a $5 payment</p>
            </div>

            {/* Checkout Form */}
            <div className="w-full max-w-lg mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">This is checkout</h2>
                <Elements stripe={stripePromise}>
                    <CheckoutFrom></CheckoutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;