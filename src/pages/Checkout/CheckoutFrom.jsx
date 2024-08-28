
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const CheckoutFrom = () => {

    const { biodataId } = useParams();
    const [userDb] = useUser();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const price = 5;


    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret);
            })
    }, [])




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error)
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('')
        }


        // confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: userDb?.email || 'anonymous'

                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log(paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                console.log(paymentIntent.id);

                // now save the payment in the database
                const checkout = {
                    email: userDb.email,
                    bioDataId: biodataId,
                    amount: price,
                    transactionId: transactionId,
                    date: new Date(), //utc date convert. use moment js to
                    status: 'pending'
                }

                const res = await axiosSecure.post('/checkout', checkout);
                console.log(res.data);
                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Checkout successfully Done",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // navigate('/dashboard/paymentHistory');
                }

            }
        }


    }
    return (

        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="border p-2"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />




            <button
                type="submit"
                disabled={!stripe || !clientSecret}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
                Submit
            </button>
            <p className="text-red-500">{error}</p>
        </form>
    );
};

export default CheckoutFrom;