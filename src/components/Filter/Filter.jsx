import PropTypes from 'prop-types';
import { SearchTitle, Search } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
// import { useState, useEffect } from 'react';

export const Filter = ({ onChange }) => {
  const dispatch = useDispatch();

  const value = useSelector(getFilter);

  const handleChange = e => {
    console.log(e.target.value);
    // setFilter(e.target.value);
    console.log(value);
    dispatch(setFilter(e.target.value));
  };

  return (
    <>
      <SearchTitle>Find contacts by name</SearchTitle>
      <Search type="text" onChange={handleChange} value={value} />
    </>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
