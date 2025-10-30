"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useLoading } from '@/app/(main)/context/LoadingContext';
import { fetchUserByEmail, fetchAllUser } from '@/app/actions/useractions';
import { useRef } from 'react';
import Image from 'next/image';
import SafeImage from "@/components/SafeImage";

const Navbar = () => {
  const { setisLoadingDashboard } = useLoading();

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [mounted, setMounted] = useState(false) // ✅ NEW: mount state
  const [userDrp, setuserDrp] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const { data: session } = useSession()

  const [username, setUsername] = useState("")
  const searchRef = useRef(null);
  const toggleRef = useRef(null);

  const getData = async () => {
    const user = await fetchUserByEmail(session?.user?.email);
    if (user) {
      setUsername(user.username)
    }
  }
  useEffect(() => setMounted(true), [])


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getData()
    setTimeout(() => {
      setShowButton(true)
    }, 3000);
  }, [session])

  // update username immediately when profile changes elsewhere
  useEffect(() => {
    getUsersData()
    const onUserUpdated = (e) => {
      const newUsername = e?.detail?.username
      if (newUsername) setUsername(newUsername)
    }
    window.addEventListener("userUpdated", onUserUpdated)
    return () => window.removeEventListener("userUpdated", onUserUpdated)
  }, [])

  const Pathname = usePathname()

  useEffect(() => {
    setIsLoading(false)
  }, [Pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = () => {
    setIsLoading(true)
    setIsMenuOpen(false)
  }


  const handleSignOut = () => {
    setisLoadingDashboard(true)
    signOut()
  }

  const showUsers = () => {
    setuserDrp(!userDrp)
  }

  const getUsersData = async () => {
    try {
      const users = await fetchAllUser();
      setAllUsers(users)
      console.log(users)
    } catch {
      console.log("error fetching users")
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setuserDrp(false); // hides the user list if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsid = (e) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target)) {
        setTimeout(() => {
          setIsMenuOpen(false);
        }, 100);
      }
    };
    document.addEventListener("mousedown", handleClickOutsid);
    return () => document.removeEventListener("mousedown", handleClickOutsid);
  }, []);


  if (!mounted) return null
  return (

    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 z-50 animate-pulse">
          <div className="h-full bg-blue-400 animate-[loading_1s_ease-in-out_infinite]"></div>
        </div>
      )}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-auto h-[70px] px-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/logo.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl max-[550px]:text-[17px] font-semibold whitespace-nowrap dark:text-white">GetMeaChai</span>
          </Link>
          <div className="flex items-center h-full md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-8 max-[1130px]:gap-2 justify-end relative">

            <div ref={searchRef} className="check flex px-4 py-3 rounded-full border-2 border-blue-500 mx-auto relative justify-center max-[550px]:justify-end w-72 max-[1130px]:w-52 max-[890px]:absolute max-[890px]:top-full max-[890px]:mt-2 max-[890px]:w-72 max-[550px]:w-52 max-[550px]:mx-0 max-[550px]:z-30 max-[550px]:justify-center  max-[550px]:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                className="fill-gray-600 mr-3 rotate-90">
                <path
                  d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                </path>
              </svg>
              <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} onClick={() => showUsers()} type="text" placeholder="Find Creators" className="w-full outline-none bg-transparent text-gray-600 text-sm" />
              <div tabIndex={0} onBlur={() => { setuserDrp(false) }} className={`users bg-white w-full absolute h-64 top-full z-50 mt-4 rounded-3xl ${!userDrp ? "hidden" : ""}`}>
                <ul className='text-black w-full h-full overflow-y-hidden rounded-3xl relative'>
                  {allUsers.filter((item) => {
                    if (searchTerm.trim() === "") return true;
                    return (
                      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                  }).map((item) => {
                    return (
                      <li key={item._id} className='flex w-full hover:bg-[#171717] group cursor-default transition-all duration-200 border-b border-[#d4d4d4]'>
                        <Link className="w-full h-full px-3 py-1 gap-2 flex items-center" href={`/${item.username}`} >
                          <div className='bg-gray-600 w-10 h-10 rounded-full shrink-0 overflow-hidden'>
                            <div className="relative w-[webkit-fill-available] h-[webkit-fill-available]">
                              <SafeImage
                                src={item.profilePic}
                                alt="User profile"
                                fill
                                className="object-cover"
                              />

                            </div>

                          </div>
                          <div>
                            <h3 className='font-bold group-hover:text-[#d4d4d4] transition-all duration-200'>{item.name}</h3>
                            <p className='text-[#696868] text-sm'>@{item.username}</p>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                  <li className='bg-gray-900 text-white font-semibold absolute bottom-0 w-full py-3 flex justify-center'>
                    <Link href='/users'> View all users ➜ </Link>
                  </li>
                </ul>
              </div>
            </div>


            {/* Get started */}
            <div className="flex items-center h-full justify-end">
              {!session ? (
                showButton && (
                  <>
                    <Link onClick={handleLinkClick} href="/login" className="text-white bg-blue-700 h-[60%] max-[550px]:h-[55%] flex items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 max-[550px]:px-2 max-[550px]:py-0.5 max-[550px]:text-[14px] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</Link>
                  </>
                )

              ) : (<>
                {/* <!-- Dropdown menu --> */}

                <div className='flex flex-col relative h-full w-24 items-center justify-center'>

                  <div className='w-full flex justify-end'>
                    <button onClick={() => setOpenDropdown(!openDropdown)} onBlur={() => setTimeout(() => { setOpenDropdown(false) }, 150)} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                      <span className="sr-only">Open user menu</span>
                      <div className='w-8 h-8 rounded-full bg-gray-600'>
                        <Image className="w-8 h-8 rounded-full" src={session?.user?.image} alt="user photo" />
                      </div>
                    </button>
                  </div>
                  <div className={`absolute ${!openDropdown ? "hidden" : ""} mt-4 top-[100%] z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">{session?.user?.name}</span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{session?.user?.email}</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                      </li>
                      <li>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
                      </li>
                      <li>
                        <Link href={`/${username}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                      </li>
                      <li>
                        <span onClick={() => handleSignOut()} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
              )}
            </div>


            <button ref={toggleRef} onClick={() => setIsMenuOpen(!isMenuOpen)} data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 max-[550px]:w-8 max-[550px]:h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>

          </div>
          <div className={`w-[36%] justify-end items-center md:flex md:w-auto max-[550px]:z-30 max-[550px]:w-full md:order-1 ${isMenuOpen ? '' : 'hidden'}`} id="navbar-cta">
            <ul className="text-lg flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link onClick={handleLinkClick} href="/" className={`block py-2 px-3 md:p-0 ${Pathname === "/" ? 'text-white' : 'text-gray-900'} ${Pathname === "/" ? 'max-[550px]:bg-blue-700' : ''} rounded-sm md:bg-transparent md:text-blue-700 ${Pathname === "/" ? "md:dark:text-blue-500" : "md:dark:text-blue-100"} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700`} aria-current="page">Home</Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} href="/about" className={`block py-2 px-3 md:p-0 ${Pathname === "/about" ? 'text-white max-[550px]:bg-blue-700' : 'text-gray-900'} rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 ${Pathname === "/about" ? "md:dark:text-blue-500" : "md:dark:text-blue-100"} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>About</Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} href="/services" className={`block py-2 px-3 md:p-0 ${Pathname === "/services" ? 'text-white max-[550px]:bg-blue-700' : 'text-gray-900'}  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 ${Pathname === "/services" ? "md:dark:text-blue-500" : "md:dark:text-blue-100"} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Services</Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} href="/contact" className={`block py-2 px-3 md:p-0 ${Pathname === "/contact" ? 'text-white max-[550px]:bg-blue-700' : 'text-gray-900'}  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 ${Pathname === "/contact" ? "md:dark:text-blue-500" : "md:dark:text-blue-100"} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>

  )
}

export default Navbar
