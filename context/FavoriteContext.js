import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      'useFavorites ต้องใช้งานภายใน FavoriteProvider'
    );
  }

  return context;
}