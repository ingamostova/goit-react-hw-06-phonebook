import { SearchTitle, Search } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(getFilter);

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <>
      <SearchTitle>Find contacts by name</SearchTitle>
      <Search type="text" onChange={handleChange} value={value} />
    </>
  );
};
