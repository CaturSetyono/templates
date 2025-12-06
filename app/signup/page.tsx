'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        farmType: '',
        location: '',
        animalCount: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Terima kasih! Tim kami akan segera menghubungi Anda.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4 py-32">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Info */}
                        <div className="lg:sticky lg:top-32">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                Dapatkan Penawaran Terbaik
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Isi formulir di bawah ini dan tim ahli kami akan menghubungi Anda untuk memberikan
                                konsultasi gratis dan penawaran khusus sesuai kebutuhan peternakan Anda.
                            </p>

                            {/* Benefits */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Konsultasi Gratis</h3>
                                        <p className="text-gray-600">Dapatkan saran dari ahli nutrisi hewan kami tanpa biaya</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Harga Spesial</h3>
                                        <p className="text-gray-600">Penawaran khusus untuk pelanggan baru</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Pengiriman Gratis</h3>
                                        <p className="text-gray-600">Gratis ongkir untuk pembelian pertama</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Dukungan 24/7</h3>
                                        <p className="text-gray-600">Tim kami siap membantu kapan saja</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-green-600 mb-1">5,000+</div>
                                        <div className="text-sm text-gray-600">Peternak Mitra</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-green-600 mb-1">25+</div>
                                        <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-green-600 mb-1">4.8/5</div>
                                        <div className="text-sm text-gray-600">Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Formulir Permintaan Penawaran
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                        placeholder="Masukkan nama lengkap Anda"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nomor Telepon *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="farmType" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Jenis Peternakan *
                                    </label>
                                    <select
                                        id="farmType"
                                        name="farmType"
                                        required
                                        value={formData.farmType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                    >
                                        <option value="">Pilih jenis peternakan</option>
                                        <option value="cattle">Sapi (Dairy/Beef)</option>
                                        <option value="poultry">Unggas (Ayam/Bebek)</option>
                                        <option value="goat">Kambing/Domba</option>
                                        <option value="pig">Babi</option>
                                        <option value="mixed">Campuran</option>
                                        <option value="other">Lainnya</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Lokasi Peternakan *
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        required
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                        placeholder="Kota/Kabupaten, Provinsi"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="animalCount" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Jumlah Ternak
                                    </label>
                                    <input
                                        type="number"
                                        id="animalCount"
                                        name="animalCount"
                                        value={formData.animalCount}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                        placeholder="Contoh: 100"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Pesan Tambahan
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                                        placeholder="Ceritakan kebutuhan Anda atau pertanyaan yang ingin Anda tanyakan..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/25 transform hover:-translate-y-0.5"
                                >
                                    Kirim Permintaan
                                </button>

                                <p className="text-sm text-gray-500 text-center">
                                    Dengan mengirim formulir ini, Anda menyetujui{' '}
                                    <Link href="#" className="text-green-600 hover:text-green-700 font-medium">
                                        Kebijakan Privasi
                                    </Link>{' '}
                                    kami
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
