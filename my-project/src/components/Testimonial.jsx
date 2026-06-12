import React from "react";



const Testimonial = () => {
    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=200',
            name: 'Ali Hassan',
            handle: '@freshbasket',
            date: 'April 20, 2025',
            text: 'Fresh vegetables delivered in under 30 minutes. Super crisp and well packed!'
        },
        {
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
            name: 'Sara Khan',
            handle: '@grocerystore',
            date: 'May 10, 2025',
            text: 'Best grocery app I’ve used. Fruits are always fresh and affordable.'
        },
        {
            image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200',
            name: 'John Smith',
            handle: '@dailyfresh',
            date: 'June 5, 2025',
            text: 'Milk, bread, and essentials always arrive on time. Highly recommended!'
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200',
            name: 'Ayesha Noor',
            handle: '@greenmart',
            date: 'May 10, 2025',
            text: 'Love the organic section. Everything feels natural and premium quality.'
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-4 rounded-xl mx-4 w-72 shrink-0 bg-white shadow hover:shadow-xl transition-all duration-300 border border-gray-100">

            {/* User */}
            <div className="flex gap-3">
                <img className="size-11 rounded-full object-cover" src={card.image} />

                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="font-medium text-gray-800">{card.name}</p>

                        {/* verified badge */}
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                            <path
                                d="M6 0.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6L6 6.6 3.6 7.7l.5-2.6-1.9-1.8 2.6-.4L6 0.5z"
                                fill="#4fbf8b"
                            />
                        </svg>
                    </div>

                    <span className="text-xs text-gray-500">{card.handle}</span>
                </div>
            </div>

            {/* Review */}
            <p className="text-sm py-4 text-gray-700 leading-relaxed">
                {card.text}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <span>Posted on</span>
                    <a
                        href="#"
                        className="hover:text-[var(--color-primary)] transition"
                    >
                        🛒
                    </a>
                </div>
                <p>{card.date}</p>
            </div>
        </div>
    );

    return (
        <>
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>
            <div className="my-32 ">
                <div className="flex flex-col items-center justify-center mb-11 gap-3">
                    <h1 className="text-center text-2xl md:text-4xl font-bold">What people say about <span className="text-primary">KichenKart</span></h1>
                    <p className="text-gray-500 text-sm">
                        Hear what our happy customers say about their shopping experience, fast delivery, and product quality.
                    </p>
                </div>


                {/* ROW 1 */}
                <div className="relative w-full overflow-hidden max-w-5xl mx-auto">


                    <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white to-transparent"></div>

                    <div className="marquee-inner flex min-w-[200%] py-10">
                        {[...cardsData, ...cardsData].map((card, i) => (
                            <CreateCard key={i} card={card} />
                        ))}
                    </div>

                    <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-white to-transparent"></div>
                </div>

                {/* ROW 2 (reverse) */}
                <div className="relative w-full overflow-hidden max-w-5xl mx-auto">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white to-transparent"></div>

                    <div className="marquee-inner marquee-reverse flex min-w-[200%] py-10">
                        {[...cardsData, ...cardsData].map((card, i) => (
                            <CreateCard key={i} card={card} />
                        ))}
                    </div>

                    <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-white to-transparent"></div>
                </div>
            </div>
        </>
    );
};

export default Testimonial