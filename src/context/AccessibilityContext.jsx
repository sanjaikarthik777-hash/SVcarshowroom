import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export function useAccessibility() {
    return useContext(AccessibilityContext);
}

export function AccessibilityProvider({ children }) {
    const [textSize, setTextSize] = useState('normal'); // 'small', 'normal', 'large'
    const [highContrast, setHighContrast] = useState(false);
    const [grayscale, setGrayscale] = useState(false);

    // Apply classes to the document body when states change
    useEffect(() => {
        const body = document.body;

        // Handle Text Size
        body.classList.remove('a11y-text-small', 'a11y-text-large');
        if (textSize === 'small') body.classList.add('a11y-text-small');
        if (textSize === 'large') body.classList.add('a11y-text-large');

        // Handle High Contrast
        if (highContrast) {
            body.classList.add('a11y-high-contrast');
        } else {
            body.classList.remove('a11y-high-contrast');
        }

        // Handle Grayscale
        if (grayscale) {
            body.classList.add('a11y-grayscale');
        } else {
            body.classList.remove('a11y-grayscale');
        }

    }, [textSize, highContrast, grayscale]);

    const increaseTextSize = () => {
        setTextSize(prev => prev === 'small' ? 'normal' : 'large');
    };

    const decreaseTextSize = () => {
        setTextSize(prev => prev === 'large' ? 'normal' : 'small');
    };

    const toggleHighContrast = () => {
        setHighContrast(prev => !prev);
    };

    const toggleGrayscale = () => {
        setGrayscale(prev => !prev);
    };

    const resetAccessibility = () => {
        setTextSize('normal');
        setHighContrast(false);
        setGrayscale(false);
    };

    return (
        <AccessibilityContext.Provider value={{
            textSize, increaseTextSize, decreaseTextSize,
            highContrast, toggleHighContrast,
            grayscale, toggleGrayscale,
            resetAccessibility
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
}
