import { stripe } from "../config/stripe";

export class PaymentService {
    static async createPaymentIntent(amount: number, currency: string) {
        return await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ["card"],
        });
    }
}
