import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Heart, Phone, MapPin, BookOpen, Shield, Clock, 
  AlertCircle, FileText 
} from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";
import Navbar from "./Navbar";

import firstAidIcon from "@/assets/first-aid-icon.png";
import sosIcon from "@/assets/sos-icon.png";
import hospitalIcon from "@/assets/hospital-icon.png";


 // ✅ use new Header

const Home = () => {
  return (
    <div className="min-h-screen  flex flex-col">
      {/* Navbar/Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden flex-grow">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/20 backdrop-blur-sm rounded-full border border-white/30">
              <Heart className="h-4 w-4 text-white" fill="currentColor" />
              <span className="text-sm text-white font-medium">One Click to Save a Life</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Emergency First-Aid & Nearest Help
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Get instant first-aid guidance, send emergency alerts, and find nearby hospitals. 
              Every second counts in an emergency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/emergency">
                <Button  size="xl" className="bg-emergency py-5 px-8 text-xl w-full rounded-lg hover:bg-emergency-hover sm:w-auto shadow-glow emergency-pulse">
                  <AlertCircle className="h-5 w-5" />
                  Emergency SOS
                </Button>
              </Link>
              <Link to="/first-aid">
                <Button variant="outline" size="xl" className="w-full py-5 px-8 text-xl sm:w-auto bg-white hover:bg-white/90 text-foreground border-white">
                  <BookOpen className="h-5 w-5" />
                  First Aid Guide
                </Button>
              </Link>
            </div>
            
            <div className="pt-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-white hover:text-white/90 hover:bg-white/10">
                  Sign in to save your medical profile →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    <section className="w-full py-20 bg-gradient-subtle">
        <div className="w-full container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Life-Saving Features at Your Fingertips
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive emergency assistance designed to help you act quickly and confidently in critical situations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* First Aid Guide Card */}
            <Card className="shadow-card hover:shadow-emergency transition-all duration-300 border-2 hover:border-emergency/50">
              <CardHeader>
                <div className="mb-4">
                  <img 
                    src={firstAidIcon} 
                    alt="First Aid" 
                    className="h-16 w-16 mx-auto"
                  />
                </div>
                <CardTitle className="text-2xl text-center">First-Aid Guide</CardTitle>
                <CardDescription className="text-center">
                  Step-by-step instructions with voice guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Heart className="h-5 w-5 text-emergency shrink-0 mt-0.5" />
                    <span className="text-sm">CPR & heart attack response</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-medical shrink-0 mt-0.5" />
                    <span className="text-sm">Burns & wound treatment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm">Fractures & injuries</span>
                  </li>
                </ul>
                <Link to="/first-aid">
                  <Button variant="medical" className="w-full bg-medical">
                    View Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* SOS Emergency Card */}
            <Card className="shadow-card hover:shadow-emergency transition-all duration-300 border-2 hover:border-emergency/50 ring-2 ring-emergency/20">
              <CardHeader>
                <div className="mb-4">
                  <img 
                    src={sosIcon} 
                    alt="Emergency SOS" 
                    className="h-16 w-16 mx-auto"
                  />
                </div>
                <CardTitle className="text-2xl text-center">Emergency SOS</CardTitle>
                <CardDescription className="text-center">
                  One-click emergency alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-emergency shrink-0 mt-0.5" />
                    <span className="text-sm">Alert emergency contacts instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-medical shrink-0 mt-0.5" />
                    <span className="text-sm">Share live location automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm">Fastest response time</span>
                  </li>
                </ul>
                <Link to="/emergency">
                  <Button variant="emergency" className="w-full bg-emergency-hover ">
                    Activate SOS
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Hospital Locator Card */}
            <Card className="shadow-card hover:shadow-emergency transition-all duration-300 border-2 hover:border-emergency/50">
              <CardHeader>
                <div className="mb-4">
                  <img 
                    src={hospitalIcon} 
                    alt="Hospital Locator" 
                    className="h-16 w-16 mx-auto"
                  />
                </div>
                <CardTitle className="text-2xl text-center">Hospital Locator</CardTitle>
                <CardDescription className="text-center">
                  Find nearest medical facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-emergency shrink-0 mt-0.5" />
                    <span className="text-sm">Nearby hospitals & clinics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-medical shrink-0 mt-0.5" />
                    <span className="text-sm">Direct contact information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm">Real-time availability</span>
                  </li>
                </ul>
                <Link to="/hospitals">
                  <Button variant="medical" className="w-full bg-medical">
                    Find Hospitals
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


       <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto border-2 border-medical/30 shadow-card">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-medical mx-auto mb-4" />
              <CardTitle className="text-3xl">Create Your Medical Profile</CardTitle>
              <CardDescription className="text-lg">
                Store vital medical information for faster emergency response
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <Shield className="h-8 w-8 text-medical mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Blood Group</h3>
                  <p className="text-sm text-muted-foreground">Critical in emergencies</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Heart className="h-8 w-8 text-emergency mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Allergies</h3>
                  <p className="text-sm text-muted-foreground">Prevent complications</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <FileText className="h-8 w-8 text-success mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Conditions</h3>
                  <p className="text-sm text-muted-foreground">Medical history</p>
                </div>
              </div>
              <div className="text-center pt-4">
                <Link to="/profile">
                  <Button variant="medical" size="lg">
                    Set Up Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

         <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Available</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">&lt;30s</div>
              <div className="text-white/80">Response Time</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
              <div className="text-white/80">First-Aid Guides</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/80">Hospitals Listed</div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
