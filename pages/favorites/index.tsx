import { useEffect, useState } from "react"
import { Layout } from "../../components/layouts"
import { FavoritePokemons } from "../../components/pokemon"
import { NoFavorites } from "../../components/ui"
import { LocalFavorites } from "../../utils"


const FavoritePage = () => {

  const [favoritePokemon, setFavoritePokemon] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemon(LocalFavorites.pokemons)  
  }, [])




  return (
    <Layout title="Pokemon - Favorite">
      {
        favoritePokemon.length === 0 
        ? (<NoFavorites/>)
        : (
         <FavoritePokemons pokemon={favoritePokemon} />
        )
      }
    </Layout>
  )
}

export default FavoritePage