import { Grid} from "@nextui-org/react"
import { FC } from "react"
import { FavoriteCardPokemon } from "./FavoriteCardPokemon"


interface Props {
  pokemon: number[]
}

export const FavoritePokemons: FC<Props> = ({pokemon}) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
            {
              pokemon.map((id) => (
                <FavoriteCardPokemon key={id} pokemonId={id} />
              ) )
            }
          </Grid.Container>
  )
}
