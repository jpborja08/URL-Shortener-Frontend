import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const FormInput = ({
  register,
  name,
  placeholder = '',
  errors = '',
  type = 'text',
}) => {
  if (type === 'textarea') {
    return (
      <>
        <label htmlFor={name}>{placeholder}</label>
        <textarea
          {...register(name)}
          placeholder={placeholder}
          type={type}
          id={name}
          className={errors ? 'input-error' : ''}
        />
        {errors[name] && (
          <p className="form-container__error-message" role="alert">{errors[name].message}</p>
        )}
      </>
    );
  }

  return (
    <>
      <label htmlFor={name}>{placeholder}</label>
      <input
        {...register(name)}
        placeholder={placeholder}
        type={type}
        id={name}
        className={errors ? 'input-error' : ''}
      />
      {errors[name] && (
          <p className="form-container__error-message" role="alert">{errors[name].message}</p>
        )}
    </>
  );
};

FormInput.propTypes = {
  errors: PropTypes.array,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default FormInput;
