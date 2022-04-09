/**
 * @param {Number} mise
 * @param {Number} q1
 * @param {Number} q2
 * @param {Boolean} reverse
 *
 * @return {Object}
 */
export const calculateNoBet = (mise, q1, q2, reverse = false) => {
	const bet2 = mise / q2;
	const bet1 = mise - bet2;
	const quotation = (bet1 * q1) / mise;
	const probability = 1 / quotation;

	let output = {
		bet1: trunc(bet1),
		bet2: trunc(bet2),
		quotation: trunc(quotation),
		gain: trunc(mise * quotation),
		gainNet: trunc(mise * quotation - mise),
		probability: trunc(probability < 1 ? probability : 1),
	};

	if (reverse) {
		output.bet1 = trunc(bet2);
		output.bet2 = trunc(bet1);
	}

	return output;
};

/**
 *
 * @param {Number} mise
 * @param {Number} q1
 * @param {Number} q2
 *
 * @return {Object}
 */
export const calculateOneOrTwo = (mise, q1, q2) => {
	const bet2 = (q1 * mise) / (q1 + q2);
	const bet1 = mise - bet2;
	const quotation = (q1 * q2) / (q1 + q2);
	const probability = 1 / quotation;

	return {
		bet1: trunc(bet1),
		bet2: trunc(bet2),
		quotation: trunc(quotation),
		gain: trunc(mise * quotation),
		gainNet: trunc(mise * quotation - mise),
		probability: trunc(probability < 1 ? probability : 1),
	};
};

/**
 *
 * @param {Number} value
 * @param {integer} digit
 *
 * @return {Number}
 */
export const trunc = (value, digit = 2) =>
	!isNaN(value) ? value.toFixed(digit) : value;

/**
 * @param {String} value
 *
 * @returns {Number}
 */
export const float = (value) => parseFloat(value.replace(',', '.'));
