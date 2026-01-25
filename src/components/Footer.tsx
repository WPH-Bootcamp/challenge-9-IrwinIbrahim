export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 p-6 text-sm text-muted-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-black mb-2">Foody</h4>
          <p>Explore Restaurants, Takeaways and other experiences. Discover the best food near you and eat what you love.</p>
        </div>
        <div>
          <h4 className="font-semibold text-black mb-2">Features</h4>
          <ul className="space-y-1">
            <li>Reviews</li>
            <li>Nearby</li>
            <li>Discount</li>
            <li>Best Seller</li>
            <li>Delivery</li>
            <li>Lunch</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-black mb-2">Help</h4>
          <ul className="space-y-1">
            <li>How to Order</li>
            <li>Payment Options</li>
            <li>Terms & Conditions</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}