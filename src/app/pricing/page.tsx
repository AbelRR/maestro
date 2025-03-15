import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PricingCard = ({
  title,
  description,
  price,
  features,
  isHighlighted = false
}: {
  title: string;
  description: string;
  price: string;
  features: string[];
  isHighlighted?: boolean;
}) => (
  <div className={`border rounded-lg overflow-hidden bg-white ${isHighlighted ? 'ring-2 ring-orange-500' : ''}`}>
    <div className="p-6 border-b">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{description}</p>
      <div className="mb-6">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-500 text-sm ml-1">/month</span>
      </div>
      <Button
        variant={isHighlighted ? "default" : "outline"}
        className={`w-full ${isHighlighted ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'border-orange-500 text-orange-500 hover:bg-orange-50'}`}
      >
        Select
      </Button>
    </div>
    <div className="p-6">
      <p className="font-medium mb-4">{isHighlighted ? 'Everything in Starter, plus:' : 'Includes:'}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant="link" className="mt-4 p-0 h-auto text-orange-500">
        View All Features
      </Button>
    </div>
  </div>
);

const AddOnCard = ({
  title,
  price,
  unit,
  icon
}: {
  title: string;
  price: string;
  unit: string;
  icon: React.ReactNode;
}) => (
  <div className="border rounded-lg overflow-hidden bg-white p-4">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold mr-1">${price}</span>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      </div>
    </div>
  </div>
);

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-12">Endless You. Flexible Pricing.</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-lg">Scale Your Impact.</h3>
                  <p className="text-gray-500">Provide personalized guidance 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-lg">Save Time.</h3>
                  <p className="text-gray-500">Automate repetitive questions and support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-lg">Drive Revenue.</h3>
                  <p className="text-gray-500">Turn your mind into recurring revenue</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-lg">Gather Intelligence.</h3>
                  <p className="text-gray-500">Learn what matters to your people</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing plans section */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl font-bold mb-4 sm:mb-0">Our Plans</h2>

              <div className="bg-gray-200 p-1 rounded-full flex items-center">
                <button className="px-4 py-1.5 rounded-full bg-white text-sm font-medium shadow-sm">
                  Monthly
                </button>
                <button className="px-4 py-1.5 rounded-full text-sm font-medium">
                  Annual <span className="text-xs text-green-600 font-normal">Save 34%</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PricingCard
                title="Starter"
                description="Turn your expertise into an interactive presence"
                price="29"
                features={[
                  "2,500 message credits per month",
                  "500 minute credits per month",
                  "4M words of Training Data",
                  "Hosted Personal Clone Link",
                  "Embed on Unlimited Websites",
                  "Lead Capture",
                  "Multi-Language Support",
                  "Monetizeable Memberships"
                ]}
              />

              <PricingCard
                title="Advanced"
                description="Scale your impact across multiple channels"
                price="99"
                features={[
                  "10,000 message credits per month",
                  "2,000 minute credits per month",
                  "10M words of Training Data",
                  "2 Instances",
                  "Brandable Embeds",
                  "RSS Feeds",
                  "Automatic Question Extraction",
                  "Full Analytics Dashboard with CRM Sync"
                ]}
                isHighlighted
              />

              <PricingCard
                title="Prodigy"
                description="For experts with a big audience"
                price="399"
                features={[
                  "100,000 message credits per month",
                  "10,000 minute credits per month",
                  "Unlimited Training Data",
                  "5 Instances",
                  "Full White Label & Custom Domain",
                  "SMS/WhatsApp Support",
                  "Download Chat Transcripts",
                  "Audience Importing"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Additional options section */}
        <section className="py-12">
          <div className="container">
            <div className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black text-white rounded-lg p-8">
                  <h3 className="text-xl font-semibold mb-4">Immortal</h3>
                  <p className="text-gray-300 mb-6">Enterprise-grade digital presence with complete brand protection.</p>

                  <Button className="bg-white text-black hover:bg-gray-100">
                    Contact Us
                  </Button>

                  <div className="mt-8">
                    <p className="font-medium mb-4">All Prodigy Features, plus:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-orange-500" />
                        <span>1M Messages Per Month</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-orange-500" />
                        <span>End-To-End White Glove Service</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-orange-500" />
                        <span>Professional Voice Cloning</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-orange-500" />
                        <span>Unlimited Seats & Instances</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-8">
                  <h3 className="text-xl font-semibold mb-4">Delphi For Business</h3>
                  <p className="text-gray-600 mb-6">Scale high-touch engagement and multiply executive impact</p>

                  <Button className="bg-gray-700 text-white hover:bg-gray-800">
                    Contact Us
                  </Button>

                  <div className="mt-8">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-orange-500" />
                        <span>Scale high-touch engagement and multiply executive impact</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-orange-500" />
                        <span>Transform your best talent into always-on assets</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Additional Usage</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="p-6 border rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Messages</p>
                  <p className="text-2xl font-bold mb-1">$0.02</p>
                  <p className="text-sm text-gray-500">per message</p>
                </div>

                <div className="p-6 border rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Voice Minutes</p>
                  <p className="text-2xl font-bold mb-1">$0.05</p>
                  <p className="text-sm text-gray-500">per minute</p>
                </div>

                <div className="p-6 border rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Video Minutes</p>
                  <p className="text-2xl font-bold mb-1">$0.15</p>
                  <p className="text-sm text-gray-500">per minute</p>
                </div>

                <div className="p-6 border rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Training Data</p>
                  <p className="text-2xl font-bold mb-1">$10</p>
                  <p className="text-sm text-gray-500">per 100k words</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add-Ons section */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-4">Add-Ons</h2>
            <p className="text-gray-500 mb-8">Tailor your subscription with our flexible add-ons</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <AddOnCard
                title="RSS Feeds"
                price="10"
                unit="per month"
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>}
              />

              <AddOnCard
                title="Extra Instance"
                price="10"
                unit="per month"
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"></path></svg>}
              />

              <AddOnCard
                title="Phone Number"
                price="50"
                unit="per month"
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.82a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.917.339 1.86.573 2.82.7A2 2 0 0 1 22 16.92z"></path></svg>}
              />

              <AddOnCard
                title="Video Calling"
                price="999"
                unit="one-time cost"
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 8.13v7.74a2 2 0 0 1-1.13 1.8l-6.37 2.91c-.39.18-.83.18-1.22 0L2.13 15.1a2 2 0 0 1-1.13-1.8V8.13A2 2 0 0 1 2.13 6.2l11.15-5.5c.39-.18.83-.18 1.22 0l6.37 2.92A2 2 0 0 1 22 8.12Z"></path><path d="m12 22 9-4.5v-9L12 13z"></path><path d="M12 22V13"></path><path d="M12 13 2 9"></path></svg>}
              />

              <AddOnCard
                title="White Glove Setup"
                price="Contact Us"
                unit=""
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M6 12a6 6 0 0 0 12 0 6 6 0 0 0-12 0Z"></path><path d="M2 12c0 1.68.506 3.245 1.42 4.535C4.916 18.452 7.11 20 12 20c4.89 0 7.084-1.547 8.58-3.465.914-1.29 1.42-2.856 1.42-4.535 0-1.68-.506-3.245-1.42-4.535C19.084 5.547 16.89 4 12 4 7.11 4 4.916 5.547 3.42 7.465A9.594 9.594 0 0 0 2 12Z"></path></svg>}
              />
            </div>
          </div>
        </section>

        {/* Broadcast section */}
        <section className="py-16 bg-black text-white">
          <div className="container">
            <div className="mb-3 text-orange-500 font-medium">Broadcast</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Reach your audience wherever they are. Interact when it matters.</h2>
            <p className="text-gray-400 mb-8">Powerful SMS marketing made easy, with an AI sidekick to handle replies.</p>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <p className="text-gray-300">Engage your audience at scale with enterprise-grade SMS campaigns</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <p className="text-gray-300">Your Delphi clone manages replies 24/7, keeping inboxes clear and contacts engaged</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <p className="text-gray-300">Volume based pricing</p>
                </div>

                <Button className="bg-orange-500 hover:bg-orange-600 text-white mt-4">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
