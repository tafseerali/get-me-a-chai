"use client"
import React from 'react'
import { fetchAllUser, fetchAllPayment } from '@/app/actions/useractions'
import { Toaster, toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Users = () => {
    const [allUsers, setAllUsers] = useState([])
    const [payments, setPayments] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [userLoading, setuserLoading] = useState(true)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        setuserLoading(true)
        try {
            const [users, payments] = await Promise.all([
                fetchAllUser(),
                fetchAllPayment()
            ]);

            const usersWithPayments = users.map(user => {
                const userPayments = payments.filter(p => p.email === user.email)
                return { ...user, payments: userPayments }
            })
            setAllUsers(usersWithPayments)
            setuserLoading(false)
        } catch {
            console.log("Error fetching data")
            toast.error("Error fetching data")
            setuserLoading(false)
        }
    }

    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={true}
                toastOptions={{
                    style: { borderRadius: '10px', background: '#333', color: '#fff' },
                }}
            />
            <div className='w-full flex justify-center m-auto h-full min-h-screen bg-[#121212]'>
                <div className='w-1/2 max-[550px]:w-[95%] flex items-center'>
                    <div className='w-full h-3/4 flex flex-col gap-6'>
                        <div className="heading">
                            <h2 className='font-bold text-3xl'>Find Creators</h2>
                        </div>
                        <div className="users w-full h-full gap-4 flex flex-col">
                            <div className='w-full rounded-full border border-gray-300 bg-[#262626] flex items-center px-2'>
                                <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

                                <input onChange={(e) => setSearchTerm(e.target.value)} name='user' className='border-none outline-none w-full px-2 py-2' type="text" />
                            </div>

                            <div className='p-2 w-full h-full bg-[#262626] rounded-xl'>

                                {/* loader */}
                                {userLoading && <div role="status" className=' flex justify-center items-center h-full'>
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                }


                                {!userLoading && <ul className='w-full h-full'>
                                    {allUsers.filter((item) => {
                                        if (searchTerm.toLowerCase() === "") return true;
                                        return (
                                            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            item.username.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                    }).map((item => {
                                        return (
                                            <li key={item._id} className='hover:bg-[#3b3b3b] rounded-xl h-20 w-full'>
                                                <Link className='w-full h-full flex items-center gap-2 px-2' href={`/${item.username}`}>
                                                    <div className='w-[50px] h-[50px] bg-[#575757] rounded-lg overflow-hidden shrink-0'>
                                                        <div className="relative w-[webkit-fill-available] h-[webkit-fill-available]">
                                                            <Image
                                                                src={item.profilePic}
                                                                alt="User profile"
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className='w-full h-full flex flex-col justify-center'>
                                                        <h2 className='text-xl font-semibold'>{item.name}</h2>
                                                        <span className='text-[#a3a2a2] text-sm'>@{item.username}</span>
                                                        <div className='flex gap-2 text-[#a3a2a2] text-sm'>
                                                            <span>{item.payments.length} payment</span>
                                                            <span>•</span>
                                                            <span>${item.payments.reduce((total, p) => total + p.amount, 0)} raised</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    }))}
                                </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users