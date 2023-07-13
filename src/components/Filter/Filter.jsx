import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filtersSlice';

import css from './Filter.module.css';

const Filter = ({ filteredContacts }) => {
  const dispatch = useDispatch();

  const filter = useSelector(state => state.filter);

  const handleFilterChange = event => {
    const filterValue = event.target.value;
    dispatch(setFilter(filterValue));
  };

  return (
    <div className={css.wrapper}>
      <label className={css.label}>Search contact</label>
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

Filter.propTypes = {
  filteredContacts: PropTypes.func,
};

export default Filter;
