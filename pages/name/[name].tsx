import React, { FC, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { Grid, Card, Button, Container, Text } from '@nextui-org/react'

import Image from 'next/image';
import confetti from 'canvas-confetti'
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interface'
import { getPokemonInfo, LocalFavorites } from '../../utils'
import pokeApi from '../../api/pokeApi';



interface Props {
    pokemon: Pokemon
  
}

const PokemonByNamePage: FC<Props> = ({pokemon}) => {

    const [isInFavorite, setIsInFavorite] = useState(LocalFavorites.existInFavorites(pokemon.id))

    const onToogleFavorite = () => {
        LocalFavorites.toogleFavorite(pokemon.id)
        setIsInFavorite(!isInFavorite)

        if(isInFavorite) return;

        confetti({
            zIndex: 999,
            particleCount: 200,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })
    }

  return (

    <Layout title={pokemon.name}>
        <Grid.Container gap={2} css={{marginTop: 5}}>
            <Grid xs={12} sm={4}>
                <Card hoverable css={{padding: 30}}>
                    <Card.Body>
                        <Card.Image  
                        src={pokemon.sprites.other?.dream_world.front_default || "/no-image.png"} alt={pokemon.name}
                        width="100%"
                        height={200}
                        />
                    </Card.Body>
                </Card>
            </Grid>
            <Grid xs={12} sm={8}>
                <Card>
                    <Card.Header css={{display: "flex", justifyContent: "space-between"}}>
                        <Text h1>
                            {pokemon.name}
                        </Text>
                        <Button
                        color="gradient" 
                        ghost={ !isInFavorite }
                        onClick={ onToogleFavorite}
                        >
                            {isInFavorite ? "En Favoritos" : "Guardar en Favoritos"}
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Text size={30}>
                            Sprites:
                        </Text>
                        <Container display='flex' direction='row' justify="space-evenly" gap={0}>
                            <Image src={pokemon.sprites.front_default }
                            alt={pokemon.name}
                            width={100}
                            height={100}
                            />
                            <Image src={pokemon.sprites.back_default }
                            alt={pokemon.name}
                            width={100}
                            height={100}
                            />
                            <Image src={pokemon.sprites.front_shiny }
                            alt={pokemon.name}
                            width={100}
                            height={100}
                            />
                            <Image src={pokemon.sprites.back_shiny }
                            alt={pokemon.name}
                            width={100}
                            height={100}
                            />
                        </Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name)

    return {
        paths: pokemonNames.map(name => ({
            params: { name}
        })),
        fallback: false // false para que no me deje pasar a las page que no tengo precargadas
    }
}
 
export const getStaticProps: GetStaticProps = async ({params}) => {   //termina almacenado en el disco duro
    const {name} = params as {name: string}  
                                 //tener cuidado si cada objeto por elemento es muy grande

    
    //enviar la data necesaria para evitar cargar datos innecesarios
    return {
      props: {  
        pokemon: await getPokemonInfo(name)
      }
    }
  }


export default PokemonByNamePage