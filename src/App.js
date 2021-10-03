import axios from "axios";
import { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./App.css";

const accessToken =
  "pk.eyJ1Ijoia2ltc29uMTM5MSIsImEiOiJja3VhdXFjbXowaWE4MzFtdjMxaDM0bjd6In0.PRwZMiBmbXNi7Y6xunfQ-g";

const addressData = [
  {
    id: 1,
    address: "Ngã Tư Hàng Xanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh",
  },
  {
    id: 2,
    address:
      "276 Điện Biên Phủ, Phường 17, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam",
  },
  {
    id: 3,
    address:
      "76 Đường Bạch Đằng, Phường 24, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam",
  },
];

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 10.80183636077585,
    longitude: 106.7114496684451,
    zoom: 16,
  });
  const [addressMarker, setAddressMarker] = useState([]);

  useEffect(() => {
    const newAddressData = [];
    addressData.map((addr) => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${addr.address}.json?access_token=${accessToken}`
        )
        .then(function (response) {
          // handle success
          newAddressData.push({
            ...addressData,
            longitude: response.data.features[0].center[0],
            latitude: response.data.features[0].center[1],
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    });
    console.log(newAddressData);
    setAddressMarker(newAddressData);
  }, []);

  return (
    <div className="App">
      <div className="App-content">
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={accessToken}
        >
          {addressMarker.map((addr) => {
            return (
              <Marker
                latitude={addr.latitude}
                longitude={addr.longitude}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <img
                  style={{ width: 22, height: 26 }}
                  src="https://pngfree.io/upload/imgs/pngwing/free-png-zdvkr.png"
                  alt="Marker"
                />
              </Marker>
            );
          })}
        </ReactMapGL>
      </div>
    </div>
  );
}

export default App;
