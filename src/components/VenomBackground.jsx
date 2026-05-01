import React, { useEffect, useRef } from 'react';
import './VenomBackground.css'; // We'll create a dedicated CSS file for the animation

export default function VenomBackground() {
    return (
        <div className="venom-bg-wrapper">
            {/* SVG Filter for the Gooey "Symbiote" Effect */}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                version="1.1" 
                style={{ position: 'absolute', width: 0, height: 0 }}
            >
                <defs>
                    <filter id="venom-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix 
                            in="blur" 
                            mode="matrix" 
                            values="1 0 0 0 0  
                                    0 1 0 0 0  
                                    0 0 1 0 0  
                                    0 0 0 40 -20" 
                            result="venom-goo" />
                        <feBlend in="SourceGraphic" in2="venom-goo" />
                    </filter>
                </defs>
            </svg>

            {/* The animated symbiote blobs */}
            <div className="venom-container">
                <div className="venom-blob blob-1"></div>
                <div className="venom-blob blob-2"></div>
                <div className="venom-blob blob-3"></div>
                <div className="venom-blob blob-4"></div>
                <div className="venom-blob blob-5"></div>
                <div className="venom-blob blob-6"></div>
                <div className="venom-blob blob-7"></div>
                <div className="venom-blob blob-8"></div>
            </div>
        </div>
    );
}

