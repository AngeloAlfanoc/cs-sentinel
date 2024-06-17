import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-900 py-5 mt-5'>
      <div className='flex justify-between items-center px-10'>
        <div>
          <h3 className='font-bold text-lg mb-2 text-white'>Links</h3>
          <ul className='list-none p-0'>
            <li>
              <a href='/' className='text-blue-400 hover:text-blue-600 visited:text-purple-400'>
                Review
              </a>
            </li>
            <li>
              <a
                href='/suspects'
                className='text-blue-400 hover:text-blue-600 visited:text-purple-400'
              >
                Suspects
              </a>
            </li>
            <li>
              <a
                href='/about'
                className='text-blue-400 hover:text-blue-600 visited:text-purple-400'
              >
                About
              </a>
            </li>
            <li>
              <a href='/blog' className='text-blue-400 hover:text-blue-600 visited:text-purple-400'>
                Blog
              </a>
            </li>
            <li>
              <a
                href='/contact'
                className='text-blue-400 hover:text-blue-600 visited:text-purple-400'
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='font-bold text-lg mb-2 text-white'>Other</h3>
          <ul className='list-none p-0'>
            <li className='text-gray-400'>Privacy Policy</li>
            <li className='text-gray-400'>Terms of Use</li>
            <li>
              <a
                href='/sitemap'
                className='text-blue-400 hover:text-blue-600 visited:text-purple-400'
              >
                Sitemap
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='font-bold text-lg mb-2 text-white'>Search</h3>
          <form action='/search' method='GET' className='flex'>
            <input
              type='text'
              name='query'
              placeholder='Search...'
              className='mr-2 p-2 flex-grow bg-gray-800 text-white border border-gray-700'
            />
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
