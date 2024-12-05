import Link from 'next/link';

export default function PageHeader() {
  return (
    <div className='w-screen flex bg-gray-400'>
      <Link
        href='/'
        className='flex text-3xl font-mono text-black hover:bg-gray-600 hover:text-white w-full justify-center items-center py-5'
      >
        Satellite Imaginary
      </Link>
      <Link
        href='/drone'
        className='flex text-3xl font-mono text-black hover:bg-gray-600 hover:text-white w-full justify-center items-center py-5'
      >
        Drone Imaginary
      </Link>
    </div>
  );
}
