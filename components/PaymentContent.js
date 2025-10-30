'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '@/app/(main)/context/LoadingContext';
import { fetchPayment, fetchUser } from '@/app/actions/useractions';
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'next/navigation';

export default function PaymentContent() {
    const { username } = useParams();
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isLoadingDashboard } = useLoading();

    const [btnLoading, setBtnLoading] = useState(false);
    const [payments, setPayments] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ✅ Handle payment success/failure
    useEffect(() => {
        const paid = searchParams.get('paid');
        if (paid === 'true') {
            toast.success('Payment has been made');
            router.replace(`/${username}`);
        }
        if (paid === 'false') {
            toast.error('Payment failed');
            router.replace(`/${username}`);
        }
    }, [pathname, searchParams, router, username]);

    // ✅ Fetch user & payment data
    const getData = async () => {
        setLoading(true); // Show loading spinner only
        try {
            const user = await fetchUser(username);
            setUserData(user || null);

            const paymentData = await fetchPayment(username);
            setPayments(paymentData || []);
        } catch (err) {
            console.error('Error fetching data', err);
            toast.error('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!username) return;
        getData();
    }, [username]);

    // ✅ Handle checkout
    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!session) {
            toast.error('Please login to make payment');
            return;
        }

        if (!userData?.name) {
            toast.error('Cannot process payment: recipient data missing');
            return;
        }

        setBtnLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: Number(amount),
                    name,
                    to_user: userData.name,
                    message,
                    username,
                }),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
                return;
            }

            toast.error('Could not initialize payment');
        } catch (err) {
            console.error(err);
            toast.error('Payment failed');
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={true}
                toastOptions={{
                    style: { borderRadius: '10px', background: '#333', color: '#fff' },
                }}
            />

            {isLoadingDashboard && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className="min-h-screen w-full flex flex-col items-center relative">
                {/* Cover Image */}
                <div className="image w-full h-3/4 flex flex-col items-center mb-16">
                    <div className="w-screen h-[337.750px] max-[550px]:h-[125px] bg-[#292828] overflow-hidden relative">
                        <Image
                            src={userData?.profileCover || "/default-cover.png"}
                            alt="User cover"
                            fill
                            className="w-full object-cover"
                        />

                        {!userData?.profileCover && <div className="w-full h-full bg-[#3d3d3d]" />}
                    </div>

                    <div className="relative flex justify-center">
                        <div className="icon w-30 h-30 max-[550px]:w-20 max-[550px]:h-20 max-[550px]:-bottom-14 bg-[#292828] absolute flex justify-center items-center -bottom-22 rounded-full border border-gray-600 overflow-hidden">


                            <Image
                                src={userData?.profilePic || "/default-user.png"}
                                alt="User profile"
                                fill
                                className="rounded-full w-[-webkit-fill-available] h-[-webkit-fill-available] object-cover border border-white"
                            />


                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="info text-white w-full h-[108px] flex flex-col items-center my-12 max-[550px]:my-4">
                    {loading ? (
                        <h2 className="text-3xl text-[#292828]">Loading...</h2>
                    ) : (
                        <h2 className="font-bold text-3xl">{userData?.name}</h2>
                    )}
                    {userData && (
                        <div className="flex flex-col text-gray-500 items-center text-md">
                            <span>{payments.length} Payments</span>
                            <span>
                                ${payments.reduce((total, payment) => total + payment.amount, 0)} amount raised
                            </span>
                        </div>
                    )}
                </div>

                {/* Payment & Supporters Section */}
<div className="main h-full mb-20 w-3/4 flex justify-center gap-5 max-[550px]:flex-col max-[550px]:w-[90%]">
  {/* Supporter List */}
  <div className="supporter w-1/2 max-[550px]:w-full h-96 bg-[#131428] rounded-lg p-4 flex flex-col gap-5">
    <h2 className="font-semibold text-xl">Support me Get a Chai!</h2>
    <ul className="flex flex-col h-full gap-2 text-gray-400">
      {!userData ? (
        <div className="w-full h-full flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mb-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 
                      50 100.591C22.3858 100.591 0 78.2051 
                      0 50.5908C0 22.9766 22.3858 0.59082 
                      50 0.59082C77.6142 0.59082 100 
                      22.9766 100 50.5908Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ) : Payments.length === 0 ? (
        <div className="w-full h-full flex text-gray-500">
          No supporters yet. Be the first one to support!
        </div>
      ) : (
        Payments.map((i) => (
          <li key={i.oid} className="list-none">
            <span className="capitalize">{i.name}</span> paid{' '}
            <span className="font-bold">${i.amount}</span> with a message:{' '}
            <span className="italic">&quot;{i.message}&quot;</span>
          </li>
        ))
      )}
    </ul>
  </div>

  {/* Payment Form */}
  <div className="form w-1/2 max-[550px]:w-full h-96 bg-[#131428] rounded-lg p-4 flex flex-col gap-5">
    <h2 className="font-bold text-xl">Make a payment</h2>
    {!session ? (
      <div className="text-center text-gray-400">
        Please login to make a paymennt
      </div>
    ) : (
      <form className="gap-4 flex flex-col" onSubmit={handleCheckout}>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="first_name"
            placeholder="John"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Message
          </label>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            id="message"
            placeholder="Love you bro"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="payment"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Payment
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="text"
            id="payment"
            placeholder="Enter amount in USD"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={btnloading}
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg 
                  text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none focus:ring-blue-300 
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
        >
          {btnloading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    )}
  </div>
</div>

            </div>
        </>
    );
}
