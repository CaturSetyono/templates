async function getApiData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/registry?slug=/api`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ApiPage() {
  const data = await getApiData();

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Failed to load data</div>;
  }

  const { hero, comingSoon } = data;
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{hero?.title || 'Calculator'}</h1>
          <p className="text-xl text-gray-600">{hero?.subtitle || ''}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {comingSoon?.title || 'Coming Soon'}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{comingSoon?.description || ''}</p>
            <a
              href={comingSoon?.buttonHref || '/signup'}
              className="inline-block px-8 py-4 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg"
            >
              {comingSoon?.buttonText || 'Contact Us'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
