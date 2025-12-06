import Link from 'next/link';

async function getBlogData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/registry?slug=/blog`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogPage() {
  const data = await getBlogData();
  
  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Failed to load blog data</div>;
  }

  const { hero, categories, posts, newsletter } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{hero?.title || 'Blog'}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {hero?.subtitle || ''}
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories?.map((category: string) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  category === 'All'
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post: any) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}` as any}
                    className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
                    Baca Selengkapnya
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-full font-bold hover:bg-green-600 hover:text-white transition-all shadow-lg">
              Muat Artikel Lainnya
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{newsletter?.title || 'Get Latest Updates'}</h2>
            <p className="text-green-100 text-lg mb-8">
              {newsletter?.description || ''}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={newsletter?.placeholder || 'Your Email'}
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-4 bg-white text-green-600 rounded-full font-bold hover:bg-green-50 transition-colors shadow-lg whitespace-nowrap">
                {newsletter?.buttonText || 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
