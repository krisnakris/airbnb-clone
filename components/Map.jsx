import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResult }) {
  const coordinates = searchResult.map((item) => ({
    latitude: item.lat,
    longitude: item.long,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    width: '100%',
    height: '100%',
  });

  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <ReactMapGL
      mapStyle={'mapbox://styles/krisnakris/cky291wxl1mm615nzknxi6m9h'}
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetTop={-10}
            offsetLeft={-20}
          >
            <p
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelectedLocation(result)}
              aria-label="push-pin"
              role={'img'}
            >
              {' '}
              📌
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
