import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react';

const Hero = () => {

   const videoRef = useRef(null);
  const speedTarget = useRef(1); // Target speed (1 = normal)
  const animationRef = useRef(null);

  const smoothSpeed = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.playbackRate;
    const target = speedTarget.current;
    const diff = target - current;

    if (Math.abs(diff) > 0.01) {
      videoRef.current.playbackRate += diff * 0.03; // easing
      animationRef.current = requestAnimationFrame(smoothSpeed);
    } else {
      videoRef.current.playbackRate = target; // snap to target
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseOver = () => {
    speedTarget.current = 3; // speed up
    animationRef.current = requestAnimationFrame(smoothSpeed);
  };

  const handleMouseOut = () => {
    speedTarget.current = 1; // reset speed
    animationRef.current = requestAnimationFrame(smoothSpeed);
  };

  return (
    <div className="relative bg-gray-900 h-[50vh]"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
    >
      {/* Background image/video with overlay */}
      <video id="heroVid"
             ref={videoRef}
            autoPlay
            muted
            loop
            className="absolute inset-0 bg-center bg-cover w-full h-full object-cover"
            //   backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
      >
        <source src="hero.mp4" id='heroVid' type="video/mp4"></source>
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Find the Best Local Services with Brikoulchi
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8 max-w-xl mx-auto">
            Connect with trusted local service providers in your area for all your needs
          </p>
          <Link
            to="/services"
            className="inline-block bg-[#3B5BFF] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero