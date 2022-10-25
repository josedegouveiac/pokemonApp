import React, {useState} from 'react'

import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti'
import { Layout } from '../../components/layouts'
import { pokeApi } from '../../api';
import { Pokemon } from '../../interface';
import Image from 'next/image';
import { getPokemonInfo, LocalFavorites } from '../../utils';


interface Props {
    pokemon: Pokemon
  
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {

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


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`)

    return {
        // paths: [
        //     {
        //         params: {id: '1'}
        //     },
        //     {
        //         params: {id: '2'}
        //     },
        //     {
        //         params: {id: '3'}
        //     }
        // ],
        paths:  pokemon151.map((id) => ({
            params: {id} //id:id === id
        })),
        fallback: 'blocking' // false para que no me deje pasar a las page que no tengo precargadas
    }
}
 
export const getStaticProps: GetStaticProps = async ({params}) => {   //termina almacenado en el disco duro
    const {id} = params as {id: string}                               //tener cuidado si cada objeto por elemento es muy grande
    
    const pokemon =  await getPokemonInfo(id)

    if(!pokemon){
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
      props: {
        pokemon
      },
      revalidate: 86400 //revalida los datos que estamos trayendo
    }
  }

export default PokemonPage
