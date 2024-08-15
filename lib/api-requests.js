import { redirect } from 'next/navigation';

export async function compute(start_date, end_date, coordinates) {
  // console.log(
  //   start_date,
  //   end_date,
  //   coordinates.map((coordinate) => [coordinate.lat, coordinate.lng])
  // );
  const url = 'https://alertree.onrender.com/vegetation_health/general_text';

  const queryParams = new URLSearchParams({
    start_date: start_date,
    end_date: end_date,
  });

  const requestBody = {
    coordinates: coordinates.map((coordinate) => [
      coordinate.lat,
      coordinate.lng,
    ]),
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
  console.log(fetchedData);
  // redirect('/result');
}
