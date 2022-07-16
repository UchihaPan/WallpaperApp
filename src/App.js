import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import Photo from './Photo';
const clientID = `?client_id=zcNDURmpu0GeliDfYxcHshCkKeC7M1IO8AEM5awDyIw`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;


function App() {
  const [loading, setloading] = useState(false);
  const [photos, setphotos] = useState([]);
  const [page, setpage] = useState(1);
  const [query, setquery] = useState('');
  const mounted = useRef(false);
  const [newimages, setnewimages] = useState(false);
  const fetchImages = async () => {
    setloading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setphotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setnewimages(false);
      setloading(false);
    } catch (error) {
      setnewimages(false);

      setloading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newimages) return;
    if (loading) return;
    setpage((oldPage) => oldPage + 1);
  }, [newimages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 12) {
      setnewimages(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', event);
    return () => window.removeEventListener('scroll', event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
    }
    setpage(1);
  };
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='search'
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className='form-input'
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
        </div>
        {loading && <h2 className='loading'>Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
