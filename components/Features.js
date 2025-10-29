import React from 'react'
import Image from 'next/image'

const Features = () => {

    const cardContent = [
        { URL: "/paint.svg", heading: "Brand Identity Design", p: "Donec vel sapien augue integer urna vel turpis cursus porta aliquam ligula eget ultricies." },
        { URL: "/layout.svg", heading: "UI/UX Design", p: "Mauris blandit aliquet elit eget tincidunt nibh pulvinar rutrum tellus pellentesque eu." },
        { URL: "/code.svg", heading: "Web Development", p: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae." },
        { URL: "mobile.svg", heading: "Mobile App Design", p: "Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida." },
        { URL: "/megaphone.svg", heading: "Digital Marketing", p: "Sed porttitor lectus nibh donec sollicitudin molestie malesuada proin eget tortor risus." },
        { URL: "/search.svg", heading: "SEO Optimization", p: "Curabitur arcu erat accumsan id imperdiet et porttitor at sem pellentesque habitant morbi." },
    ]
    return (

        <div className="container w-5/6 h-10/12 flex flex-col gap-15">
            <div className="heading flex justify-center flex-col items-center gap-2">
                <h2 className="text-3xl font-bold">Features</h2>
                <p className="text-lg max-[550px]:text-center">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>
            <div className="cards items-center justify-center">
                <div className="cardContainer flex flex-wrap gap-5 justify-start p-4">
                    {cardContent.map((item, index)=>{
                   return <div key={index} className="card rounded-xl w-[350px] h-[360px] border border-gray-800 flex justify-center items-center bg-[#131428] transform transition duration-300 group hover:-translate-y-3">
                        <div className="cardContainer max-[550px]:justify-center w-[85%] h-[85%] flex flex-col items-center justify-center gap-8">
                            <div className="image flex justify-center items-center">
                                <div className="bg w-20 h-20 rounded-3xl bg-[#5c50d9] flex justify-center items-center transform transition duration-300 group-hover:scale-105">
                                    <image className='w-16 h-16' src={item.URL} alt="" />
                                </div>
                            </div>
                            <div className="heading flex flex-col items-center gap-3">
                                <h1 className='text-2xl font-bold hover:text-[#524dd3] cursor-pointer'>{item.heading}</h1>
                                <p className='text-sm text-center text-[#e8e7f7]'>{item.p}</p>
                            </div>
                            <div className='flex gap-1 items-center cursor-pointer text-[#524dd3] group'><a className='text-sm' href="">Learn More</a><span className='text-lg font-bold transform transition duration-300 group-hover:translate-x-2'>→</span></div>
                        </div>
                    </div>
                    
 })}
                </div>
            </div>
        </div>

    )
}

export default Features
