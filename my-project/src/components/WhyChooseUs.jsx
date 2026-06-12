import React from 'react';
import { Truck, ShieldCheck, BadgeCheck, Clock } from 'lucide-react';

const features = [
  {
    icon: <Truck size={28} />,
    title: 'Fast Delivery',
    desc: 'Get your groceries delivered within 30 minutes at your doorstep.',
  },
  {
    icon: <BadgeCheck size={28} />,
    title: 'Fresh & Quality Products',
    desc: 'We ensure every product is fresh, tested, and high quality.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Secure Payments',
    desc: '100% secure payment gateway with encrypted transactions.',
  },
  {
    icon: <Clock size={28} />,
    title: '24/7 Support',
    desc: 'Our support team is always available to help you anytime.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="mt-20 px-4">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-bold">
          Why Choose <span className='text-primary'>Us</span>
        </h2>

        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-2xl mx-auto">
          We focus on speed, quality, and trust to give you the best shopping experience.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

          {features.map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-gray-200
              bg-white hover:shadow-lg hover:-translate-y-1 hover:bg-primary/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;