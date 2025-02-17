
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Clock, 
  DollarSign, 
  Timer, 
  ArrowUp,
  Ruler,
  Calendar,
  Tag,
  Info
} from "lucide-react";

interface ItemDetails {
  id: number;
  lotNumber: string;
  title: string;
  description: string;
  currentBid: number;
  minimumBidIncrement: number;
  closingTime: string;
  year: number;
  make: string;
  model: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  images: string[];
}

const ItemPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState("");

  // Mock data - in a real app, this would be fetched based on the ID
  const item: ItemDetails = {
    id: 1,
    lotNumber: "LOT-001",
    title: "CAT 320 Excavator",
    description: "2019 Caterpillar 320 Hydraulic Excavator, Low Hours",
    currentBid: 75000,
    minimumBidIncrement: 1000,
    closingTime: "2024-04-15T15:00:00",
    year: 2019,
    make: "Caterpillar",
    model: "320",
    dimensions: {
      length: 30.5,
      width: 10.2,
      height: 12.8
    },
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    ]
  };

  const getTimeRemaining = (closingTime: string) => {
    const remaining = new Date(closingTime).getTime() - new Date().getTime();
    if (remaining <= 0) return "Closed";
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleBid = () => {
    const bidValue = parseFloat(bidAmount);
    if (bidValue >= item.currentBid + item.minimumBidIncrement) {
      alert(`Bid placed successfully: $${bidValue}`);
    } else {
      alert(`Minimum bid must be $${item.currentBid + item.minimumBidIncrement}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - reusing the same nav */}
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

      {/* Main Content */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Item Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-900">{item.title}</h2>
            <p className="text-blue-600 mt-2">Lot Number: {item.lotNumber}</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Large Photo and Gallery */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Photo */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  src={item.images[selectedImage]}
                  alt={`${item.title} - View ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Item Specifications */}
              <div className="bg-white rounded-lg border border-blue-100 p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Equipment Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span className="font-medium">Year:</span>
                      <span className="ml-2">{item.year}</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Tag className="w-5 h-5 mr-2" />
                      <span className="font-medium">Make:</span>
                      <span className="ml-2">{item.make}</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Info className="w-5 h-5 mr-2" />
                      <span className="font-medium">Model:</span>
                      <span className="ml-2">{item.model}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <Ruler className="w-5 h-5 mr-2" />
                      <span className="font-medium">Dimensions:</span>
                      <span className="ml-2">
                        {item.dimensions.length}' x {item.dimensions.width}' x {item.dimensions.height}'
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Bid Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-lg border border-blue-100 p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-blue-900">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span className="font-semibold">Current Bid:</span>
                    </div>
                    <span className="text-2xl font-bold">${item.currentBid.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-blue-600">
                    <div className="flex items-center">
                      <Timer className="w-5 h-5 mr-1" />
                      <span>Time Remaining:</span>
                    </div>
                    <span className="font-medium">{getTimeRemaining(item.closingTime)}</span>
                  </div>

                  <div className="pt-4 border-t border-blue-100">
                    <label className="block text-sm font-medium text-blue-900 mb-2">
                      Place Your Bid
                    </label>
                    <div className="space-y-3">
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={`Min: $${(item.currentBid + item.minimumBidIncrement).toLocaleString()}`}
                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleBid}
                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                      >
                        <ArrowUp className="w-4 h-4 mr-2" />
                        Place Bid
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-blue-600">
                      Minimum increment: ${item.minimumBidIncrement.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
