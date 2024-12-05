// 'use client';

// import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';

// export const defaultMapContainerStyle = {
//   width: '100%',
//   height: '100vh',
//   borderRadius: '15px 0px 0px 15px',
// };

// const defaultMapZoom = 5;

// const defaultMapOptions = {
//   zoomControl: true,
//   tilt: 0,
//   gestureHandling: 'auto',
//   minZoom: 3,
//   maxZoom: 20,
//   mapTypeId: 'hybrid',
// };

// // Function to calculate the distance between two points (Haversine formula)
// const getDistance = (p1, p2) => {
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = (p2.lat - p1.lat) * (Math.PI / 180);
//   const dLng = (p2.lng - p1.lng) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(p1.lat * (Math.PI / 180)) *
//       Math.cos(p2.lat * (Math.PI / 180)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in kilometers
// };

// const MapComponent = ({ currentPosition, onClick, markers }) => {
//   // Find the two closest markers to the current position
//   const getClosestMarkers = (newMarker, existingMarkers) => {
//     const distances = existingMarkers.map((marker) => ({
//       marker,
//       distance: getDistance(newMarker, marker),
//     }));
//     distances.sort((a, b) => a.distance - b.distance);
//     distances.push(distances[0]);
//     return distances.slice(1, distances.length).map((d) => d.marker);
//     // return distances.slice(0, 2).map((d) => d.marker);
//   };

//   // Create the polygon path with connections to the two closest markers
//   const getPolygonPaths = (markers) => {
//     if (markers.length <= 2) {
//       return markers; // If there are 2 or fewer markers, return them as the polygon path
//     }

//     const newMarker = markers[markers.length - 1];
//     const closestMarkers = getClosestMarkers(newMarker, markers.slice(0, -1));
//     return [...closestMarkers, newMarker];
//   };

//   const polygonPaths = getPolygonPaths(markers);
//   console.log(polygonPaths);

//   return (
//     <div className='w-[50%] absolute right-0'>
//       <GoogleMap
//         mapContainerStyle={defaultMapContainerStyle}
//         center={currentPosition}
//         zoom={defaultMapZoom}
//         options={defaultMapOptions}
//         onClick={onClick}
//       >
//         {currentPosition && <Marker position={currentPosition} />}
//         {markers.map((marker, index) => (
//           <Marker key={index} position={marker} />
//         ))}

//         {markers.length > 0 && (
//           <Polygon
//             paths={polygonPaths}
//             options={{
//               strokeColor: '#FF0000',
//               strokeOpacity: 0.8,
//               strokeWeight: 2,
//               fillColor: 'green',
//               fillOpacity: 0.75,
//             }}
//           />
//         )}
//       </GoogleMap>
//     </div>
//   );
// };

// export { MapComponent };

import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';
import hull from 'hull.js'; // Import the hull library

const defaultMapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '15px 0px 0px 15px',
};

const defaultMapZoom = 5;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: 'auto',
  minZoom: 3,
  maxZoom: 20,
  mapTypeId: 'hybrid',
};

const MapComponent = ({ currentPosition, onClick, markers }) => {
  // Convert markers to array of [lng, lat]
  const markerPoints = markers.map((marker) => [marker.lat, marker.lng]);

  // Calculate the convex hull (outer boundary) of the points
  const hullPoints = hull(markerPoints, 10); // 10 is the concavity; adjust as needed

  // Convert back to array of {lat, lng}
  const polygonPaths =
    markers.length > 0 &&
    hullPoints.map((point) => ({
      lat: point[0],
      lng: point[1],
    }));

  console.log(polygonPaths, 'polygon');
  return (
    <div className='w-full h-full'>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={currentPosition}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        onClick={onClick}
      >
        {currentPosition && <Marker position={currentPosition} />}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}

        {markers.length > 0 && (
          <Polygon
            paths={polygonPaths}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: 'green',
              fillOpacity: 0.75,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
