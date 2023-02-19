import * as yup from 'yup';

export default function inputSchema(betBoosted) {
    return yup.object().shape({
        quotationOne: yup
            .number()
            .test('notZero', 'La cote 1 ne doit pas être égale à 0', (value) => value !== 0)
            .required(),
        quotationTwo: yup
            .number()
            .test('notZeroAndNotOne', 'La cote 2 ne doit pas être égale à 0 ou à 1', (value) => value !== 0 && value !== 1)
            .required(),
        betValue: yup
            .number()
            .nullable(true)
            .test(
                'notZeroIfBetBoosted',
                "La mise doit être renseignée si ce n'est pas une cote boostée",
                (value) => {
                    if (betBoosted === true) {
                        return true;
                    }

                    return value !== 0;
                }
            ),
    });
}