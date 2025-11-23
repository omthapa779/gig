class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
      <footer class="bg-white border-t border-gray-100 pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div class="col-span-1 md:col-span-1">
              <a href="/" class="text-2xl font-bold tracking-tighter text-brand-dark mb-6 block">GIG<span class="text-blue-600">.</span></a>
              <p class="text-gray-500 text-sm leading-relaxed">
                Empowering Nepal's workforce with fair opportunities and secure payments. Join the revolution today.
              </p>
            </div>
            <div>
              <h4 class="font-bold text-brand-dark mb-4">For Clients</h4>
              <ul class="space-y-2 text-sm text-gray-500">
                <li><a href="#" class="hover:text-blue-600">Post a Job</a></li>
                <li><a href="#" class="hover:text-blue-600">Find Talent</a></li>
                <li><a href="#" class="hover:text-blue-600">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-brand-dark mb-4">For Freelancers</h4>
              <ul class="space-y-2 text-sm text-gray-500">
                <li><a href="#" class="hover:text-blue-600">How to Find Work</a></li>
                <li><a href="#" class="hover:text-blue-600">Direct Contracts</a></li>
                <li><a href="#" class="hover:text-blue-600">Opportunity Feed</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-brand-dark mb-4">Company</h4>
              <ul class="space-y-2 text-sm text-gray-500">
                <li><a href="#" class="hover:text-blue-600">About Us</a></li>
                <li><a href="#" class="hover:text-blue-600">Careers</a></li>
                <li><a href="#" class="hover:text-blue-600">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm text-gray-400">&copy; 2025 Gig Inc. All rights reserved.</p>
            <div class="flex space-x-6 mt-4 md:mt-0">
              <a href="#" class="text-gray-400 hover:text-brand-dark"><i class="fa-brands fa-twitter"></i></a>
              <a href="#" class="text-gray-400 hover:text-brand-dark"><i class="fa-brands fa-linkedin"></i></a>
              <a href="#" class="text-gray-400 hover:text-brand-dark"><i class="fa-brands fa-facebook"></i></a>
              <a href="#" class="text-gray-400 hover:text-brand-dark"><i class="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    `;
    }
}

customElements.define('app-footer', Footer);
