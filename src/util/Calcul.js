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
	let bet1, bet2;

	if (boosted) {
		bet1 = 10;
		bet2 = bet1 / (q2 - 1);
		mise = bet1 + bet2;
	} else {
		bet2 = mise / q2;
		bet1 = mise - bet2;
	}

	//b1 = 10
	//q1 et q2
	// b1 * q1 = 10 * 2 = 20 € -> gain
	// b2 ? b1 + b2 = b2 * q2 => b1 = b2 * q2 - b2 => b2 = b1 / (q2 - 1)

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
 * @param {Boolean} boosted
 *
 * @return {Object}
 */
export const calculateOneOrTwo = (mise, q1, q2, boosted = false) => {
	let bet1, bet2;

	if (boosted) {
		bet1 = 10;
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
