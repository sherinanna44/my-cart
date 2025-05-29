import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <section className="bg-gray-100 py-12">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    Lorem ipsum is a placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout. It is the standard placeholder text of the printing and publishing industries. It does not have any meaningful content and is often used to fill spaces in design mockups.
    </p>

    <div className="mt-8 grid md:grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Lorem ipsum</h3>
        <p className="text-gray-600">
        Lorem ipsum is a placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout.
        </p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Lorem ipsum</h3>
        <p className="text-gray-600">
        Lorem ipsum is a placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout.
        </p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Lorem ipsum</h3>
        <p className="text-gray-600">
        Lorem ipsum is a placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout.
        </p>
      </div>
    </div>

    <div className="mt-8">
    <Link to={'/'} className="px-6 py-3 bg-gray-900 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 transition">
        Shop Now
      </Link>
    </div>
  </div>
</section>

  );
}
export default About;