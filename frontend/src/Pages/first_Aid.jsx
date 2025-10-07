// -------------------- IMPORTS --------------------
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Flame,
  Bone,
  AlertTriangle,
  Volume2,
  Camera,
  Download,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

// -------------------- COMPONENT --------------------
const FirstAid = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState("en-IN");
  const [selectedVoice, setSelectedVoice] = useState(null);

  const [capturedMedia, setCapturedMedia] = useState({});
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);


  // Automatic prompts for each guide
 

  // -------------------- VOICES --------------------
  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      toast.error("Voice guidance not supported in this browser.");
      return;
    }

    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const allVoices = synth.getVoices();
      setVoices(allVoices);

      if (!selectedVoice && allVoices.length > 0) {
        const defaultVoice =
          allVoices.find((v) => v.lang === selectedLang) ||
          allVoices.find((v) =>
            v.lang.startsWith(selectedLang.split("-")[0])
          ) ||
          allVoices.find((v) => v.name.toLowerCase().includes("hindi")) ||
          allVoices.find((v) => v.name.toLowerCase().includes("india")) ||
          allVoices[0];

        setSelectedVoice(defaultVoice);
      }
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.onvoiceschanged = null;
    };
  }, [selectedLang, selectedVoice]);

  // -------------------- VOICE GUIDE --------------------
  const handleVoiceGuidance = (title, steps) => {
    if (!window.speechSynthesis) {
      toast.error("Speech synthesis not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlaying(true);

    const textToSpeak = `${title}. ${steps.join(". ")}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = selectedLang;
    }

    utterance.rate =
      selectedLang === "hi-IN" ? 0.9 : selectedLang === "ta-IN" ? 0.92 : 0.95;
    utterance.pitch = selectedLang === "hi-IN" ? 1.1 : 1;

    utterance.onend = () => {
      setIsPlaying(false);
      toast.info(`Voice guidance for ${title} completed.`);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      toast.error("Error playing voice guidance.");
    };

    window.speechSynthesis.speak(utterance);
    toast.success(
      `Speaking in ${selectedLang} using ${selectedVoice?.name || "default voice"}`
    );
  };

  const availableVoices = voices.filter((v) =>
    v.lang.startsWith(selectedLang.split("-")[0])
  );

  // -------------------- PHOTO CAPTURE + VIDEO GENERATION --------------------
 // State for query & generated video
const [userQuery, setUserQuery] = useState("");
const [generatedVideo, setGeneratedVideo] = useState(null);
const [loadingVideo, setLoadingVideo] = useState(false);



const handleGenerateVideo = async () => {
  if (!userQuery) return toast.error("Please enter a query");

  try {
    setLoadingVideo(true);

    const res = await fetch("http://localhost:4000/api/v2/Image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userQuery }), // send query like in Postman
    });

    const data = await res.json();

    if (data.success && data.videoUrl) {
      setGeneratedVideo(data.videoUrl); // update state
      toast.success("Video generated successfully!");
    } else {
      toast.error(data.message || "Video generation failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error generating video");
  } finally {
    setLoadingVideo(false);
  }
};

const handlePhotoCapture = (event) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const file = files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const photoUrl = reader.result;
    setSelectedImage(photoUrl); // Store image for preview
    toast.success("Photo selected successfully!");
  };

  reader.readAsDataURL(file);
};



  const removeMedia = (guideId, index) => {
    setCapturedMedia((prev) => ({
      ...prev,
      [guideId]: prev[guideId].filter((_, i) => i !== index),
    }));
    toast.info("Removed media");
  };

  const downloadPDF = (guideTitle) => {
    toast.success(`Downloading ${guideTitle} PDF guide...`);
  };

  // -------------------- FIRST AID DATA --------------------
  const firstAidGuides = [
    {
      id: "burns",
      title: "Burns",
      icon: Flame,
      color: "text-orange-500",
      steps: [
        "Cool the burn under running water for at least 10 minutes.",
        "Remove tight clothing or jewelry near the burn area.",
        "Cover the burn with a clean, non-fluffy cloth or cling film.",
        "Do not apply creams, oils, or ice.",
        "Seek medical attention if the burn is severe or large.",
      ],
    },
    {
      id: "fractures",
      title: "Fractures",
      icon: Bone,
      color: "text-blue-500",
      steps: [
        "Keep the injured limb still and supported.",
        "Apply a splint or padding if trained.",
        "Control any bleeding with a clean cloth.",
        "Do not try to push the bone back in place.",
        "Seek medical help immediately.",
      ],
    },
    {
      id: "bleeding",
      title: "Severe Bleeding",
      icon: AlertTriangle,
      color: "text-red-500",
      steps: [
        "Apply direct pressure to the wound with a clean cloth.",
        "Raise the injured area above the heart if possible.",
        "Do not remove objects stuck in the wound.",
        "Keep applying pressure until help arrives.",
      ],
    },
  ];

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">First-Aid Guide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step-by-step emergency instructions with multilingual voice guidance.
          </p>
        </div>

        {/* Language & Voice */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              className="border rounded-lg px-4 py-2 bg-background"
              value={selectedLang}
              onChange={(e) => {
                setSelectedLang(e.target.value);
                setSelectedVoice(null);
              }}
            >
              <option value="en-IN">English (India)</option>
              <option value="en-US">English (US)</option>
              <option value="hi-IN">Hindi</option>
              <option value="ta-IN">Tamil</option>
              <option value="fr-FR">French</option>
              <option value="es-ES">Spanish</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Voice</label>
            <select
              className="border rounded-lg px-4 py-2 bg-background min-w-[200px]"
              value={selectedVoice?.name || ""}
              onChange={(e) => {
                const voice = voices.find((v) => v.name === e.target.value);
                setSelectedVoice(voice || null);
              }}
            >
              {availableVoices.length > 0 ? (
                availableVoices.map((v, i) => (
                  <option key={i} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))
              ) : (
                <option>No voices available</option>
              )}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="burns" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 bg-transparent">
            {firstAidGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <TabsTrigger
                  key={guide.id}
                  value={guide.id}
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-card data-[state=active]:shadow-card"
                >
                  <Icon className={`h-6 w-6 ${guide.color}`} />
                  <span className="text-sm font-medium">{guide.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {firstAidGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <TabsContent key={guide.id} value={guide.id}>
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-muted">
                            <Icon className={`h-8 w-8 ${guide.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{guide.title}</CardTitle>
                            <CardDescription>
                              Follow these steps carefully
                            </CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="medical"
                          size="lg"
                          onClick={() => handleVoiceGuidance(guide.title, guide.steps)}
                          disabled={isPlaying}
                        >
                          <Volume2 className="h-5 w-5" />
                          {isPlaying ? "Playing..." : "Voice Guide"}
                        </Button>
                      </div>
<div className="my-6 p-4 bg-muted rounded-lg">
  <h3 className="text-lg font-semibold mb-2">Generate Video from Image</h3>

  {/* Image Upload */}
  <div className="flex gap-2 mb-4">
    <input
      type="file"
      accept="image/*"
      capture="environment"
      onChange={handlePhotoCapture}
      className="border rounded-lg px-4 py-2"
    />
  </div>

  {/* Image Preview */}
  {selectedImage && (
    <div className="mb-4">
      <h4 className="font-medium mb-2">Preview</h4>
      <img
        src={selectedImage}
        alt="Selected"
        className="max-w-full rounded-lg border"
      />
    </div>
  )}

  
<div className="my-6 p-4 bg-muted rounded-lg">
  <h3 className="text-lg font-semibold mb-2">Generate Video from Query</h3>

  {/* User Query Input */}
  <div className="flex gap-2 mb-4">
    <input
      type="text"
      placeholder="Enter your query..."
      value={userQuery}
      onChange={(e) => setUserQuery(e.target.value)}
      className="flex-1 border rounded-lg px-4 py-2 bg-background"
    />
    <button
      onClick={handleGenerateVideo}
      disabled={loadingVideo || !userQuery}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
    >
      {loadingVideo ? "Generating..." : "Generate Video"}
    </button>
  </div>

  {/* Generated Video */}
  {generatedVideo && (
    <div className="mt-4 aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
      <video
        controls
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src={generatedVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )}
</div>


  {/* Generated Video */}
  {generatedVideo && (
    <div className="mt-4 aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
      <video
        controls
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src={generatedVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )}
</div>



                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Media */}
                    {capturedMedia[guide.id]?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          Captured Media
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {capturedMedia[guide.id].map((media, idx) => (
                            <div key={idx} className="relative group">
                              {media.type === "image" ? (
                                <img
                                  src={media.url}
                                  alt={`Captured ${idx + 1}`}
                                  className="w-full h-32 object-cover rounded-lg border"
                                />
                              ) : (
                                <video
                                  controls
                                  className="w-full h-32 object-cover rounded-lg border"
                                  autoPlay
                                  loop
                                  muted
                                >
                                  <source src={media.url} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeMedia(guide.id, idx)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Steps */}
                    <div>
                      <h4 className="font-semibold mb-3">Step-by-Step Instructions</h4>
                      <div className="space-y-4">
                        {guide.steps.map((step, index) => (
                          <div
                            key={index}
                            className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="shrink-0 w-8 h-8 rounded-full bg-emergency text-emergency-foreground flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <p className="text-sm leading-relaxed pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Video Tutorial */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Video Tutorial
                      </h4>
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        {capturedMedia[guide.id]?.some((m) => m.type === "video") ? (
                          capturedMedia[guide.id]
                            .filter((m) => m.type === "video")
                            .map((media, idx) => (
                              <video
                                key={idx}
                                controls
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                              >
                                <source src={media.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ))
                        ) : (
                          <p className="text-center text-sm p-4">
                            Upload a photo above to generate a tutorial video.
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default FirstAid;
