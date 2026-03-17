"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  Search, 
  Star, 

  Globe, 
  X, 
  MapPin, 
  CheckCircle 
} from "lucide-react"
import { CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Enhanced mock data for agencies with valid Unsplash image URLs
const agencies = [
  {
    id: 1,
    name: "Tassili Tours",
    description: "Specializing in Sahara expeditions and domestic destinations",
    rating: 4.8,
    image: "/images/agency.png",
    specialties: ["Desert", "Adventure", "Domestic"],
    countries: ["Algeria"],
    verified: true
  },
  {
    id: 2,
    name: "Al Haramain Services DZ",
    description: "Expert in organizing Hajj and Omra pilgrimages for Algerians",
    rating: 4.9,
    image: "/images/religious.png",
    specialties: ["Religious", "Spiritual", "Pilgrimage"],
    countries: ["Saudi Arabia"],
    verified: true
  },
  {
    id: 3,
    name: "Dzair Escapes",
    description: "Curating the best Mediterranean and European experiences",
    rating: 4.7,
    image: "/images/agency.png",
    specialties: ["Urban", "Resorts", "Family"],
    countries: ["Tunisia", "Turkey", "Spain"],
    verified: false
  },
  {
    id: 4,
    name: "Kabylia Horizons",
    description: "Sustainable travel experiences that connect with nature in local mountains",
    rating: 4.6,
    image: "/images/mountain.png",
    specialties: ["Eco-Tourism", "Nature", "Hiking"],
    countries: ["Algeria"],
    verified: true
  },
  {
    id: 5,
    name: "VIP Emirates Travel",
    description: "Premium travel experiences for the discerning traveler to the Gulf",
    rating: 4.9,
    image: "/images/beach.png",
    specialties: ["Luxury", "Shopping", "Exclusive"],
    countries: ["UAE", "Qatar", "Maldives"],
    verified: true
  }
]

export default function AgenciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [minRating, setMinRating] = useState(0)
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  // Get unique specialties for filtering
  const allSpecialties = Array.from(new Set(agencies.flatMap(a => a.specialties)))

  // Filtered and sorted agencies
  const filteredAgencies = useMemo(() => {
    return agencies
      .filter(agency => 
        // Search filter
        agency.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        // Specialty filter
        (selectedSpecialty === "all" || agency.specialties.includes(selectedSpecialty)) &&
        // Rating filter
        agency.rating >= minRating &&
        // Verified filter
        (!showVerifiedOnly || agency.verified)
      )
      .sort((a, b) => b.rating - a.rating)
  }, [searchTerm, selectedSpecialty, minRating, showVerifiedOnly])

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSpecialty("all")
    setMinRating(0)
    setShowVerifiedOnly(false)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Discover Trusted Travel Agencies
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the perfect travel partner for your next extraordinary journey
        </p>
      </motion.div>

      {/* Filtering Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search agencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Specialty Filter */}
          <div className="col-span-1">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="col-span-1">
            <div className="relative">
              <Star className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value={0}>All Ratings</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.7}>4.7+ Stars</option>
                <option value={4.9}>4.9+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Filters Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showVerifiedOnly}
                onChange={() => setShowVerifiedOnly(!showVerifiedOnly)}
                className="form-checkbox h-5 w-5 text-primary rounded"
              />
              <span className="text-sm">Verified Agencies Only</span>
            </label>
          </div>

          <motion.button
            onClick={clearFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-secondary/80 transition-all"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </motion.button>
        </div>
      </motion.div>

      {/* Agencies Grid */}
      <AnimatePresence>
        {filteredAgencies.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 bg-secondary/50 rounded-xl"
          >
            <p className="text-2xl font-semibold text-muted-foreground">
              No agencies found matching your search
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAgencies.map((agency) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-background border border-primary/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative">
                  <Image 
                    src={agency.image} 
                    alt={agency.name} 
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    {agency.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      {agency.name}
                      {agency.verified && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </h2>
                  </div>
                  
                  <CardDescription className="mb-4">
                    {agency.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {agency.specialties.map((specialty) => (
                        <span 
                          key={specialty} 
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {agency.countries.join(", ")}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}