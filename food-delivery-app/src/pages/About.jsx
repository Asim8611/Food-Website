import React from 'react';

const About = () => (
  <div className="bg-gray-100 min-h-screen py-12">
    <div className="container mx-auto px-6">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-6">
        About Us
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8">
        Welcome to <b>ForkNDelight</b>, your ultimate destination for fresh, delicious, and
        fast food delivery. We are passionate about bringing you the finest
        culinary experiences right to your doorstep. Whether it's a quick snack,
        a hearty meal, or a feast for a special occasion, we've got you covered!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Section 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is simple: to make great food accessible to everyone,
            anytime, anywhere. We work with the best local restaurants and chefs
            to ensure that every bite is as delicious as it is convenient.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At <b>ForkNDelight</b>, we pride ourselves on fast delivery, high-quality
            ingredients, and exceptional customer service. From easy online
            ordering to real-time tracking, we make your food experience
            effortless and enjoyable.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Join Us on Our Journey
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Thank you for choosing <b>ForkNDelight</b>. We're excited to serve you and make
          every meal a memorable one. Stay tuned for exciting updates, new
          features, and exclusive offers!
        </p>
      </div>
    </div>
  </div>
);

export default About;
