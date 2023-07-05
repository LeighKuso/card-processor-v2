import validator from "validator";
import { getCountries } from "../data/countries";

export default async function validateCard({ cardName, cardNumber, cardExpiry, cardCVC, country }) {
    var errors = { };
    const BannedCountries = await getCountries();

    if (!validator.isAlpha(cardName)) {
        errors.cardName = "This field can't contain numbers.";
    }
    
    if (!validator.isNumeric(cardNumber) || !validator.isCreditCard(cardNumber)) {
        errors.cardNumber = "Invalid card number.";
    }
    if (!validator.isAfter(cardExpiry) || !validator.isDate(cardExpiry, {format: "mm/yy"})) {
        errors.cardExpiry = "Invalid expiry date. The date must be in the future and have the format MM/YY ";
    }

    if (!!validator.isInt(cardCVC)) {
        errors.cardCVC = "Invalid CVC. This can only be numbers.";
    }

    if (validator.isIn(country, BannedCountries)) {
        errors.country = "This country is banned!";
    }
    

    const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
    );
    if (hasErrors) {
        return errors;
    }else{
        return null;
    }
} 