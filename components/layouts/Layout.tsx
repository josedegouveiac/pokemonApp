import Head from "next/head"
import { FC } from "react"
import { Navbar } from '../ui';

interface Props {
    children?: React.ReactNode;
    title: string;
  };
  
const origin =  (typeof window === 'undefined') ? "" : window.location.origin;

export const Layout: FC<Props> = ({children, title}) => {
    return (
        <>
    <Head>
        <title>{title || 'Pokemon App' }</title>
        <meta name="author" content="Jose de Gouveia" />
        <meta name="description" content={`Informacion sobre el pokemon ${title}`} />
        <meta name="keywords" content={` ${ title }, pokemon, pokedex`} /> 

        <meta property="og:title" content={`informacion sobre ${title}`} />
        <meta property="og:description" content={`esta es la pagina es sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
    </Head>
    <Navbar/>
    <main style={{padding: '0px 20px'}}>
        {children}
    </main>
    </>
  )
}

//el meta keyworks ayuda a los bots a conseguir tu pagina