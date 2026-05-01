import React, { useState, useEffect, useRef } from 'react';
import { get360Data } from '../data/car360Data';

/**
 * Car360Viewer
 * Props:
 *   carId        – numeric/string car ID (to look up brand-specific images)
 *   fallbackImage – car's main image as last resort
 */
const Car360Viewer = ({ carId, fallbackImage }) => {
    const { frames, interior } = get360Data(carId, fallbackImage);

    const [currentFrame, setCurrentFrame] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [viewMode, setViewMode] = useState('exterior'); // 'exterior' | 'interior'
    const [isZoomed, setIsZoomed] = useState(false);
    const [autoSpin, setAutoSpin] = useState(true);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);

    const stageRef = useRef(null);
    const dragSensitivity = 8; // pixels per frame step
    const autoSpinRef = useRef(null);

    // Preload all exterior frames
    useEffect(() => {
        let loaded = 0;
        frames.forEach((src) => {
            const img = new Image();
            img.onload = () => {
                loaded += 1;
                if (loaded >= frames.length) setImagesPreloaded(true);
            };
            img.onerror = () => { loaded += 1; if (loaded >= frames.length) setImagesPreloaded(true); };
            img.src = src;
        });
    }, [frames]);

    // Auto-spin on mount until user grabs
    useEffect(() => {
        if (!autoSpin || viewMode !== 'exterior') {
            clearInterval(autoSpinRef.current);
            return;
        }
        autoSpinRef.current = setInterval(() => {
            setCurrentFrame(prev => (prev + 1) % frames.length);
        }, 120);
        return () => clearInterval(autoSpinRef.current);
    }, [autoSpin, viewMode, frames.length]);

    const stopAutoSpin = () => {
        setAutoSpin(false);
        clearInterval(autoSpinRef.current);
    };

    const handleDragStart = (e) => {
        if (viewMode === 'interior') return;
        stopAutoSpin();
        setIsDragging(true);
        setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
    };

    const handleDragMove = (e) => {
        if (!isDragging || viewMode === 'interior') return;
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;

        if (Math.abs(deltaX) > dragSensitivity) {
            if (deltaX > 0) {
                setCurrentFrame(prev => (prev === 0 ? frames.length - 1 : prev - 1));
            } else {
                setCurrentFrame(prev => (prev + 1) % frames.length);
            }
            setStartX(currentX);
        }
    };

    const handleDragEnd = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchend', handleDragEnd);
        } else {
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        }
        return () => {
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging]);

    const switchView = (mode) => {
        setViewMode(mode);
        setIsZoomed(false);
        if (mode === 'exterior') {
            setCurrentFrame(0);
        }
    };

    const displayImage = viewMode === 'exterior' ? frames[currentFrame] : interior;

    return (
        <div className="viewer-360-container">
            {/* View Mode Toggle */}
            <div className="viewer-view-tabs">
                <button
                    className={`viewer-tab-btn ${viewMode === 'exterior' ? 'active' : ''}`}
                    onClick={() => switchView('exterior')}
                    type="button"
                >
                    <span className="viewer-tab-icon">↺</span> 360° Exterior
                </button>
                <button
                    className={`viewer-tab-btn ${viewMode === 'interior' ? 'active' : ''}`}
                    onClick={() => switchView('interior')}
                    type="button"
                >
                    <span className="viewer-tab-icon">🪑</span> Interior View
                </button>
            </div>

            {/* Main Stage */}
            <div
                className={`viewer-360-stage ${isDragging ? 'grabbing' : 'grab'} ${isZoomed ? 'zoomed' : ''}`}
                ref={stageRef}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
            >
                {/* main image */}
                <img
                    src={displayImage}
                    alt="Car View"
                    className="viewer-main-img"
                    draggable="false"
                />

                {/* Drag hint – shows only on first load */}
                {viewMode === 'exterior' && autoSpin && (
                    <div className="viewer-360-hint" style={{ bottom: '60px' }}>
                        <span>↔</span> Drag to rotate
                    </div>
                )}

                {/* Frame counter pills */}
                {viewMode === 'exterior' && (
                    <div className="viewer-frame-counter">
                        {currentFrame + 1}/{frames.length}
                    </div>
                )}

                {/* Interior label */}
                {viewMode === 'interior' && (
                    <div className="viewer-interior-label">🪑 Interior View</div>
                )}
            </div>

            {/* Bottom Control Bar */}
            <div className="viewer-bottom-bar">
                {/* Rotation indicator dots */}
                {viewMode === 'exterior' && (
                    <div className="viewer-frame-dots">
                        {frames.map((_, i) => (
                            <button
                                key={i}
                                className={`viewer-frame-dot ${i === currentFrame ? 'active' : ''}`}
                                onClick={() => { stopAutoSpin(); setCurrentFrame(i); }}
                                type="button"
                                aria-label={`Frame ${i + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Tools */}
                <div className="viewer-tools">
                    {/* Rotate left/right arrows */}
                    {viewMode === 'exterior' && (
                        <>
                            <button
                                className="viewer-tool-btn"
                                type="button"
                                title="Rotate Left"
                                onClick={() => { stopAutoSpin(); setCurrentFrame(p => (p === 0 ? frames.length - 1 : p - 1)); }}
                            >◀</button>
                            <button
                                className="viewer-tool-btn"
                                type="button"
                                title="Rotate Right"
                                onClick={() => { stopAutoSpin(); setCurrentFrame(p => (p + 1) % frames.length); }}
                            >▶</button>
                            <button
                                className="viewer-tool-btn"
                                type="button"
                                title={autoSpin ? 'Stop Auto-spin' : 'Auto-spin'}
                                onClick={() => setAutoSpin(v => !v)}
                            >{autoSpin ? '⏸' : '▶▶'}</button>
                        </>
                    )}
                    {/* Zoom toggle */}
                    <button
                        className="viewer-tool-btn"
                        type="button"
                        title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                        onClick={() => setIsZoomed(v => !v)}
                    >{isZoomed ? '🔍−' : '🔍+'}</button>
                </div>
            </div>
        </div>
    );
};

export default Car360Viewer;
