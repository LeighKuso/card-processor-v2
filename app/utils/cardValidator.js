import validator from "validator";
import { getCountries } from "../data/countries";

export default async function validateCard({ cardName, cardNumber, cardExpiry_y, cardExpiry_m, cardCVC, country }) {
    var errors = {};
    const BannedCountries = await getCountries();
    const currentDate = new Date(Date.now());

    if (validator.trim(cardName).length < 1) {
        errors.cardName = "This field is required."
    } else if (!validator.isAlpha(cardName)) {
        errors.cardName = "This field can't contain numbers.";
    }

    if (!validator.isNumeric(cardNumber) || !validator.isCreditCard(cardNumber)) {
        errors.cardNumber = "Invalid card number.";
    }

    if (cardExpiry_y < 23) {
        errors.cardExpiry = "Expired card!";
    }else if(cardExpiry_y == 23 && cardExpiry_m < currentDate.getMonth()) {
        errors.cardExpiry = "Expired card!";
    }

    if (cardCVC.length != 3) {
        errors.cardCVC = "This must be a 3 digit number.";
    }else if(!validator.isInt(cardCVC)){
        errors.cardCVC = "Invalid CVC!";
    }

    if (validator.isIn(country, BannedCountries)) {
        errors.country = "This country is banned!";
    }

    const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
    );
    if (hasErrors) {
        return errors;
    } else {
        return null;
    }
} 