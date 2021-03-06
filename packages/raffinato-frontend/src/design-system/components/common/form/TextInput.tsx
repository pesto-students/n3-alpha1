import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TextInput(props: {
  placeholder: string;
  theme: string;
  responsive: boolean;
  error: boolean;
  helperText: string;
  onChange?: (e: any) => void;
  name: string;
  value?: any;
}) {
  const [focus, setFocus] = useState(false);
  const {
    theme,
    responsive,
    placeholder,
    error,
    helperText,
    onChange,
    name,
    value,
  } = props;
  const themeClassName = `rf-text-input-theme-${theme}`;
  const responsiveClassName = responsive ? 'rf-text-input-responsive' : '';
  const errorClassName = error ? 'rf-input-errored' : 'rf-input-errored--false';
  const focusClassName = focus ? `rf-text-input-focussed` : null;

  const finalClassName = [
    'rf-text-input-wrapper',
    'rf-text-input-base',
    themeClassName,
    responsiveClassName,
    focusClassName,
  ].join(' ');

  return (
    <div className={errorClassName}>
      <div className={finalClassName}>
        <label htmlFor={name}>
          <input
            type="text"
            name={name}
            value={value || ''}
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={onChange}
          />
        </label>
      </div>
      {error ? <p className="rf-input-error-text">{error}</p> : null}
      {helperText ? <p className="rf-input-helper-text">{helperText}</p> : null}
    </div>
  );
}

TextInput.propTypes = {
  theme: PropTypes.string,
  placeholder: PropTypes.string,
  responsive: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
};

TextInput.defaultProps = {
  placeholder: '',
  theme: 'dark',
  responsive: true,
  error: null,
  helperText: '',
  onChange: () => null,
};
