import React from 'react'

export const metadata = {
  title: "About – Get me a chai",
  description: "Learn about Get me a chai — a friendly alternative to Patreon that helps creators, artists, and developers get support through a cup of chai. Discover our story, mission, and the heart behind every sip.",
  keywords: ["Get me a chai, about Get me a chai, Patreon alternative, Patreon for creators, creator support platform, chai donation site, support artists, buy me chai, fan funding, content creator tips, membership platform, support community"],
  openGraph: {
    title: "About – Get me a chai",
    description: "Discover how Get me a chai empowers creators just like Patreon — through small, meaningful contributions from fans who care.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    siteName: "Get me a chai",
    locale: "en_US",
    type: "website",
  },
};

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Learn more about our story and mission
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
