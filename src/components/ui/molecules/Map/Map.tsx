import * as S from './Map.styles';

import { TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useMediaQuery } from 'react-responsive';

export type Place = {
  id: string;
  name: string;
  slug: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type MapProps = {
  places?: Place[];
};

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
const MAPBOX_USERID = process.env.NEXT_PUBLIC_MAPBOX_USERID;
const MAPBOX_STYLEID = process.env.NEXT_PUBLIC_MAPBOX_STYLEID;

const CustomTileLayer = () => {
  return MAPBOX_API_KEY ? (
    <TileLayer
      attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/${MAPBOX_STYLEID}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`}
    />
  ) : (
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  );
};

const MapClickHandler = () => {
  useMapEvents({
    click() {
      if (typeof window !== 'undefined') {
        window.open('https://maps.app.goo.gl/RcqFNYbKHADmsF289', '_blank', 'noopener,noreferrer');
      }
    }
  });
  return null;
};

const Map = ({ places }: MapProps) => {
  const isPortrait = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <S.Container>
      <S.Wrapper
        center={[-15.703486713884006, -44.02608671239952]}
        zoom={16}
        minZoom={3}
        dragging={!isPortrait}
        touchZoom={true}
        scrollWheelZoom={false}
        maxBounds={[
          [-180, 180],
          [180, -180]
        ]}
      >
        <CustomTileLayer />
        <MapClickHandler />
        {places?.map(({ id, name, location }) => {
          const { latitude, longitude } = location;
          return <Marker key={`place-${id}`} position={[latitude, longitude]} title={name} />;
        })}
      </S.Wrapper>
      <S.ArrowMoldingUp xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 19">
        <path d="M25.5 18.85C25.5 9.426 43 1.347 50 1.347V0H0v1.347c7 0 25.5 8.078 25.5 17.504Z" fill="currentColor" />
      </S.ArrowMoldingUp>
      <S.ArrowMoldingDown xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 19">
        <path
          d="M24.5 0C24.5 9.425 7 17.504 0 17.504v1.347h50v-1.347c-7 0-25.5-8.079-25.5-17.504Z"
          fill="currentColor"
        />
      </S.ArrowMoldingDown>
    </S.Container>
  );
};

export default Map;
