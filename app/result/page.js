import Display from './components/diplay';
export default async function Page({ searchParams }) {
  console.log(searchParams?.data);
  const dataParams = searchParams?.data;
  const dataToFetch = JSON.parse(dataParams);
  const url = 'https://alertree.onrender.com/vegetation_health/general_text';

  const queryParams = new URLSearchParams({
    start_date: dataToFetch.start_date, // Replace with your actual start date
    end_date: dataToFetch.end_date, // Replace with your actual end date
  });

  const requestBody = {
    coordinates: dataToFetch.coordinates,
  };

  const response = await fetch(`${url}?${queryParams}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const fetchedData = await response.json();
  console.log('olareee');
  return (
    <div className='flex w-full flex-col pl-8 pt-10 pr-2 mb-10'>
      <h1 className='font-mono font-bold text-xl md:text-3xl'>
        Vegetation Health
      </h1>

      <Display data={fetchedData} />
      {/* <div className='flex justify-between pl-10 h-3/4'>
        <div className='flex flex-col mt-8'>
          {data.map((item) => {
            return (
              <div key={item.id}>
                <h2 className='font-mono text-lg md:text-2xl'>{item.title}</h2>
                {item.variants && (
                  <div className='flex w-72 md:w-96 mt-2 pl-5 justify-between'>
                    {item.variants?.map((variant, index) => {
                      return (
                        <p
                          className={`text-md font-mono ${
                            variant.isActive
                              ? variant.variant === 'low'
                                ? 'text-red-500'
                                : variant.variant === 'medium'
                                ? 'text-yellow-600'
                                : variant.variant === 'good'
                                ? 'text-green-500'
                                : variant.variant === 'excellent'
                                ? 'text-green-300'
                                : 'text-green-500'
                              : 'text-gray-700'
                          }`}
                          key={index}
                        >
                          {variant.variant}
                        </p>
                      );
                    })}
                  </div>
                )}
                {item.rate && (
                  <p className='text-md font-mono text-red-500 ml-5 mt-2'>
                    {item.rate}
                  </p>
                )}
                {item.moisture && (
                  <div className='flex flex-col mt-2 pl-5'>
                    {item.moisture.map((moisture, index) => {
                      return (
                        <div key={index}>
                          <p className='text-md font-mono'>
                            {moisture.between}
                          </p>
                          <p className='text-sm font-mono ml-2 text-green-500'>
                            moist:
                            <span className='ml-3 text-red-500'>
                              {moisture.moist}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className='space-y-2 mt-5'>
        <h2 className='font-mono font-bold text-lg md:text-2xl'>
          Recommendations
        </h2>
        <p>
          lorem ipsum dolor sit amet sio son con azucar nina nino kokini sumaned
          in sonna
        </p>
      </div> */}
    </div>
  );
}

{
  /* <table className='flex flex-col divide-gray-200 h-5/6 overflow-scroll hide-scrollbar w-52 md:w-64'>
          <thead>
            <tr className='flex w-full'>
              <th className='w-full flex justify-center py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                index
              </th>
              <th className='w-full flex justify-center py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                value
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-gray-200 divide-y rounded-b-lg '>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center text-xs md:text-sm'>
                NDVI
              </td>
              <td className='py-4 w-full flex justify-center'>12</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center text-xs md:text-sm'>
                EVI
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center text-xs md:text-sm'>
                SoilMoi0__10
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='w-full flex justify-center py-4 text-xs md:text-sm'>
                SoilMoi10__40
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
            <tr className='flex'>
              <td className='py-4 w-full flex justify-center'>
                SoilMoi40__100
              </td>
              <td className='py-4 w-full flex justify-center'>22</td>
            </tr>
          </tbody>
        </table> */
}
