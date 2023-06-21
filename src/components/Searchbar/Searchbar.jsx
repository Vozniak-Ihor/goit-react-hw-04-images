import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { useState } from 'react';

export function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const onSend = event => {
    event.preventDefault();
    if (value === '') {
      alert('You have not entered anything');
      return;
    }
    onSubmit(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSend}>
        <button type="submit" className={css.SearchFormButton}>
          🔍
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={value}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
