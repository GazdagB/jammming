// eslint-disable-next-line no-unused-vars
import React from 'react'
import styles from "../styles/SearchBar.module.css"

const SearchBar = ({setSearch, search, onSubmit}) => {
  
  function handleSubmit(e){
    e.preventDefault()
    onSubmit(search)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} name='search-form'>
        <input value={search} onChange={(e)=> setSearch(e.target.value)} className={styles.inputSearch} placeholder='Type in song title...' name='search' id='query' type="text" />
        <button className={styles.btnSubmit} type='submit'>Search Song</button>
    </form>
  )
}

export default SearchBar