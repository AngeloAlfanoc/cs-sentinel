import { Link } from '@tanstack/react-router';
import useAuthStore from '../stores/useAuthStore';
import { FaExclamationTriangle, FaInfoCircle, FaVoteYea } from 'react-icons/fa';

const Drawer: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <></>;

  return (
    <div className='w-64 bg-gray-800 mt-1 text-white shadow-lg'>
      <nav className='mt-4 mx-4'>
        <ul>
          <li className='py-2 px-4 hover:bg-gray-700 rounded-sm transition duration-200 flex items-center'>
            <FaVoteYea className='mr-2' />
            <Link to='/' className='flex-1 [&.active]:font-bold [&.active]:text-dark-green'>
              Review
            </Link>
          </li>
          {/* <li className='py-2 px-4 hover:bg-gray-700 rounded-sm transition duration-200 flex items-center'>
            <FaPeopleCarry className='mr-2' />
            <Link
              to='/top-reviewers'
              className='flex-1 [&.active]:font-bold [&.active]:text-dark-green'
            >
              Reviewers
            </Link>
          </li> */}
          <li className='py-2 px-4 hover:bg-gray-700 rounded-sm transition duration-200 flex items-center'>
            <FaExclamationTriangle className='mr-2' />
            <Link to='/suspects' className='flex-1 [&.active]:font-bold [&.active]:text-dark-green'>
              Suspects
            </Link>
          </li>
          {/* <li className='py-2 px-4 hover:bg-gray-700 rounded-sm transition duration-200 flex items-center'>
            <FaFlag className='mr-2' />
            <Link to='/suspects' className='flex-1 [&.active]:font-bold [&.active]:text-dark-green'>
              Reported
            </Link>
          </li> */}
          <li className='py-2 px-4 hover:bg-gray-700 rounded-sm transition duration-200 flex items-center'>
            <FaInfoCircle className='mr-2' />
            <Link to='/about' className='flex-1 [&.active]:font-bold [&.active]:text-dark-green'>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Drawer;
