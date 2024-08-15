'use client';
import { useCallback, useState } from 'react';
import { MapProvider } from '@/providers/map-provider';
import { MapComponent } from './components/map';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { compute } from '@/lib/api-requests';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [coordinates, setCoordinates] = useState([]);
  const [date, setDate] = useState({ start: '', end: '' });
  const [currentPosition, setCurrentPosition] = useState({
    lat: 35.8799866,
    lng: 76.5048004,
  });

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

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className='flex justify-between space-x-2'>
      <div className='flex flex-col pt-10 sm:pt-16 px-5 items-center space-y-10 w-1/2'>
        <h1 className='font-mono text-xl md:text-4xl font-bold'>
          Fill The Boxes
        </h1>
        <div className='flex w-full items-center space-x-5'>
          <label
            className='text-xl md:text-2xl text-nowrap w-36'
            htmlFor='start_date'
          >
            Start Date:
          </label>
          <input
            id='start_date'
            type='date'
            name='start_date'
            className='w-full h-10 md:h-14 px-2 shadow-sm rounded-xl bg-transparent border border-gray-400 disabled:opacity-75 focus:outline-none'
            onChange={(e) => setDate({ start: e.target.value, end: date.end })}
          />
        </div>
        <div className='flex w-full items-center space-x-5'>
          <label
            className='text-xl md:text-2xl text-nowrap w-36'
            htmlFor='end_date'
          >
            End Date:
          </label>
          <input
            id='end_date'
            type='date'
            name='end_date'
            className='w-full h-10 md:h-14 px-2 shadow-sm rounded-xl bg-transparent border border-gray-400 disabled:opacity-75 focus:outline-none'
            onChange={(e) =>
              setDate({ start: date.start, end: e.target.value })
            }
          />
        </div>
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
        <button
          disabled={coordinates.length < 3}
          onClick={() =>
            router.push(
              '/result' +
                '?' +
                createQueryString(
                  'data',
                  JSON.stringify({
                    start_date: date.start,
                    end_date: date.end,
                    coordinates: coordinates.map((coordinate) => [
                      coordinate.lat,
                      coordinate.lng,
                    ]),
                  })
                )
            )
          }
          className='w-44 md:w-64 h-7 md:h-10 rounded-3xl bg-green-300 font-mono text-xl text-white font-semibold fixed bottom-32'
        >
          Compute
        </button>
      </div>
      <MapProvider>
        <MapComponent
          currentPosition={currentPosition}
          onClick={handleMapClick}
          markers={coordinates}
        />
      </MapProvider>
    </div>
  );
}
