import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">

                {/* Text Side */}
                <div className='text-start'>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        Nhận sách mới của bạn<br />với <span className="text-green-700">giá tốt nhất</span>
                    </h1>
                    <p className="text-gray-600 mb-6 text-base md:text-lg">
                        Bạn có thể tìm bất cứ loại sách nào với giá tốt nhất. Tham gia với chúng tôi với đề xuất đặc biệt
                        {/* You can find any kind of books with the best price. Join us, for a special offer. */}
                    </p>
                    <button
                        onClick={() => navigate('/books')}
                        className="bg-green-700 text-white px-6 py-2 rounded-md text-sm hover:bg-green-800 transition"
                    >
                        Khám phá ngay
                    </button>
                </div>

                {/* Image Side */}
                <div className="flex justify-center md:justify-end">
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 bg-pink-100 rounded-full w-[300px] h-[300px] md:w-[350px] md:h-[350px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        <img
                            src="https://cdn.dribbble.com/userupload/43432895/file/original-2e03aba70d7800e22b02e213fb258cfd.jpg?resize=1200x900&vertical=center" // 👉 thay bằng URL ảnh thật
                            alt="Open book"
                            className="w-120 lg:w-80 object-contain relative z-10 rounded-xl shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
