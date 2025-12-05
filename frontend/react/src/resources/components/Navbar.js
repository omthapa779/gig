class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <nav id="navbar" class="fixed w-full z-50 transition-all duration-300 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-12">
            <div class="flex-shrink-0 flex items-center">
              <a href="/" class="text-2xl font-bold tracking-tighter text-brand-dark">GIG<span class="text-blue-600">.</span></a>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" class="text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors whitespace-nowrap">How it Works</a>
              <a href="#services" class="text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors whitespace-nowrap">Services</a>
              <a href="#features" class="text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors whitespace-nowrap">Why Us</a>

              <!-- Login Dropdown -->
              <div class="relative group">
                <button class="text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors flex items-center focus:outline-none">
                  Log In <i class="fa-solid fa-chevron-down ml-1 text-xs transition-transform group-hover:rotate-180"></i>
                </button>
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 border border-gray-100 translate-y-2 group-hover:translate-y-0">
                  <a href="/freelancer/login" class="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <i class="fa-solid fa-user-tie mr-2 text-gray-400"></i>Freelancer Login
                  </a>
                  <a href="/company/login" class="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-t border-gray-50">
                    <i class="fa-solid fa-building mr-2 text-gray-400"></i>Company Login
                  </a>
                </div>
              </div>

              <!-- Search Bar -->
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fa-solid fa-search text-gray-400 group-focus-within:text-blue-600 transition-colors"></i>
                </div>
                <input type="text"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 sm:text-sm w-64 focus:w-80"
                  placeholder="Search for services...">
              </div>
            </div>
            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
              <button class="text-gray-600 hover:text-brand-dark focus:outline-none">
                <i class="fa-solid fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-navbar', Navbar);
