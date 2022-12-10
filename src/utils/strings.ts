export const capitalize = (v: string) =>
	v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();

export const formatNumber = (value: number): string => {
	return Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
		maximumFractionDigits: 1,
	}).format(value);
}

export const truncateString = (value: string, maxLength: number): string => {
	if (value.length <= maxLength) {
		return value;
	}

	return value.slice(0, maxLength - 1) + '\u2026';
}

/**
 * Truncates a string to a specified length, adding a separator in the middle.
 * @example
 * ```ts
 * truncateStringMiddle('Hello, world!', 10) // 'Hel…rld!'
 * truncateStringMiddle('Hello, world!', 10, '...') // 'Hel...rld!'
 * ```
 */
export const truncateStringMiddle = (
	value: string,
	maxLength: number,
	separator: string = '\u2026'
): string => {
	if (value.length <= maxLength) { return value; }

	const charsToShow = maxLength - separator.length;
	const frontChars = Math.ceil(charsToShow/2);
	const backChars = Math.floor(charsToShow/2);

	return value.substr(0, frontChars) +
		separator +
		value.substr(value.length - backChars);
}

/**
 * Checks whether or not the input is `null` or an empty string, `''`
 * @example
 * ```ts
 * stringIsNullOrEmpty(null) // true
 * stringIsNullOrEmpty(undefined) // true
 * stringIsNullOrEmpty('') // true
 * ```
 */
export const stringIsNullOrEmpty = (value?: String|null): boolean => {
	return value === null
		|| value === undefined
		|| (typeof value === 'string' && value.length === 0 && value === '');
}

export const snakeCaseToTitleCase = (value: string): string => {
	return value.split('_').map(capitalize).join(' ');
}
