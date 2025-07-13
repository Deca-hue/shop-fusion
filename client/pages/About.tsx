import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield,
  Truck,
  Award,
  Users,
  Heart,
  Globe,
  Star,
  CheckCircle,
  Clock,
  Lock,
} from "lucide-react";

export default function About() {
  const stats = [
    { label: "Happy Customers", value: "100K+", icon: Users },
    { label: "Products Available", value: "10K+", icon: Award },
    { label: "Countries Served", value: "50+", icon: Globe },
    { label: "Years of Experience", value: "15+", icon: Clock },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "Your data is protected with bank-level SSL encryption and secure payment processing.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Free shipping on orders over $50. Express delivery available to most locations.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "24/7 customer support and hassle-free returns within 30 days of purchase.",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description:
        "All products are carefully curated and come with our quality guarantee.",
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description:
        "We never share your personal information and respect your privacy.",
    },
    {
      icon: Star,
      title: "Best Prices",
      description:
        "Competitive pricing with regular sales and exclusive member discounts.",
    },
  ];

  const timeline = [
    {
      year: "2009",
      title: "Company Founded",
      description:
        "Started as a small family business with a vision to make quality products accessible to everyone.",
    },
    {
      year: "2012",
      title: "Online Platform Launch",
      description:
        "Launched our first e-commerce platform, serving customers across the region.",
    },
    {
      year: "2015",
      title: "International Expansion",
      description:
        "Expanded operations to serve customers in 10+ countries worldwide.",
    },
    {
      year: "2018",
      title: "Mobile App Release",
      description:
        "Launched our mobile app to provide seamless shopping experience on-the-go.",
    },
    {
      year: "2021",
      title: "Sustainability Initiative",
      description:
        "Committed to carbon-neutral shipping and sustainable packaging solutions.",
    },
    {
      year: "2024",
      title: "ShopFusion 2.0",
      description:
        "Complete platform redesign with AI-powered recommendations and enhanced user experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-ui-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BackButton to="/" />
          <div className="mt-4">
            <h1 className="text-4xl font-serif font-bold text-foreground">
              About ShopFusion
            </h1>
            <p className="text-ui-gray-600 mt-2 text-lg">
              Discover our story, mission, and commitment to exceptional
              shopping experiences
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-luxury text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Redefining Online Shopping
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Since 2009, we've been dedicated to providing an exceptional online
            shopping experience with premium products, unmatched customer
            service, and innovative technology.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-ui-gray-700 leading-relaxed mb-8">
            To democratize access to premium products by creating a seamless,
            trustworthy, and delightful shopping experience that puts our
            customers first. We believe everyone deserves quality products at
            fair prices, backed by exceptional service.
          </p>
          <div className="bg-brand-primary/5 rounded-2xl p-8 border border-brand-primary/10">
            <blockquote className="text-lg italic text-ui-gray-700">
              "Our vision is to build the world's most customer-centric
              marketplace, where people can find and discover anything they want
              to buy online with confidence."
            </blockquote>
            <cite className="text-brand-primary font-semibold mt-4 block">
              — Sarah Johnson, Founder & CEO
            </cite>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-ui-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Why Choose ShopFusion?
            </h2>
            <p className="text-ui-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best online shopping experience
              with these core principles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-brand-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-ui-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Journey</h2>
            <p className="text-ui-gray-600">
              From humble beginnings to a global marketplace
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-brand-primary"></div>
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}
                  >
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-brand-primary font-bold text-lg">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-ui-gray-600">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-ui-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-ui-gray-600">
              The passionate people behind ShopFusion's success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b812?w=300&h=300&fit=crop&crop=face",
                bio: "15+ years in e-commerce, passionate about customer experience and innovation.",
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
                bio: "Tech visionary leading our platform development and security initiatives.",
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Customer Success",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
                bio: "Dedicated to ensuring every customer has an exceptional shopping experience.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-brand-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-ui-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers and discover why ShopFusion is
            the preferred choice for online shopping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="btn-primary bg-white text-brand-primary hover:bg-ui-gray-100"
            >
              Browse Products
            </Link>
            <Link
              to="/products?category=featured"
              className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-brand-primary"
            >
              View Featured Items
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
