"use client"
import React, { useEffect, useState } from 'react'
import Dashboardcomponent from '@/components/dashboard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLoading } from '../context/LoadingContext'

const Dashboard = () => {
    const { isLoadingDashboard, setisLoadingDashboard } = useLoading();
    const { data: session, status } = useSession()
    const router = useRouter()


    //Metadata
    useEffect(() => {
    document.title = "Dashboard – Get me a chai | Manage Your Creator Account";

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription)
      metaDescription.setAttribute(
        "content",
        "Access your Get me a chai dashboard to update your profile, manage your credentials, and connect with your supporters."
      );

    const metaKeywords = document.querySelector("meta[name='keywords']");
    if (metaKeywords)
      metaKeywords.setAttribute(
        "content",
        "Get me a chai dashboard, creator dashboard, Patreon alternative, user account, manage profile, update credentials, creator settings, buy me chai, support creators, fan funding, membership platform"
      );
  }, []);
    //Metadata


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    return (
        <>
            {isLoadingDashboard ? (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : ""}
            <Dashboardcomponent />
        </>
    )
}

export default Dashboard
