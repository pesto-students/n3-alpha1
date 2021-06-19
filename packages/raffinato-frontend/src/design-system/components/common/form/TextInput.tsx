import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TextInput(props: {
  placeholder: string;
  theme: string;
  responsive: boolean;
  hasError: boolean;
  helperText: string;
  onChange: (e: any) => {};
}) {
  const [focus, setFocus] = useState(false);
  const { theme, responsive, placeholder, hasError, helperText, onChange } =
    props;
  const themeClassName = `rf-text-input-theme-${theme}`;
  const responsiveClassName = responsive ? 'rf-text-input-responsive' : '';
  const errorClassName = hasError ? 'rf-input-errored' : '';
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
        <input
          type="text"
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={onChange}
        />
      </div>
      {helperText ? <p className="rf-input-helper-text">{helperText}</p> : null}
    </div>
  );
}

TextInput.propTypes = {
  theme: PropTypes.string,
  placeholder: PropTypes.string,
  responsive: PropTypes.bool,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
  helperText: PropTypes.string,
};

TextInput.defaultProps = {
  placeholder: '',
  theme: 'dark',
  responsive: true,
  hasError: false,
  helperText: '',
  onChange: () => null,
};
