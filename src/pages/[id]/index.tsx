/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";


const Index = () => {
    /* eslint-disable */
    const [beer, setBeer] = useState<any>(null)
    const router = useRouter()
    useEffect(() => {
        if (router.query.id) {
            axios.get('https://api.punkapi.com/v2/beers/' + router.query.id).then(({data}) => {setBeer(data[0])})
        }
        console.log(router)
    }, [router])
    if (!beer) {
        return <div>
            <h1>loading</h1>
        </div>
    }
    return (
        <div className='beer-cart'>

            <h1><span>Beer name: </span>{beer.name}</h1>
            <h2><span>Description: </span> {beer.description}</h2>
            <h3><span>Tagline: </span>{beer.tagline}</h3>
            <h3><span>Abv: </span> {beer.abv}</h3>
            <h3><span>Food pairing: </span> {beer.food_pairing}</h3>
            <div className='beer-image'>
                <img src={beer.image_url} alt={'beer picture'}/>
            </div>

        </div>
    );
};

export default Index;