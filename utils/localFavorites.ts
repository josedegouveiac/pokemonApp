
const toogleFavorite = (id: number) => {
    console.log('toogle favorite llamado')

    let favorites: number[] = JSON.parse(localStorage.getItem("favorites") || '[]')

    if( favorites.includes(id) ){
        favorites = favorites.filter(pokeId =>  pokeId !== id)
    } else {
        favorites.push(id)
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const existInFavorites = (id: number):  boolean => {

    if(typeof window === 'undefined') return false // si se esta generando del lado del servidor regresa false
    
    const favorites: number[] = JSON.parse(localStorage.getItem("favorites") || '[]')

    return favorites.includes(id)

}


const pokemons = (): number[] => {
    return JSON.parse(localStorage.getItem('favorites') || "[]")
}

export default {
    toogleFavorite,
    existInFavorites,
    pokemons
}