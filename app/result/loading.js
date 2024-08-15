import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex h-full justify-center items-center'>
      <Loader className='w-40 h-40 animate-spin' />
      <p className=''>computing...</p>
    </div>
  );
}
