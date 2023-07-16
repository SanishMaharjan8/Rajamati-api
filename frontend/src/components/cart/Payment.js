import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'

//import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert();
    //const stripe = useStripe();
    //const elements = useElements();
    const dispatch = useDispatch();
    const [payment_type, setPaymentType] = useState('');

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    // const submitHandler = async (e) => {
    //     e.preventDefault();

    //     document.querySelector('#pay_btn').disabled = true;

    //     let res;
    //     try {

    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }

    //         res = await axios.post('/api/v1/payment/process', paymentData, config)

    //         const clientSecret = res.data.client_secret;

    //         console.log(clientSecret);

    //         if (!stripe || !elements) {
    //             return;
    //         }

    //         const result = await stripe.confirmCardPayment(clientSecret, {
    //             payment_method: {
    //                 card: elements.getElement(CardNumberElement),
    //                 billing_details: {
    //                     name: user.name,
    //                     email: user.email
    //                 }
    //             }
    //         });

    //         if (result.error) {
    //             alert.error(result.error.message);
    //             document.querySelector('#pay_btn').disabled = false;
    //         } else {

    //             // The payment is processed or not
    //             if (result.paymentIntent.status === 'succeeded') {

    //                 order.paymentInfo = {
    //                     id: result.paymentIntent.id,
    //                     status: result.paymentIntent.status
    //                 }

    //                 dispatch(createOrder(order))

    //                 history.push('/success')
    //             } else {
    //                 alert.error('There is some issue while payment processing')
    //             }
    //         }


    //     } catch (error) {
    //         document.querySelector('#pay_btn').disabled = false;
    //         alert.error(error.response.data.message)
    //     }
    // }

    const submitHandler = async (e) => {
            e.preventDefault();      
            order.paymentInfo = {
                 type: e.target.elements.orderType.value,
                 status: "succeeded"
             }
            dispatch(createOrder(order))
            history.push('/success')    
            
            document.querySelector('#pay_btn').disabled = true;
    }
    const [radioValue, setRadiovalue] = useState("");

    // useState will not execute any kind of callback function, for this case you need to use useEffect
  
    const changeSelection = (e)=>{
      setRadiovalue(e.target.value);
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Payment Type</h1>
                        <div className="form-group">
                            <input type="radio" id="delivery" name="orderType" value="delivery" required onChange={changeSelection} checked={radioValue === 'delivery'} />
                            <label htmlFor="delivery">Delivery</label>                        
                            <input type="radio" id="pick" name="orderType" value="pick" onChange={changeSelection} checked={radioValue === 'pick'} />
                            <label htmlFor="pick">Pick Up</label>
                        </div>               
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment
