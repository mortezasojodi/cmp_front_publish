import PaymentForm from "./paymentForm";
import { Title } from "./signUp";

export const Payment = ({ onBack, onRegistrationSuccess }) => {
    return (
        <>
            <Title title={'Billing Details'} />
            <PaymentForm onBack={onBack} onRegistrationSuccess={onRegistrationSuccess} />
        </>
    );
};