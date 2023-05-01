import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function OffersSent() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const token = localStorage.getItem('token');
                const allOffers = await axios.get("http://localhost:8080/offer/useroffers", {
                    headers: {
                      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                  });
                console.log(allOffers);

                if (allOffers.status === 200) {
                    setOffers(allOffers.data.offers);
                } else {
                    return null;
                }

            } catch (error) {
                console.log("Oh no, something went wrong", error)
            }
        }

        fetchOffers();
    }, []);

    return (
        <div className='w-[687px] pb-10 border-2 border-black'>
            <div className='flex '>
                <img src="https://placehold.jp/180x118.png"></img>
                <div className='w-full flex justify-between'>
                    <div className='pl-2'>
                        <p className='text-[32px]'>Prodcut Title</p>
                        <p className='text-[22px]'>Mode</p>
                    </div>
                    <p className='pr-4 text-[27px]'>Status</p>
                </div>
                    
            </div>
        </div>

    )
}