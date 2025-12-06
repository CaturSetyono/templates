async function getStatusData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/registry?slug=/status`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function StatusPage() {
  const data = await getStatusData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load status data
      </div>
    );
  }

  const { hero, searchPlaceholder, searchButton, recentTitle, statuses } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-32 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {hero?.title || 'Status Tracking'}
          </h1>
          <p className="text-xl text-gray-600">{hero?.subtitle || ''}</p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label
              htmlFor="trackingNumber"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              {searchPlaceholder || 'Enter tracking number'}
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="trackingNumber"
                placeholder={searchPlaceholder || 'Enter ID'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors">
                {searchButton || 'Track'}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Deliveries */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {recentTitle || 'Recent Activity'}
          </h2>
          <div className="space-y-6">
            {statuses?.map((delivery: any) => (
              <div key={delivery.orderId} className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {delivery.orderId}
                      </span>
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          delivery.status === 'Terkirim'
                            ? 'bg-green-100 text-green-700'
                            : delivery.status === 'Dalam Pengiriman'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {delivery.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{delivery.customer}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {delivery.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Estimasi Tiba</p>
                    <p className="text-lg font-bold text-gray-900">{delivery.estimatedArrival}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{delivery.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${delivery.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Butuh Bantuan?</h3>
          <p className="text-green-100 mb-6">Tim customer service kami siap membantu Anda 24/7</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+628123456789"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-600 rounded-full font-bold hover:bg-green-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Hubungi Kami
            </a>
            <a
              href="https://wa.me/628123456789"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
