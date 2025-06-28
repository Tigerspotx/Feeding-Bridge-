import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Building, Users, Info, Award, Heart, PenLine, Share } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/layout/Navbar';

const AboutUs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("organization");
  
  const [content, setContent] = useState({
    organizationName: "Byte Benders",
    organizationDescription: "Byte Benders is a tech-driven social enterprise committed to fighting food waste and hunger through innovative digital solutions. Founded in 2023, we've been working to build bridges between food donors and recipients through our FeedingBridge platform.",
    mission: "At Byte Benders, we believe technology can help solve some of the world's most pressing problems. Our mission is to reduce food waste by connecting surplus food with those who need it most, using data-driven solutions to make food distribution more efficient and equitable.",
    leadership: "Our diverse team of technologists, food security experts, and community organizers work together to build and improve the FeedingBridge platform.",
    volunteers: "We're supported by a network of dedicated volunteers who help with food pickup, delivery, and community outreach.",
    joinText: "Whether you're a restaurant with surplus food, an organization helping those in need, or someone looking to volunteer your time, FeedingBridge welcomes you to join our community and be part of the solution."
  });

  const [editing, setEditing] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");

  // Team members data
  const teamMembers = [
    { 
      name: "Alex Johnson", 
      role: "Founder & CEO", 
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=alex", 
      bio: "10+ years in food tech innovation",
    },
    { 
      name: "Sam Rivera", 
      role: "Chief Operations Officer", 
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=sam", 
      bio: "Former logistics manager for major food distributors",
    },
    { 
      name: "Taylor Kim", 
      role: "Head of Technology", 
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=taylor", 
      bio: "Full-stack developer passionate about social impact",
    },
    { 
      name: "Jordan Lee", 
      role: "Community Relations", 
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=jordan", 
      bio: "Connects organizations with food resources",
    },
  ];
  
  // Impact statistics
  const impactStats = [
    { metric: "10,000+", label: "Meals Saved", icon: <Heart className="h-6 w-6 text-red-500" /> },
    { metric: "100+", label: "Partner Organizations", icon: <Building className="h-6 w-6 text-blue-500" /> },
    { metric: "50+", label: "Cities Served", icon: <Award className="h-6 w-6 text-amber-500" /> },
  ];

  const handleEdit = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setEditing(true);
  };

  const saveChanges = () => {
    if (editField && editValue) {
      setContent({
        ...content,
        [editField]: editValue
      });
      toast({
        title: "Success",
        description: `Successfully updated ${editField.replace(/([A-Z])/g, ' $1').toLowerCase()}`
      });
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditField("");
    setEditValue("");
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "About page link copied to clipboard!"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foodbridge-primary">About FeedingBridge</h1>
          <Button variant="outline" size="sm" onClick={copyShareLink} className="flex items-center gap-2">
            <Share className="h-4 w-4" /> Share
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="organization" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Organization</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Our Team</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="organization">
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-6 w-6" />
                      Organization Profile
                    </CardTitle>
                    <CardDescription>Meet the team behind FeedingBridge</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit("organizationName", content.organizationName)}>
                    <PenLine className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-foodbridge-primary mb-2">{content.organizationName}</h2>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit("organizationDescription", content.organizationDescription)}>
                      <PenLine className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600">
                    {content.organizationDescription}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Our Mission
                    </h3>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit("mission", content.mission)}>
                      <PenLine className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600">
                    {content.mission}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5" />
                    Our Team
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Leadership</h4>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit("leadership", content.leadership)}>
                          <PenLine className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-600">
                        {content.leadership}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Volunteers</h4>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit("volunteers", content.volunteers)}>
                          <PenLine className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-600">
                        {content.volunteers}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-foodbridge-primary/10 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold mb-2">Join Our Cause</h3>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit("joinText", content.joinText)}>
                      <PenLine className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-700">
                    {content.joinText}
                  </p>
                  <div className="mt-4">
                    <Button className="bg-foodbridge-primary hover:bg-foodbridge-secondary">Get Involved</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Our Team
                </CardTitle>
                <CardDescription>Meet the people behind FeedingBridge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="p-6 flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(part => part[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-foodbridge-primary mb-2">{member.role}</p>
                        <p className="text-gray-600 text-sm">{member.bio}</p>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-6">Join Our Team</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-600 mb-4">
                      We're always looking for passionate individuals who want to make a difference in reducing food waste and fighting hunger.
                    </p>
                    <Button className="bg-foodbridge-primary hover:bg-foodbridge-secondary">View Open Positions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="impact">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Our Impact
                </CardTitle>
                <CardDescription>How we're making a difference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {impactStats.map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-gray-100 rounded-full">
                          {stat.icon}
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{stat.metric}</h3>
                        <p className="text-gray-600">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Environmental Impact</h3>
                    <p className="text-gray-600">
                      By redirecting surplus food from landfills, we've reduced greenhouse gas emissions equivalent to taking 500 cars off the road for a year.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Social Impact</h3>
                    <p className="text-gray-600">
                      We've helped provide nutritious meals to thousands of people facing food insecurity, contributing to healthier communities.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Economic Impact</h3>
                    <p className="text-gray-600">
                      Our platform has helped businesses save on waste disposal costs while generating positive brand value through social responsibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="font-bold text-lg mb-4">Edit {editField.replace(/([A-Z])/g, ' $1').toLowerCase()}</h3>
              
              <textarea 
                className="w-full border border-gray-300 rounded-md p-3 min-h-[150px] mb-4" 
                value={editValue} 
                onChange={(e) => setEditValue(e.target.value)}
              />
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                <Button onClick={saveChanges}>Save Changes</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
