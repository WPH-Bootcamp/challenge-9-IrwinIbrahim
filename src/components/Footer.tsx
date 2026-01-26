import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import burgerBanner from "@/assets/images/logomerah.png";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-4 text-sm">
      <div className="max-w-screen-xl mx-auto px-3 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={burgerBanner}
                alt="Foody Logo"
                className="w-8 h-8 object-contain"
              />
              <h4 className="text-xl font-bold">Foody</h4>
            </div>

            <p className="mb-4">
              Enjoy homemade flavors & chef's signature dishes, freshly prepared
              every day. Order online or visit our nearest branch.
            </p>

            <p className="font-semibold mb-2">Follow on Social Media</p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 flex items-center justify-center rounded-full   text-white hover:bg-blue-500 hover:border-blue-500 transition-colors duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-full  text-white hover:bg-pink-500 hover:border-pink-500 transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 flex items-center justify-center rounded-full  text-white hover:bg-blue-400 hover:border-blue-400 transition-colors duration-300"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-gray-500 hover:border-gray-500 transition-colors duration-300"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-2">Explore</h4>
            <ul className="space-y-1">
              <li>All Food</li>
              <li>Nearby</li>
              <li>Discount</li>
              <li>Best Seller</li>
              <li>Delivery</li>
              <li>Lunch</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-2">Help</h4>
            <ul className="space-y-1">
              <li>How to Order</li>
              <li>Payment Methods</li>
              <li>Track My Order</li>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
