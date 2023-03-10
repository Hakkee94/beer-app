/* eslint-disable */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [search, setSearch] = useState<string>('')
    const [beers, setBeers] = useState([])
    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)

    const handlePaginate = (direction: string) => () => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
        }   else {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}${search?'&beer_name='+search:''}`).then(({data}) => setBeers(data))
    }, [page, perPage, search])

    const handleSearchBeer = () => {
        axios.get(`https://api.punkapi.com/v2/beers?${search?'&beer_name='+search:''}`).then(({data}) => setBeers(data))
    }

    const handleResetBear = () => {
        setSearch('')
        handleSearchBeer()
    }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <div>
              <input value={search} type={"text"} onChange={event => setSearch(event.target.value)}/>
              <button onClick={handleSearchBeer}>Search</button>
              <button onClick={handleResetBear}>Reset</button>
          </div>

          <div>
              {beers.map((beer:any, index) => {
                  return <div className='beer-cart' key={Math.random() + 1}>
                      <Link href={'/'+beer.id}>
                          {beer.name}
                      </Link>
                      <h2>{beer.description}</h2>

                      <div className='beer-image'>
                          <img src={beer.image_url} alt={'beer picture'}/>
                      </div>
                  </div>
              })}
          </div>

          <div className='arrows'>
              <div onClick={handlePaginate('left')} className='arrow'>{'<-'}</div>
              <div onClick={handlePaginate('right')} className='arrow'>{'->'}</div>
          </div>
      </main>
    </>
  )
}
