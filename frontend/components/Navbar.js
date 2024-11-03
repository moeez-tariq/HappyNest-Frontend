const Navbar = () => {
    return (
      <nav className="bg-green-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-2xl font-bold">
            HappyNest
          </a>
          <ul className="flex space-x-6">
            <li><a href="/" className="text-white hover:underline">Home</a></li> {/* Add Home link */}
            <li><a href="/about" className="text-white hover:underline">About</a></li> {/* Add About link */}
            <li><a href="/contact" className="text-white hover:underline">Contact</a></li> {/* Add Contact link */}
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar;