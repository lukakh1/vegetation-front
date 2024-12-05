'use client';
import { useState, useCallback } from 'react';
import { HelpCircle } from 'lucide-react';
import { MapProvider } from '@/providers/map-provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapComponent } from '../components/map';
import Image from 'next/image';

export default function Home() {
  const [showTooltip, setShowTooltip] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [coordinates, setCoordinates] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 35.8799866,
    lng: 76.5048004,
  });
  const [mail, setMail] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [afterCompute, setAfterCompute] = useState('');

  const isValidDriveLink = (link) => {
    const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([^\/]+)\/?.*/;
    return driveRegex.test(link);
  };

  const handleUpload = async () => {
    if (isValidDriveLink(driveLink)) {
      try {
        const res = await fetch('http://localhost:3000/get_thumbnail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ driveLink }),
        });

        if (res.ok) {
          const data = await res.json();
          router.push(`/drone/?imagelink=${data}`);
          setSuccess('Image fetched successfully');
        } else {
          setError('Failed to fetch image');
        }
      } catch (err) {
        setError('Error uploading link');
      }
    } else {
      setError('Invalid Google Drive link');
    }
  };

  const handleCompute = async (e) => {
    e.preventDefault();
    const requestBody = {
      coordinates: coordinates,
      mail: mail,
    };

    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    setAfterCompute('everything went great please wait for our response');
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCurrentPosition({ lat, lng });
    document.getElementById('Xcord').value = lat;
    document.getElementById('Ycord').value = lng;
  };

  const handleAddPoint = (e) => {
    e.preventDefault();

    const lat = parseFloat(document.getElementById('Xcord').value);
    const lng = parseFloat(document.getElementById('Ycord').value);
    if (isNaN(lat) || isNaN(lng)) {
      alert(
        'Invalid coordinates! Please provide valid latitude and longitude values.'
      );
      return;
    }
    setCoordinates([...coordinates, { lat, lng }]);
    console.log(coordinates, 'coordinates homepage');
    document.getElementById('Xcord').value = '';
    document.getElementById('Ycord').value = '';
  };

  const handleClearPoints = () => {
    setCoordinates([]);
    setCurrentPosition();
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className='max-h-screen'>
      <div className='flex justify-between space-x-2 h-1/2 p-8 px-20'>
        <div className='flex flex-col pt-10 sm:pt-16 px-5 items-center space-y-10 w-1/2'>
          <h1 className='font-mono text-xl md:text-3xl font-bold'>
            Fill The Boxes
          </h1>
          <div className='flex w-full items-center space-x-2'>
            <div className='flex w-full items-center space-x-2'>
              <label className='text-xl md:text-5xl' htmlFor='Xcord'>
                X:
              </label>
              <input
                id='Xcord'
                type='text'
                name='Xcord'
                className='w-full h-10 md:h-14 px-2 shadow-sm rounded-xl bg-transparent border border-gray-400 disabled:opacity-75 focus:outline-none'
                onChange={(e) =>
                  setCurrentPosition({
                    ...currentPosition,
                    lat: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className='flex w-full items-center space-x-2'>
              <label className='text-xl md:text-5xl' htmlFor='Ycord'>
                Y:
              </label>
              <input
                id='Ycord'
                type='text'
                name='Ycord'
                className='w-full h-10 md:h-14 px-2 shadow-sm rounded-xl bg-transparent border border-gray-400 disabled:opacity-75 focus:outline-none'
                onChange={(e) =>
                  setCurrentPosition({
                    ...currentPosition,
                    lng: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <button
            className='w-44 md:w-64 h-7 md:h-10 rounded-3xl bg-blue-300 font-mono text-xl text-white font-semibold'
            onClick={handleAddPoint}
          >
            Add point
          </button>
          <div className='w-full'>
            <h3 className='text-md md:text-2xl font-mono font-semibold'>
              Coordinates:
            </h3>
            <div className='w-full overflow-auto h-40'>
              <ol>
                {coordinates.map((coord, index) => (
                  <li key={index} className='text-sm font-mono font-semibold'>
                    {`${index + 1}. (${coord.lat}, ${coord.lng}),`}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {coordinates.length > 0 && (
            <button
              type='button'
              className='w-44 md:w-64 h-7 md:h-10 rounded-3xl bg-red-300 font-mono text-xl text-white font-semibold mt-4'
              onClick={handleClearPoints}
            >
              Clear Points
            </button>
          )}
        </div>
        <div className='relative w-full'>
          <MapProvider>
            <MapComponent
              currentPosition={currentPosition}
              onClick={handleMapClick}
              markers={coordinates}
            />
          </MapProvider>
        </div>
      </div>
      <div className='p-8 w-full flex space-x-10 px-20'>
        <div className='w-full '>
          <div>
            <div className='flex space-x-3 items-center'>
              <label
                className='block text-gray-700 text-3xl'
                htmlFor='drive-link'
              >
                Scan`s Drive Link
              </label>
              <div
                className='ml-2 relative'
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <HelpCircle className='w-5 h-5 text-gray-500 cursor-pointer' />
                {showTooltip && (
                  <div className='absolute -top-14 left-0 bg-black text-white text-lg p-2 rounded-md shadow-lg w-64 z-10'>
                    Upload the scan you want to analyze on your Google Drive,
                    press share, set access to Anyone with link and provide us
                    with the link.
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center relative mt-2'>
              <input
                type='text'
                id='drive-link'
                className='w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                placeholder='https://blablabla...'
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
              />
              <button
                onClick={handleUpload}
                className='bg-blue-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-blue-600'
              >
                Upload
              </button>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}
          </div>
          <div className='mb-4 mt-5'>
            <label
              className='block text-gray-700 mb-2 text-3xl'
              htmlFor='email'
            >
              Your Gmail
            </label>
            <input
              type='email'
              id='email'
              className='w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your Gmail'
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <button
            onClick={handleCompute}
            className='px-10 bg-green-400 text-white py-2 rounded-lg hover:bg-green-500 focus:ring-2 focus:ring-green-300 mt-10'
          >
            Compute
          </button>
          <h1>{afterCompute ?? afterCompute}</h1>
        </div>

        <div className='mb-4 w-full'>
          <label className='block text-gray-700 mb-2 text-3xl'>
            Image Preview
          </label>
          <div className='relative w-full h-80 border border-gray-300 rounded-lg flex items-center justify-center'>
            {searchParams.get('imagelink') ? (
              <Image
                alt='drone'
                src={searchParams.get('imagelink')}
                fill={true}
              />
            ) : (
              <h1>please upload drives link to preview image</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
