import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Calendar, Shield, Bell } from "lucide-react";

function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  });

  const handleSaveProfile = () => {
    updateUser({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-ui-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-ui-gray-200">
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-ui-gray-600 mt-1">
              Manage your personal information and preferences
            </p>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Mobile Tab Navigation */}
            <div className="md:hidden border-b border-ui-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                        activeTab === tab.id
                          ? "text-brand-primary border-b-2 border-brand-primary"
                          : "text-ui-gray-600 hover:text-ui-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 border-r border-ui-gray-200">
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
                        activeTab === tab.id
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "text-ui-gray-600 hover:bg-ui-gray-50 hover:text-ui-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Profile Information</h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      size="sm"
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  {/* Profile Picture */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-ui-gray-600">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3 text-ui-gray-400" />
                        <span className="text-xs text-ui-gray-500">
                          Member since {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              firstName: e.target.value,
                            })
                          }
                          className="input-field"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-ui-gray-50 rounded-lg">
                          {user.firstName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              lastName: e.target.value,
                            })
                          }
                          className="input-field"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-ui-gray-50 rounded-lg">
                          {user.lastName}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address
                      </label>
                      <div className="px-3 py-2 bg-ui-gray-50 rounded-lg flex items-center justify-between">
                        <span>{user.email}</span>
                        <div className="flex items-center gap-1">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-600">Verified</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          className="input-field"
                          placeholder="(555) 123-4567"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-ui-gray-50 rounded-lg">
                          {profileData.phone || "Not provided"}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Country
                      </label>
                      {isEditing ? (
                        <select
                          value={profileData.country}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              country: e.target.value,
                            })
                          }
                          className="input-field"
                        >
                          <option value="">Select country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                        </select>
                      ) : (
                        <div className="px-3 py-2 bg-ui-gray-50 rounded-lg">
                          {profileData.country || "Not provided"}
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-ui-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium">Order Updates</h3>
                        <p className="text-sm text-ui-gray-600">
                          Get notified about order status changes
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.orderUpdates}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              orderUpdates: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-ui-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-ui-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium">Promotions & Offers</h3>
                        <p className="text-sm text-ui-gray-600">
                          Receive special deals and promotions
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.promotions}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              promotions: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-ui-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-ui-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium">Newsletter</h3>
                        <p className="text-sm text-ui-gray-600">
                          Stay updated with our latest news and features
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.newsletter}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              newsletter: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-ui-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                      </label>
                    </div>
                  </div>

                  <Button>Save Notification Preferences</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
