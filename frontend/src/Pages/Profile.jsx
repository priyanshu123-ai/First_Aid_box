import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  User,
  Heart,
  FileText,
  Shield,
  Phone,
  Plus,
  Trash2,
} from "lucide-react";
import { EmergencyContext } from "@/context/EmergecyCon";

const Profile = () => {
  const [form, setForm] = useState({
    FullName: "",
    DateOfBirth: "",
    email: "",
    phone: "",
    bloodGroup: "",
    Height: "",
    Weight: "",
    OrganDonor: "",
    Allergies: "",
    CurrentMedications: "",
    MedicalConditions: "",
    InsuranceProvider: "",
    PolicyNumber: "",
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: Date.now(), name: "", phoneNumber: "", relation: "" },
  ]);

  const {setDetail,detail} = useContext(EmergencyContext)

  // handle normal inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // handle select
  const handleSelectChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // emergency contact updates
  const handleContactChange = (id, field, value) => {
    setEmergencyContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([
      ...emergencyContacts,
      { id: Date.now(), name: "", phoneNumber: "", relation: "" },
    ]);
  };

  const removeEmergencyContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter((c) => c.id !== id));
  };

  // save to backend
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        contactDetails: emergencyContacts.map((c) => ({
          name: c.name,
          phoneNumber: c.phoneNumber,
          relation: c.relation,
        })),
      };

      const res = await axios.post(
        "http://localhost:4000/api/v3/profile",
        payload,
        { withCredentials: true }
      );

      setDetail(res.data.data)
      console.log("Detail",detail)

      toast.success("Medical profile saved successfully!");
      console.log("Saved:", res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile");
    }
  };

  // download card as PDF
  const handleDownloadCard = () => {
    const input = document.getElementById("profileCardPreview");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Medical_Profile.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br overflow-x-hidden py-12">
   
      <form onSubmit={handleSaveProfile}>
        <div className="container mx-auto px-4 max-w-4xl ">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Medical Profile
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Store your medical information for faster emergency response
            </p>
          </div>

          {/* Personal Information */}
          <Card className="mb-6 shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Basic details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="FullName">Full Name</Label>
                  <Input
                    id="FullName"
                    value={form.FullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="DateOfBirth">Date of Birth</Label>
                  <Input
                    id="DateOfBirth"
                    type="date"
                    value={form.DateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Info */}
          <Card className="mb-6 shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle>Medical Information</CardTitle>
                  <CardDescription>Critical health details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Blood Group</Label>
                  <Select
                    onValueChange={(val) => handleSelectChange("bloodGroup", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (bg) => (
                          <SelectItem key={bg} value={bg}>
                            {bg}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="Height">Height (cm)</Label>
                  <Input
                    id="Height"
                    type="number"
                    value={form.Height}
                    onChange={handleChange}
                    placeholder="170"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="Weight">Weight (kg)</Label>
                  <Input
                    id="Weight"
                    type="number"
                    value={form.Weight}
                    onChange={handleChange}
                    placeholder="70"
                  />
                </div>
                <div>
                  <Label>Organ Donor</Label>
                  <Select
                    onValueChange={(val) => handleSelectChange("OrganDonor", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="undecided">Undecided</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="Allergies">Allergies</Label>
                <Textarea
                  id="Allergies"
                  value={form.Allergies}
                  onChange={handleChange}
                  placeholder="List any allergies"
                />
              </div>
              <div>
                <Label htmlFor="CurrentMedications">Current Medications</Label>
                <Textarea
                  id="CurrentMedications"
                  value={form.CurrentMedications}
                  onChange={handleChange}
                  placeholder="List medications"
                />
              </div>
              <div>
                <Label htmlFor="MedicalConditions">Medical Conditions</Label>
                <Textarea
                  id="MedicalConditions"
                  value={form.MedicalConditions}
                  onChange={handleChange}
                  placeholder="Chronic conditions or history"
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="mb-6 shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Emergency Contacts</CardTitle>
                    <CardDescription>In case of emergency</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={addEmergencyContact}>
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((c, i) => (
                <div key={c.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm">
                      Contact {i + 1}
                    </span>
                    {emergencyContacts.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeEmergencyContact(c.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={c.name}
                        onChange={(e) =>
                          handleContactChange(c.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        type="tel"
                        value={c.phoneNumber}
                        onChange={(e) =>
                          handleContactChange(
                            c.id,
                            "phoneNumber",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Relation</Label>
                      <Select
                        onValueChange={(val) =>
                          handleContactChange(c.id, "relation", val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={c.relation || "Select"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insurance */}
          <Card className="mb-6 shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <CardTitle>Insurance Info</CardTitle>
                  <CardDescription>Optional</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="InsuranceProvider">Provider</Label>
                <Input
                  id="InsuranceProvider"
                  value={form.InsuranceProvider}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="PolicyNumber">Policy Number</Label>
                <Input
                  id="PolicyNumber"
                  value={form.PolicyNumber}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" size="lg" onClick={handleDownloadCard}>
              <FileText className="h-5 w-5" /> Download Profile Card
            </Button>
            <Button type="submit" size="lg" className="bg-blue-600 text-white">
              Save Profile
            </Button>
          </div>

          {/* PDF Preview */}
 
        </div>
      </form>
    </div>
  );
};

export default Profile;