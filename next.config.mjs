import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'encrypted-tbn0.gstatic.com',
            'cdn-icons-png.flaticon.com', // any other external domains you use
        ]
    }
};

export default withFlowbiteReact(nextConfig);


