
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, Timer, ArrowUp } from "lucide-react";

interface AuctionItem {
  id: number;
  lotNumber: string;
  title: string;
  description: string;
  currentBid: number;
  minimumBidIncrement: number;
  closingTime: string;
  imageUrl: string;
}

const BidGallery = () => {
  const [bidAmount, setBidAmount] = useState<{ [key: number]: string }>({});

  // Mock data - in a real app, this would come from an API
  const auctionItems: AuctionItem[] = [
    {
      id: 1,
      lotNumber: "LOT-001",
      title: "CAT 320 Excavator",
      description: "2019 Caterpillar 320 Hydraulic Excavator, Low Hours",
      currentBid: 75000,
      minimumBidIncrement: 1000,
      closingTime: "2024-04-15T15:00:00",
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      lotNumber: "LOT-002",
      title: "John Deere Loader",
      description: "2020 John Deere 544L Wheel Loader, Well Maintained",
      currentBid: 45000,
      minimumBidIncrement: 500,
      closingTime: "2024-04-15T15:15:00",
      imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      lotNumber: "LOT-003",
      title: "Bobcat Skid Steer",
      description: "2021 Bobcat S76 Skid-Steer Loader, Like New",
      currentBid: 28000,
      minimumBidIncrement: 250,
      closingTime: "2024-04-15T15:30:00",
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const getTimeRemaining = (closingTime: string) => {
    const remaining = new Date(closingTime).getTime() - new Date().getTime();
    if (remaining <= 0) return "Closed";
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleBid = (item: AuctionItem) => {
    const bidValue = parseFloat(bidAmount[item.id] || "0");
    if (bidValue >= item.currentBid + item.minimumBidIncrement) {
      // In a real app, this would make an API call to place the bid
      alert(`Bid placed successfully for ${item.title}: $${bidValue}`);
    } else {
      alert(`Minimum bid must be $${item.currentBid + item.minimumBidIncrement}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - reusing the same nav from Index */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-900">Bid Pax</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Auctions', 'How It Works', 'About Us', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-blue-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Auction Header */}
      <div className="pt-24 pb-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Heavy Construction Equipment Auction</h2>
          <div className="flex items-center text-blue-600 space-x-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>Closing: April 15, 2024</span>
            </div>
            <div className="flex items-center">
              <Timer className="w-5 h-5 mr-2" />
              <span>Los Angeles, CA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctionItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-blue-100"
            >
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-md">
                  {item.lotNumber}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-blue-600 mb-4 text-sm">{item.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-blue-900">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span className="font-semibold">Current Bid:</span>
                    </div>
                    <span className="text-lg font-bold">${item.currentBid.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-blue-600">
                    <div className="flex items-center">
                      <Timer className="w-5 h-5 mr-1" />
                      <span>Time Remaining:</span>
                    </div>
                    <span className="font-medium">{getTimeRemaining(item.closingTime)}</span>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={bidAmount[item.id] || ""}
                      onChange={(e) => setBidAmount({ ...bidAmount, [item.id]: e.target.value })}
                      placeholder={`Min: $${(item.currentBid + item.minimumBidIncrement).toLocaleString()}`}
                      className="flex-1 px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleBid(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center"
                    >
                      <ArrowUp className="w-4 h-4 mr-1" />
                      Bid
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BidGallery;
