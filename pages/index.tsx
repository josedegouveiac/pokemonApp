import  { NextPage, GetStaticProps } from 'next' //es como un funcional component
import { Grid, } from '@nextui-org/react';


import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonListResponse, SmallPokemon } from '../interface'
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}


const HomePage: NextPage<Props> = ({pokemons}) => {

  // console.log(pokemons)

  return (
    <Layout title='Listado de pokemon'>
      <Grid.Container gap={2} justify="flex-start">
        {
          pokemons.map( (pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid.Container>
    </Layout>
   
   
  )
}


 
export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151")

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`

  }))

  return {
    props: {
      pokemons
    }
  }
}


export default HomePage
