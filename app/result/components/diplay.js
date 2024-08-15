import { BadgeCheck, TriangleAlert } from 'lucide-react';

export default async function Display({ data }) {
  console.log(data);
  return (
    <div>
      <div className='space-y-2 mt-5 px-20'>
        <h2 className='font-mono font-bold text-lg md:text-2xl'>
          Vegetational Health Analyse
        </h2>
        <p className='text-base font-mono px-10'>
          {data.general_analysis.vegetational_health_analysis}
        </p>
      </div>
      <div className='space-y-2 mt-5 px-20'>
        <h2 className='font-mono font-bold text-lg md:text-2xl flex items-center'>
          Alerts{' '}
          <span>
            <TriangleAlert className='text-red-400 w-10 h-10 ml-3 animate-pulse' />
          </span>
        </h2>
        <p className='text-base font-mono px-10'>
          {data.general_analysis.alerts}
        </p>
      </div>
      <div className='space-y-2 mt-5 px-20 '>
        <h2 className='font-mono font-bold text-lg md:text-2xl flex items-center'>
          Recommendations{' '}
          <span>
            <BadgeCheck className='text-green-400 w-10 h-10 ml-3' />
          </span>
        </h2>
        <p className='text-base font-mono px-10'>
          {data.general_analysis.recommendations}
        </p>
      </div>
      <div className='space-y-2 mt-5 px-20'>
        <h2 className='font-mono font-bold text-lg md:text-2xl'>Risks</h2>
        <p className='text-base font-mono px-10'>
          {data.general_analysis.risks}
        </p>
      </div>
      <div className='flex space-x-5 mt-5 px-20'>
        <div className='space-y-2'>
          <h2 className='font-mono font-bold text-lg md:text-2xl'>
            NDVI -{' '}
            <span
              className={`${
                Array.isArray(data.according_ndvi_evi.NDVI)
                  ? 'text-yellow-400'
                  : data.according_ndvi_evi.NDVI === 'LOW'
                  ? 'text-red-400'
                  : data.according_ndvi_evi.NDVI === 'MEDIUM'
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }`}
            >
              {Array.isArray(data.according_ndvi_evi.NDVI)
                ? 'MEDIUM'
                : data.according_ndvi_evi.NDVI}
            </span>
          </h2>
          <p className='text-base font-mono px-10'>
            {data.according_ndvi_evi.NDVI_INTERPRETATION}
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='font-mono font-bold text-lg md:text-2xl'>
            EVI -{' '}
            <span
              className={`${
                Array.isArray(data.according_ndvi_evi.EVI)
                  ? 'text-red-400'
                  : data.according_ndvi_evi.EVI === 'LOW'
                  ? 'text-red-400'
                  : data.according_ndvi_evi.EVI === 'MEDIUM'
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }`}
            >
              {Array.isArray(data.according_ndvi_evi.EVI)
                ? 'LOW'
                : data.according_ndvi_evi.EVI}
            </span>
          </h2>
          <p className='text-base font-mono px-10'>
            {data.according_ndvi_evi.EVI_INTERPRETATION}
          </p>
        </div>
      </div>

      <EachDiv
        name={'Soil Moistures'}
        condition={data.soil_moistures.condition}
        consequences={data.soil_moistures.consequences}
      />
      <EachDiv
        name={'Precipitation'}
        condition={data.precipitation.condition}
        consequences={data.precipitation.consequences}
      />
      <EachDiv
        name={'Lai Context'}
        condition={data.lai_context.condition}
        consequences={data.lai_context.consequences}
      />
      <EachDiv
        name={'Temperature Suitability'}
        condition={data.temperature_suitability.Condition}
        consequences={data.temperature_suitability.Consequences}
      />
      <EachDiv
        name={'Nutrient Absorption'}
        condition={data.nutrient_absorption.Condition}
        consequences={data.nutrient_absorption.consequences}
      />
      <EachDiv
        name={'Albedo Analysis'}
        condition={data.albedo_analysis.Condition}
        consequences={data.albedo_analysis.consequences}
      />

      <div className='mt-5 px-20 space-y-2'>
        <h2 className='font-mono font-bold text-lg md:text-2xl'>
          Crop Suggestions
        </h2>
        <ul>
          {data.crop_suggestions.Crops.map((crop, index) => (
            <li key={index} className='text-base font-mono px-10'>
              {index + 1}.{crop}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const EachDiv = ({ name, condition, consequences }) => {
  return (
    <div className='mt-5 px-20 space-y-2'>
      <h2 className='font-mono font-bold text-lg md:text-2xl'>
        {name} -{' '}
        <span
          className={`${
            condition === 'LOW'
              ? 'text-red-400'
              : condition === 'MEDIUM'
              ? 'text-yellow-400'
              : 'text-green-400'
          }`}
        >
          {condition}
        </span>
      </h2>
      <p className='text-base font-mono px-10'>{consequences}</p>
    </div>
  );
};
