import React from 'react';
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";
import {PaymentEdit} from "../componets/payment";

const STRIPE_PUBLIC_KEY = "pk_test_51Hvvt2HWpPeQiyZ0kRRcQvJCQXRLOCxlchdXJOzjEPqphASy3oMFEuVgVm3haFGTgll8vGybU6Gpu7CfIJ7h3sDT00zkWLDql9" ;

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentEdit />
        </Elements>
    );
};
export default CheckoutWrapper;