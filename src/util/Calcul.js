/**
 * @param {Number} mise
 * @param {Number} q1
 * @param {Number} q2
 * @param {Boolean} boosted
 * @param {Boolean} reverse
 *
 * @return {Object}
 */
export const calculateNoBet = (mise, q1, q2, boosted, reverse = false) => {
	let bet1, bet2, quotationRef;

	if (boosted) {
		bet1 = mise !== 0 ? mise : 10;
		bet2 = reverse ? bet1 * (q2 - 1) : bet1 / (q2 - 1);
		mise = bet1 + bet2;
		quotationRef = (reverse ? bet2 : bet1) * q1;
	} else {
		bet2 = mise / q2;
		bet1 = mise - bet2;
		quotationRef = (bet1 * q1);
	}

	const quotation = quotationRef / mise;
	const probability = 1 / quotation;

	let output = {
		bet1: trunc(bet1),
		bet2: trunc(bet2),
		quotation: trunc(quotation),
		gain: trunc(mise * quotation),
		gainNet: trunc(mise * quotation - mise),
		probability: trunc(probability < 1 ? probability : 1),
	};

	if (reverse && !boosted) {
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
 * @param {Boolean} boosted
 *
 * @return {Object}
 */
export const calculateOneOrTwo = (mise, q1, q2, boosted = false) => {
	let bet1, bet2;

	if (boosted) {
		bet1 = mise !== 0 ? mise : 10;
		mise = bet1 * (q1 + q2) / q2;
		bet2 = mise - bet1;
	} else {
		bet2 = (q1 * mise) / (q1 + q2);
		bet1 = mise - bet2;
	}

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

/**
 * @param {String} value
 * 
 * @returns {Boolean}
 */
export const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
