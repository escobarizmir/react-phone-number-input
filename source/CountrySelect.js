import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default function CountrySelect({
	value,
	onChange,
	options,
	className,
	iconComponent: Icon,
	selectArrowComponent: SelectArrow,
	...rest
}) {
	const onChange_ = useCallback((event) => {
		const value = event.target.value
		onChange(value === 'ZZ' ? undefined : value)
	}, [onChange])

	const selectedOption = useMemo(() => {
		for (const option of options) {
			if (!option.divider && option.value === value) {
				return option
			}
		}
	}, [options, value])

	return (
		<div className="PhoneInputCountry">
			{selectedOption &&
				<Icon country={value}/>
			}

			<select
				{...rest}
				value={value || 'ZZ'}
				onChange={onChange_}
				className="PhoneInputCountrySelect">
				{options.map(({ value, label, divider }) => (
					<option
						key={divider ? '|' : value || 'ZZ'}
						value={divider ? '|' : value || 'ZZ'}
						disabled={divider ? true : false}
						className={divider ? 'PhoneInputCountrySelectDivider' : undefined}>
						{label}
					</option>
				))}
			</select>

			<SelectArrow/>
		</div>
	)
}

CountrySelect.propTypes = {
	// A two-letter country code.
	// E.g. "US", "RU", etc.
	value: PropTypes.string,

	// Updates the `value`.
	onChange: PropTypes.func.isRequired,

	// `<select/>` options.
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string,
		label: PropTypes.string,
		divider : PropTypes.bool
	})).isRequired,

	// Country flag component.
	iconComponent: PropTypes.elementType,

	// Select arrow component.
	selectArrowComponent: PropTypes.elementType.isRequired
}

CountrySelect.defaultProps = {
	selectArrowComponent: () => <div className="PhoneInputCountrySelectArrow"/>
}
