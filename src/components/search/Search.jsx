import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { APIBase } from '../../store/reducers/api';
import './search.css';
const Search = ({ route, title }) => {
  const [searchText, setSearchText] = useState('');
  // const [data, setData] = useState([]);
  const searchHandler = e => {
    if (e.key === 'Enter') {
      axios
        .get(`${APIBase}${route}/search`, {
          params: {
            text: searchText,
            limit: 0,
          },
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <div className='search'>
      <input
        type='text'
        className='px-5 '
        placeholder={`Search by ${title} title...`}
        onKeyDown={searchHandler}
        onChange={e => setSearchText(e.target.value)}
      />
      <BiSearch />
    </div>
  );
};

export default Search;
