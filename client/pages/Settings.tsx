import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import {
  Settings,
  User,
  Shield,
  Bell,
  Globe,
  Palette,
  Database,
  Mail,
  Key,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Download,
  Upload,
} from "lucide-react";

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      phone: "",
      company: "",
      bio: "",
    },
    security: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: false,
      loginNotifications: true,
      passwordExpiry: "90",
    },
    notifications: {
      emailMarketing: true,
      emailOrders: true,
      emailSecurity: true,
      pushNotifications: true,
      smsNotifications: false,
      weeklyDigest: true,
    },
    preferences: {
      language: "en",
      timezone: "UTC-8",
      currency: "USD",
      theme: "light",
      itemsPerPage: "20",
      autoSave: true,
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      dataCollection: true,
      analytics: true,
      cookies: true,
    },
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      // Reset to default values
      setSettings({
        ...settings,
        notifications: {
          emailMarketing: true,
          emailOrders: true,
          emailSecurity: true,
          pushNotifications: true,
          smsNotifications: false,
          weeklyDigest: true,
        },
        preferences: {
          language: "en",
          timezone: "UTC-8",
          currency: "USD",
          theme: "light",
          itemsPerPage: "20",
          autoSave: true,
        },
      });
      alert("Settings reset to default values!");
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "shopfusion-settings.json";
    link.click();
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "privacy", label: "Privacy", icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-ui-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-ui-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BackButton to="/" />
          <div className="mt-4">
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Account Settings
            </h1>
            <p className="text-ui-gray-600 mt-2">
              Manage your account preferences and security settings
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-4">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-brand-primary text-white"
                          : "text-ui-gray-700 hover:bg-ui-gray-100"
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button onClick={handleSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
              <Button
                onClick={handleExportData}
                variant="outline"
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-6">
              {/* Profile Settings */}
              {activeSection === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Profile Information
                    </h2>
                    <p className="text-ui-gray-600 mb-6">
                      Update your account profile information and email address.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.firstName}
                        onChange={(e) =>
                          handleSettingChange(
                            "profile",
                            "firstName",
                            e.target.value,
                          )
                        }
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.lastName}
                        onChange={(e) =>
                          handleSettingChange(
                            "profile",
                            "lastName",
                            e.target.value,
                          )
                        }
                        className="input-field"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) =>
                          handleSettingChange(
                            "profile",
                            "email",
                            e.target.value,
                          )
                        }
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) =>
                          handleSettingChange(
                            "profile",
                            "phone",
                            e.target.value,
                          )
                        }
                        className="input-field"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={settings.profile.company}
                        onChange={(e) =>
                          handleSettingChange(
                            "profile",
                            "company",
                            e.target.value,
                          )
                        }
                        className="input-field"
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={settings.profile.bio}
                        onChange={(e) =>
                          handleSettingChange("profile", "bio", e.target.value)
                        }
                        className="input-field resize-none"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Security Settings
                    </h2>
                    <p className="text-ui-gray-600 mb-6">
                      Manage your password and account security preferences.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Change Password
                      </h3>
                      <div className="grid grid-cols-1 gap-4 max-w-md">
                        <div>
                          <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={settings.security.currentPassword}
                              onChange={(e) =>
                                handleSettingChange(
                                  "security",
                                  "currentPassword",
                                  e.target.value,
                                )
                              }
                              className="input-field pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={settings.security.newPassword}
                            onChange={(e) =>
                              handleSettingChange(
                                "security",
                                "newPassword",
                                e.target.value,
                              )
                            }
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={settings.security.confirmPassword}
                            onChange={(e) =>
                              handleSettingChange(
                                "security",
                                "confirmPassword",
                                e.target.value,
                              )
                            }
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Security Options
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-ui-gray-700">
                              Two-Factor Authentication
                            </label>
                            <p className="text-sm text-ui-gray-500">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.security.twoFactorEnabled}
                            onChange={(e) =>
                              handleSettingChange(
                                "security",
                                "twoFactorEnabled",
                                e.target.checked,
                              )
                            }
                            className="filter-checkbox"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-ui-gray-700">
                              Login Notifications
                            </label>
                            <p className="text-sm text-ui-gray-500">
                              Get notified when someone logs into your account
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.security.loginNotifications}
                            onChange={(e) =>
                              handleSettingChange(
                                "security",
                                "loginNotifications",
                                e.target.checked,
                              )
                            }
                            className="filter-checkbox"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Notification Preferences
                    </h2>
                    <p className="text-ui-gray-600 mb-6">
                      Choose what notifications you want to receive and how.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Email Notifications
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            key: "emailMarketing",
                            label: "Marketing emails",
                            desc: "Receive emails about new products and promotions",
                          },
                          {
                            key: "emailOrders",
                            label: "Order updates",
                            desc: "Get notified about your order status and shipping",
                          },
                          {
                            key: "emailSecurity",
                            label: "Security alerts",
                            desc: "Important security and account notifications",
                          },
                          {
                            key: "weeklyDigest",
                            label: "Weekly digest",
                            desc: "Summary of your account activity and recommendations",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <label className="text-sm font-medium text-ui-gray-700">
                                {item.label}
                              </label>
                              <p className="text-sm text-ui-gray-500">
                                {item.desc}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.notifications[item.key]}
                              onChange={(e) =>
                                handleSettingChange(
                                  "notifications",
                                  item.key,
                                  e.target.checked,
                                )
                              }
                              className="filter-checkbox"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Push Notifications
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            key: "pushNotifications",
                            label: "Browser notifications",
                            desc: "Receive notifications in your browser",
                          },
                          {
                            key: "smsNotifications",
                            label: "SMS notifications",
                            desc: "Receive text messages for important updates",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <label className="text-sm font-medium text-ui-gray-700">
                                {item.label}
                              </label>
                              <p className="text-sm text-ui-gray-500">
                                {item.desc}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.notifications[item.key]}
                              onChange={(e) =>
                                handleSettingChange(
                                  "notifications",
                                  item.key,
                                  e.target.checked,
                                )
                              }
                              className="filter-checkbox"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences */}
              {activeSection === "preferences" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Application Preferences
                    </h2>
                    <p className="text-ui-gray-600 mb-6">
                      Customize your application experience and display
                      preferences.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) =>
                          handleSettingChange(
                            "preferences",
                            "language",
                            e.target.value,
                          )
                        }
                        className="input-field"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.preferences.timezone}
                        onChange={(e) =>
                          handleSettingChange(
                            "preferences",
                            "timezone",
                            e.target.value,
                          )
                        }
                        className="input-field"
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">GMT (UTC+0)</option>
                        <option value="UTC+1">Central European (UTC+1)</option>
                        <option value="UTC+9">Japan (UTC+9)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={settings.preferences.currency}
                        onChange={(e) =>
                          handleSettingChange(
                            "preferences",
                            "currency",
                            e.target.value,
                          )
                        }
                        className="input-field"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                        <option value="CAD">CAD (C$)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Theme
                      </label>
                      <select
                        value={settings.preferences.theme}
                        onChange={(e) =>
                          handleSettingChange(
                            "preferences",
                            "theme",
                            e.target.value,
                          )
                        }
                        className="input-field"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                        Items per page
                      </label>
                      <select
                        value={settings.preferences.itemsPerPage}
                        onChange={(e) =>
                          handleSettingChange(
                            "preferences",
                            "itemsPerPage",
                            e.target.value,
                          )
                        }
                        className="input-field"
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="autoSave"
                        checked={settings.preferences.autoSave}
                        onChange={(e) =>
                          handleSettingChange(
                            "preferences",
                            "autoSave",
                            e.target.checked,
                          )
                        }
                        className="filter-checkbox mr-3"
                      />
                      <label
                        htmlFor="autoSave"
                        className="text-sm font-medium text-ui-gray-700"
                      >
                        Auto-save changes
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeSection === "privacy" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Privacy & Data</h2>
                    <p className="text-ui-gray-600 mb-6">
                      Control your privacy settings and data collection
                      preferences.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Profile Visibility
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            key: "profileVisible",
                            label: "Make profile visible",
                            desc: "Allow others to see your profile information",
                          },
                          {
                            key: "showEmail",
                            label: "Show email address",
                            desc: "Display your email on your public profile",
                          },
                          {
                            key: "showPhone",
                            label: "Show phone number",
                            desc: "Display your phone number on your profile",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <label className="text-sm font-medium text-ui-gray-700">
                                {item.label}
                              </label>
                              <p className="text-sm text-ui-gray-500">
                                {item.desc}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.privacy[item.key]}
                              onChange={(e) =>
                                handleSettingChange(
                                  "privacy",
                                  item.key,
                                  e.target.checked,
                                )
                              }
                              className="filter-checkbox"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Data Collection
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            key: "dataCollection",
                            label: "Data collection",
                            desc: "Allow us to collect data to improve your experience",
                          },
                          {
                            key: "analytics",
                            label: "Usage analytics",
                            desc: "Help us understand how you use our platform",
                          },
                          {
                            key: "cookies",
                            label: "Marketing cookies",
                            desc: "Allow cookies for personalized advertising",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <label className="text-sm font-medium text-ui-gray-700">
                                {item.label}
                              </label>
                              <p className="text-sm text-ui-gray-500">
                                {item.desc}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.privacy[item.key]}
                              onChange={(e) =>
                                handleSettingChange(
                                  "privacy",
                                  item.key,
                                  e.target.checked,
                                )
                              }
                              className="filter-checkbox"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
