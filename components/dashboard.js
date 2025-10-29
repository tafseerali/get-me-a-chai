import React from 'react'
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { updateUser, fetchUserByEmail } from '@/app/actions/useractions'
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation'


const Dashboardcomponent = () => {
  const { data: session } = useSession()
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [inputDisable, setInputDisable] = useState({
    name: true,
    username: true,
    profilePic: true,
    profileCover: true,
    stripeId: true,
    stripeSecret: true,
  })

  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user?.email) return;
      try {
        const user = await fetchUserByEmail(session.user.email);
        if (user) {
          reset({
            name: user.name || '',
            email: user.email || '',
            username: user.username || '',
            profilePic: user.profilePic || '',
            profileCover: user.profileCover || '',
            stripeId: user.stripeId || '',
            stripeSecret: user.stripeSecret || '',
          })
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    loadUser();
  }, [session, reset])


  const onsubmit = async (data) => {
    setIsLoading(true);
    
    setInputDisable(prev =>
  Object.fromEntries(Object.keys(prev).map(key => [key, true]))
);

    const email = data.email;
    try {
      await updateUser(email, data); // server action  
      toast.success("Data updated successfully")
      window.location.reload();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed");
    } finally {
      setIsLoading(false); // always reset loading state
    }
  }

  const handleEdit = () => {
    setInputDisable(false)
  }

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />


      <div className='h-screen max-[550px]:h-fit w-full flex justify-center'>
        <div className='w-2/4 max-[550px]:w-[90%] h-fit rounded-lg bg-[#131428] p-4 pb-8 gap-3 flex flex-col my-5'>
          <h1 className='font-bold text-xl'>Enter your details here</h1>
          <form onSubmit={handleSubmit(onsubmit)} className="mx-auto w-full flex flex-col gap-4">
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col w-full relative'>
                <input disabled={inputDisable.name} {...register("name", { required: true })} placeholder='Name' type="text" className="bg-gray-100 border border-gray-100 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:dark:bg-gray-700 dark:bg-gray-300 outline-none dark:border-gray-600 dark:placeholder-gray-200 dark:text-black disabled:dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gray-500 transition-all duration-300 ease-in-out peer-focus:w-full ${inputDisable? "w-0": "w-full"}`}
                ></span>
                {errors.name && <span className='text-red-600 text-[12.5px]'>This field is required</span>}
              </div>
              <svg onClick={() => setInputDisable(prev => ({ ...prev, name: false }))} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
              </svg>

            </div>
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col w-full'>
                <input disabled={isDisabled} {...register("email")} name='email' placeholder='Email' type="text" className="bg-gray-100 border border-gray-100 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:dark:bg-gray-700 dark:bg-gray-300 outline-none dark:border-gray-600 dark:placeholder-gray-200 dark:text-black disabled:dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.email && <span className='text-red-600 text-[12.5px]'>This field is required</span>}
              </div>
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
              </svg>

            </div>
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col w-full'>
                <input disabled={inputDisable.username} {...register("username", { required: true })} placeholder='Username' type="text" className="bg-gray-100 border border-gray-100 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:dark:bg-gray-700 dark:bg-gray-300 outline-none dark:border-gray-600 dark:placeholder-gray-200 dark:text-black disabled:dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.username && <span className='text-red-600 text-[12.5px]'>This field is required</span>}
              </div>
              <svg onClick={() => setInputDisable(prev => ({ ...prev, username: false }))} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
              </svg>

            </div>
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col w-full'>
                <input disabled={inputDisable.profilePic} {...register("profilePic")} placeholder='Profile Picture' type="text" className="bg-gray-100 border border-gray-100 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:dark:bg-gray-700 dark:bg-gray-300 outline-none dark:border-gray-600 dark:placeholder-gray-200 dark:text-black disabled:dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.profilePic && <span className='text-red-600 text-[12.5px]'>This field is required</span>}
              </div>
              <svg onClick={() => setInputDisable(prev => ({ ...prev, profilePic: false }))} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
              </svg>

            </div>
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col w-full'>
                <input disabled={inputDisable.profileCover} {...register("profileCover")} placeholder='Cover Picture' type="text" className="bg-gray-100 border border-gray-100 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:dark:bg-gray-700 dark:bg-gray-300 outline-none dark:border-gray-600 dark:placeholder-gray-200 dark:text-black disabled:dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.profileCover && <span className='text-red-600 text-[12.5px]'>This field is required</span>}
              </div>
              <svg onClick={() => setInputDisable(prev => ({ ...prev, profileCover: false }))} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
              </svg>

            </div>
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col w-full'>
                <input disabled={inputDisable.stripeId} {...register("stripeId")} placeholder='Stripe Id' type="text" className="bg-gray-100 border border-gray-100 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:dark:bg-gray-700 dark:bg-gray-300 outline-none dark:border-gray-600 dark:placeholder-gray-200 dark:text-black disabled:dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.stripeId && <span className='text-red-600 text-[12.5px]'>This field is required</span>}
              </div>
              <svg onClick={() => setInputDisable(prev => ({ ...prev, stripeId: false }))} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
              </svg>

            </div>
            <div className='flex gap-2 items-center'>
              <div className='flex flex-col w-full'>
                <input disabled={inputDisable.stripeSecret} {...register("stripeSecret")} placeholder='Stripe Secret' type="text" className="bg-gray-100 border border-gray-100 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:dark:bg-gray-700 dark:bg-gray-300 outline-none dark:border-gray-600 dark:placeholder-gray-200 dark:text-black disabled:dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.stripeSecret && <span className='text-red-600 text-[12.5px]'>This field is required</span>}
              </div>
              <svg onClick={() => setInputDisable(prev => ({ ...prev, stripeSecret: false }))} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
              </svg>

            </div>

            <button name='submit' type="submit" className="flex items-center gap-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm justify-center w-20 h-[43px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              {isLoading && (
                <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              )}
              {!isLoading && (
                <span>Submit</span>
              )}
            </button>
          </form>
        </div>

      </div>
    </>

  )
}

export default Dashboardcomponent
