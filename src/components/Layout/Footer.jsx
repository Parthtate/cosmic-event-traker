const Footer = () => (
  <footer
    className="bg-gray-800 text-white py-8 mt-12"
    style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
  >
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-300">
        Data provided by NASA Open APIs • Developed by <a href="https://github.com/Parthtate/cosmic-event-traker">Parth Tate</a>
      </p>
      <a
        href="https://api.nasa.gov/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white mt-4 md:mt-0 transition-colors"
      >
        NASA APIs
      </a>
    </div>
  </footer>
);

export default Footer;
