import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import {
  AlertCircle,
  MapPin,
  Phone,
  Check,
} from "lucide-react";
import { useState, useContext } from "react";
import { toast } from "react-toastify";

import CardDetails from "./CardDetails";
import LiveMap from "./LiveMap";
import { EmergencyContext } from "@/context/EmergecyCon";

const Emergency = () => {
  const [sosActive, setSosActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [alertsSent, setAlertsSent] = useState([]);
  const [nearestHospitals, setNearestHospitals] = useState([]);
  const { detail } = useContext(EmergencyContext); // ✅ useContext at top level

  const handleSOS = async () => {
    setSosActive(true);

    if (!navigator.geolocation) {
      toast.error("❌ Geolocation not supported by this browser");
      setSosActive(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);
        toast.success("✅ Location fetched successfully!");

        try {
          // Fetch nearest hospitals
          const response = await axios.get(
            "http://localhost:4000/api/v4/location",
            { params: { lat: coords.lat, lng: coords.lng } }
          );

          console.log("Backend response:", response.data);

          if (response.data.data && response.data.data.length > 0) {
            setNearestHospitals(response.data.data);
          }

          // Now send SOS email
          await handleEmergency(coords);
          await sendWhatsAppMessage(coords);

          setAlertsSent(["SMS", "Email", "WhatsApp"]);
          toast.success("📍 SOS alert and location sent successfully!");
        } catch (error) {
          console.error(error);
          toast.error("❌ Failed to send location or SOS alert");
        }
      },
      (error) => {
        toast.error("❌ Unable to get location");
        console.error(error);
        setSosActive(false);
      }
    );
  };

  const handleCancel = () => {
    setSosActive(false);
    setAlertsSent([]);
    setLocation(null);
    setNearestHospitals([]);
    toast.info("Emergency alert cancelled");
  };

  const sendWhatsAppMessage = (coords) => {
    if (!detail || !detail.contactDetails || detail.contactDetails.length === 0) {
      toast.error("No contact details available to send");
      return;
    }

    const contact = detail.contactDetails[0]; // first contact
    const phoneNumber = contact.phoneNumber.replace(/\+/g, "").trim();

    const message = `
🚨 *EMERGENCY ALERT* 🚨
Name: ${detail.FullName}
Relation: ${contact.relation || "N/A"}
Phone: ${contact.phoneNumber}
Location: https://www.google.com/maps?q=${coords.lat},${coords.lng}
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank"); // opens WhatsApp
  };


 const handleEmergency = async (coords) => {
  try {
    if (!detail || !detail.email) {
      toast.error("No email found in profile details");
      return;
    }

    await axios.post("http://localhost:4000/api/v4/mail", {
      email: detail.email,
      
      name: detail.FullName,
      relation: detail.contactDetails?.[0]?.relation || "",
      phoneNumber: detail.contactDetails?.[0]?.phoneNumber || "",
      location: coords,

      
    });

    console.log(detail.email,detail.relation,detail.phoneNumber)

    toast.success("🚨 SOS alert sent to your registered email!");
  } catch (error) {
    console.error(error);
    toast.error("❌ Failed to send SOS alert");
  }
};


  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency SOS</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One click to alert your emergency contacts with your live location
          </p>
        </div>

        {!sosActive ? (
          <Card className="mb-8 border-4 border-emergency shadow-emergency">
            <CardContent className="py-12">
              <div className="text-center space-y-6">
                <AlertCircle className="h-24 w-24 text-emergency mx-auto emergency-pulse" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Press in Case of Emergency
                  </h2>
                  <p className="text-muted-foreground">
                    This will immediately alert all your emergency contacts with
                    your current location
                  </p>
                </div>
                <Button
                  variant="emergency"
                  size="xl"
                  onClick={handleSOS} // ✅ only one function now
                  className="w-full bg-emergency px-4 py-6 text-white max-w-sm mx-auto text-lg font-bold shadow-glow emergency-pulse"
                >
                  <AlertCircle className="h-8 w-8" />
                  ACTIVATE EMERGENCY SOS
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-8 border-4 border-emergency shadow-emergency bg-emergency/5">
              <CardContent className="py-12">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <AlertCircle className="h-24 w-24 text-emergency mx-auto emergency-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full bg-emergency/20 animate-ping" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-emergency mb-2">
                      EMERGENCY ALERT ACTIVE
                    </h2>
                    <p className="text-muted-foreground">
                      Your emergency contacts are being notified
                    </p>
                  </div>

                  {location && (
                    <div className="p-4 bg-background rounded-lg max-w-md mx-auto">
                      <div className="flex items-center gap-2 justify-center mb-2">
                        <MapPin className="h-5 w-5 text-emergency" />
                        <span className="font-semibold">Current Location</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lat: {location.lat.toFixed(6)}, Lng:{" "}
                        {location.lng.toFixed(6)}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 max-w-md mx-auto">
                    {["SMS", "Email", "WhatsApp"].map((method) => (
                      <div
                        key={method}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          alertsSent.includes(method)
                            ? "bg-success/10 border border-success"
                            : "bg-muted border border-transparent"
                        }`}
                      >
                        {alertsSent.includes(method) && (
                          <Check className="h-5 w-5 text-success" />
                        )}
                        <span className="font-medium">{method} Alert</span>
                        <span className="ml-auto text-sm">
                          {alertsSent.includes(method)
                            ? "Sent"
                            : "Sending..."}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleCancel}
                    className="mt-6"
                  >
                    Cancel Alert
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Nearest Hospitals List */}
            {nearestHospitals.length > 0 && (
              <Card className="mb-8 shadow-card">
                <CardHeader>
                  <CardTitle>Nearest Hospitals</CardTitle>
                  <CardDescription>
                    Top 5 nearest hospitals from your location
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nearestHospitals.map((hospital, index) => (
                    <div
                      key={index}
                      className="p-4 bg-muted rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-semibold">{hospital.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {hospital.address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Distance: {hospital.distance.toFixed(2)} km
                        </p>
                      </div>
                      <Button variant="medical" size="sm">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      <div>{!sosActive && <CardDetails />}</div>

      <div className="px-52 mb-10">
        {location && <LiveMap location={location} />}
      </div>
    </div>
  );
};

export default Emergency;
