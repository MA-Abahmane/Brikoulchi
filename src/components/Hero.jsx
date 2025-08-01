import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const Hero = () => {

    const videoRef = useRef(null);
  const speedTarget = useRef(1); // Target speed (1 = normal)
  const animationRef = useRef(null);
  const {user, isAuthenticated} = useAuth();

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
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find the Best Local Services with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Brikoulchi
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with trusted local service providers in your area for all your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="inline-flex items-center justify-center bg-white text-primary font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              <i className="fas fa-search mr-2"></i>
              Browse Services
            </Link>
            {!(isAuthenticated && user)&&<Link
              to="/signup"
              className="inline-flex items-center justify-center border-2 border-white text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-white hover:text-primary transform hover:-translate-y-1"
            >
              <i className="fas fa-user-plus mr-2"></i>
              Become a Provider
            </Link>}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg"></div>
    </div>
  )
}

export default Hero