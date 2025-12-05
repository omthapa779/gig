import { useState } from 'react'
import Navbar from './resources/components/Navbar.jsx'
import Footer from './resources/components/Footer.jsx'
import './App.css'

function App() {
  return(
    <div className='bg-brand-white text-brand-dark antialiased selection:bg-brand-accent selection:text-brand-dark'>
      <Navbar />

      {/*hero secotion*/}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 opacity-10" id="hero-svg">
          <svg width="800" height="800" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#0F62FE"
              d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.4,71.1,32.8C60,44.2,49.1,54.2,37.1,62.8C25.1,71.4,12,78.6,-0.6,79.6C-13.2,80.6,-25.9,75.4,-37.4,67.4C-48.9,59.4,-59.2,48.6,-67.6,36.3C-76,24,-82.5,10.2,-81.1,-3.1C-79.7,-16.4,-70.4,-29.2,-60.2,-39.8C-50,-50.4,-38.9,-58.8,-27.1,-67.8C-15.3,-76.8,-2.8,-86.4,10.2,-84.6C23.2,-82.8,30.5,-83.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            #1 Fair Marketplace in Nepal
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-brand-dark mb-6 leading-tight">
            Nepal's Fair Marketplace for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
              Digital & Local Work.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10">
            From coding to physical tasks, find work near you without buying 'connects'. The fair start every beginner deserves.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/company/register" className="btn btn-primary">
              Hire Talent
            </a>
            <a href="/freelancer/register" className="btn btn-secondary">
              Join as Freelancer
            </a>
          </div>

          {/* Trust Strip */}
          <div className="mt-16 pt-8 border-t border-gray-100 overflow-hidden">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
              Trusted by Nepalese Businesses
            </p>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-16 whitespace-nowrap">
                {/* Repeated for visual completeness - you may animate via CSS/Framer Motion if needed */}
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">Daraz</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">eSewa</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">Khalti</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">Pathao</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">WorldLink</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">Foodmandu</span>
                
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">Daraz</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">eSewa</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">Khalti</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">Pathao</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">WorldLink</span>
                <span className="text-xl font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">Foodmandu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Popular Services
            </h2>
            <p className="text-lg text-gray-500">
              Everything you need to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Development */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-code text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Development</h3>
              <p className="text-gray-500 text-sm">Web, Mobile, AI & more.</p>
            </div>

            {/* Card 2 - Design */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-pen-nib text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Design</h3>
              <p className="text-gray-500 text-sm">Logo, UI/UX, Art.</p>
            </div>

            {/* Card 3 - Local Gigs */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-map-location-dot text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Local Gigs</h3>
              <p className="text-gray-500 text-sm">Plumbing, Moving, Help.</p>
            </div>

            {/* Card 4 - Video */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer">
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-video text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Video</h3>
              <p className="text-gray-500 text-sm">Editing, Animation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl floating-blob-1"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500 blur-3xl floating-blob-2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why businesses choose Gig?
              </h2>
              <p className="text-brand-light text-lg mb-8">
                We're redefining how work gets done. No more headaches, just results.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                    <i className="fa-solid fa-map-pin text-sm text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Hyper-Local Gigs</h4>
                    <p className="text-brand-muted">
                      Find temporary physical work in your neighborhood. Filter by location and start earning instantly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                    <i className="fa-solid fa-unlock text-sm text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Zero Barriers</h4>
                    <p className="text-brand-muted">
                      No hidden fees or 'connects' to buy. Our algorithm promotes talent, not deep pockets.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                    <i className="fa-solid fa-id-card text-sm text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Verified Nepal ID</h4>
                    <p className="text-brand-muted">
                      Trust built on real identities. Secure and safe for everyone in Nepal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Mock UI Card */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                    <div>
                      <div className="h-3 w-24 bg-white/20 rounded-full mb-2"></div>
                      <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-8 w-20 bg-blue-500/20 rounded-full text-blue-300 text-xs flex items-center justify-center">
                    Verified
                  </div>
                </div>

                {/* Content Lines */}
                <div className="space-y-4">
                  <div className="h-4 w-full bg-white/10 rounded-full"></div>
                  <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
                  <div className="h-4 w-5/6 bg-white/10 rounded-full"></div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4">
                  <div className="h-10 flex-1 bg-white/10 rounded-lg"></div>
                  <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-check text-white"></i>
                  </div>
                </div>
              </div>

              {/* Floating Savings Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-brand-dark p-4 rounded-xl shadow-xl flex items-center gap-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <i className="fa-solid fa-money-bill-wave"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Average Savings</p>
                  <p className="font-bold">NPR 15,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App
