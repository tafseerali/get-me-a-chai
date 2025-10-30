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
                    <div className="w-[100vw] h-[337.750px] max-[550px]:h-[125px] bg-[#292828] overflow-hidden">
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
                {/* ... keep your Payment form and supporter list here unchanged ... */}
            </div>
        </>
    );
}
