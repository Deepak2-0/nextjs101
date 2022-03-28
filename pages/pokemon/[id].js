/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

//CSR
// export default function Details() {
//   const {
//     query: { id },
//   } = useRouter();

//   const [pokemon, setPokemon] = useState(null);

//   useEffect(() => {
//     async function getPokemon() {
//       const resp = await fetch(
//         `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
//       );
//       setPokemon(await resp.json());
//     }
//     if (id) {
//       getPokemon();
//     }
//   }, [id]);

//   if (!pokemon) {
//     return null;
//   }

//   return (
//     <div>
//       <Head>
//         <title>{pokemon.name}</title>
//       </Head>
//       <div>
//         <Link href="/">
//           <a>Back to Home</a>
//         </Link>
//       </div>
//       <div className={styles.layout}>
//         <div>
//           <img
//             className={styles.picture}
//             src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
//             alt={pokemon.name.english}
//           />
//         </div>
//         <div>
//           <div className={styles.name}>{pokemon.name}</div>
//           <div className={styles.type}>{pokemon.type.join(", ")}</div>
//           <table>
//             <thead className={styles.header}>
//               <tr>
//                 <th>Name</th>
//                 <th>Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pokemon.stats.map(({ name, value }) => (
//                 <tr key={name}>
//                   <td className={styles.attribute}>{name}</td>
//                   <td>{value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

//SSR
export default function Details({ pokemon }) {
  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

//SSR
// export async function getServerSideProps({ params }) {
//   const res = await fetch(
//     `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
//   );

//   return {
//     props: {
//       pokemon: await res.json(),
//     },
//   };
// }

//SSG

export async function getStaticPaths() {
  const res = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
  const pokemons = await res.json();

  return {
    paths: pokemons.map((pokemon) => ({
      params: {
        id: pokemon.id.toString(),
      },
    })),
    fallback : false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await res.json(),
      revalidate : 30 //once the page gets refreshed, it will revalidate in 30 seconds, if it not revalidated in the last 30secs
    },
  };
}
