import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../css/NavBar.module.css';
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products/search?q=${value}`
        );

        setSuggestions(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [value]);

  return (
    <div className={styles.container} style={{ position: 'relative' }}>
      {/* Icono al costado izquierdo de la barra para simular la búsqueda */}
      <SearchIcon style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
      <input
        type="text"
        className={styles.textbox}
        placeholder="Buscar producto..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        style={{ paddingLeft: 34 }}
      />
    </div>
  );
};

export default SearchBar;