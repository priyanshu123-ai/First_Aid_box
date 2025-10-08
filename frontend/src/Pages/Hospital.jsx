

import React, { useState } from "react";
import axios from "axios";
import { MapPin, Navigation, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom blue icon for user's location
const userIcon = new L.Icon({
  iconUrl:
    "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
  iconSize: [15, 15],
  iconAnchor: [7, 7],
});

// Red marker for hospitals
const hospitalIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Hospital() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestHospitals, setNearestHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("❌ Geolocation not supported by this browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        toast.success("✅ Location fetched successfully!");

        try {
          const response = await axios.get(
            "http://localhost:4000/api/v4/location",
            {
              params: { lat: coords.lat, lng: coords.lng },
            }
          );
          

          console.log("here is response of hospitals location",response);
          

          if (response.data?.data?.length) {
            setNearestHospitals(response.data.data);
          } else {
            toast.info("No hospitals found nearby");
          }

          // console.log("here is nearsthospitals",nearestHospitals);
          
        } catch (err) {
          console.error(err);
          toast.error("❌ Failed to fetch nearby hospitals");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        console.error(error);
        toast.error("❌ Unable to get your location");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">🏥 Nearby Hospitals</h1>
        <p className="text-gray-500">
          Click below to find hospitals closest to your current location.
        </p>
      </div>

      {/* Button */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <button
          onClick={handleGetLocation}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-md"
          disabled={loading}
        >
          {loading ? "Fetching..." : "📍 Use My Location"}
        </button>
      </div>

   
      {userLocation && (
        <div className="w-full  mb-10 rounded-xl overflow-hidden  shadow">
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {/* User marker */}
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userIcon}
            >
              <Popup>You are here</Popup>
            </Marker>

            {/* Hospital markers */}
            {nearestHospitals.map((hospital, i) => (
              <Marker
                key={i}
                position={[hospital.lat, hospital.lon]}
                icon={hospitalIcon}
              >
                <Popup>
                  <div>
                    <strong>{hospital.name}</strong>
                    <br />
                    {hospital.address}
                    <br />
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline block mt-1"
                    >
                      Directions
                    </a>
                    <a
                      href={`tel:${hospital.phone || ""}`}
                      className="text-green-600 underline block mt-1"
                    >
                      Call
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {/* 🏥 List Section */}
      {nearestHospitals.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-left">
            Nearest Hospitals
          </h2>
          <div className="space-y-4">
            {nearestHospitals.map((hospital, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-lg">{hospital.name}</h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {hospital.address}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Distance: {hospital.distance.toFixed(2)} km
                  </p>
                </div>

                <div className="flex gap-3 mt-3 sm:mt-0">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    <Navigation className="w-4 h-4" /> Directions
                  </a>

                  <a
                    href={`tel:${hospital.phone || ""}`}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                  >
                    <Phone className="w-4 h-4" /> Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && nearestHospitals.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No hospitals to show yet. Click the button above to find nearby
          hospitals.
        </div>
      )}
    </div>
  );
}

export default Hospital;