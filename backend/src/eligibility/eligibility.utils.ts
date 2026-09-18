
/**
 * Calculates completed years as of a given date.
 *
 * Dates of birth are stored as date-only values at UTC midnight.  Using UTC
 * calendar fields prevents the answer changing with the server's timezone.
 */
export const calculateAge = (dateOfBirth: Date, asOf: Date = new Date()): number => {
    let age = asOf.getUTCFullYear() - dateOfBirth.getUTCFullYear();

    const birthdayHasOccurred =
        asOf.getUTCMonth() > dateOfBirth.getUTCMonth() ||
        (asOf.getUTCMonth() === dateOfBirth.getUTCMonth() &&
            asOf.getUTCDate() >= dateOfBirth.getUTCDate());

    if (!birthdayHasOccurred) {
        age--;
    }

    return age;
};
