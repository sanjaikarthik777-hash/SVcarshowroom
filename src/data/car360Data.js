/**
 * 360-degree image sequences for each car.
 * Each car has:
 *   - frames: array of exterior angle images (simulate rotation via multiple shots)
 *   - interior: wide/panoramic interior image URL
 *
 * Images sourced from Unsplash and Wikimedia for maximum reliability.
 * For a true 36-frame 360 spin, replace `frames` with real spin studio exports.
 */

// Shared interior images per brand style
const INTERIORS = {
    mercedesSClass: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    bmw7:           'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop',
    audiA8:         'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1600&auto=format&fit=crop',
    porsche911:     'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=1600&auto=format&fit=crop',
    corvette:       'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1600&auto=format&fit=crop',
    lamborghini:    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop',
    ferrari:        'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop',
    mclaren:        'https://images.unsplash.com/photo-1592364395653-83e648b20cc2?q=80&w=1600&auto=format&fit=crop',
    rangeRover:     'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop',
    mercedes_g63:   'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1600&auto=format&fit=crop',
    porscheTaycan:  'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop',
    lucidAir:       'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1600&auto=format&fit=crop',
    rollsRoyce:     'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    ferrariPuro:    'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop',
    bugatti:        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop',
    astonMartin:    'https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=1600&auto=format&fit=crop',
};

// Car-specific 360 exterior frames (multiple angle shots per car)
export const car360Data = {

    // -------- LUXURY SEDANS --------

    // ID 1: Mercedes-Benz S-Class
    1: {
        frames: [
            'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580274455191-1c62238fa1c3?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580274455191-1c62238fa1c3?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.mercedesSClass,
    },

    // ID 2: BMW 7 Series
    2: {
        frames: [
            'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.bmw7,
    },

    // ID 3: Audi A8
    3: {
        frames: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1600&auto=format&fit=crop&sat=-100',
            'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514316703755-dca7d7d9d882?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.audiA8,
    },

    // -------- SPORTS CARS --------

    // ID 4: Porsche 911 Carrera
    4: {
        frames: [
            'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1456932040915-a6e375b7e65d?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.porsche911,
    },

    // ID 5: Chevrolet Corvette Z06
    5: {
        frames: [
            'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1471479917193-f1b5c8c2e61f?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1600&auto=format&fit=crop&sat=-100',
            'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.corvette,
    },

    // -------- SUPERCARS --------

    // ID 6: Lamborghini Huracán Evo
    6: {
        frames: [
            'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580274455191-1c62238fa1c3?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767030-0a0a6c0aea36?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580274455191-1c62238fa1c3?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.lamborghini,
    },

    // ID 7: Ferrari F8 Tributo
    7: {
        frames: [
            'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767030-0a0a6c0aea36?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.ferrari,
    },

    // ID 8: McLaren 720S
    8: {
        frames: [
            'https://images.unsplash.com/photo-1592364395653-83e648b20cc2?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767030-0a0a6c0aea36?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580274455191-1c62238fa1c3?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1592364395653-83e648b20cc2?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767030-0a0a6c0aea36?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.mclaren,
    },

    // -------- LUXURY SUVs --------

    // ID 9: Range Rover Autobiography
    9: {
        frames: [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0729?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1572308941891-2e2d0a39eb17?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.rangeRover,
    },

    // ID 10: Mercedes-AMG G 63
    10: {
        frames: [
            'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.mercedes_g63,
    },

    // -------- ELECTRIC CARS --------

    // ID 11: Porsche Taycan Turbo S
    11: {
        frames: [
            'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.porscheTaycan,
    },

    // ID 12: Lucid Air Dream Edition
    12: {
        frames: [
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1600&auto=format&fit=crop&sat=-100',
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.lucidAir,
    },

    // -------- NEW ARRIVALS --------

    // ID 13: Rolls-Royce Spectre
    13: {
        frames: [
            'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580274455191-1c62238fa1c3?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.rollsRoyce,
    },

    // ID 14: Ferrari Purosangue
    14: {
        frames: [
            'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767030-0a0a6c0aea36?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop&sat=-100',
            'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767030-0a0a6c0aea36?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.ferrariPuro,
    },

    // -------- FEATURED --------

    // ID 15: Bugatti Chiron Super Sport
    15: {
        frames: [
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580274455191-1c62238fa1c3?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767030-0a0a6c0aea36?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop&sat=-100',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580274455191-1c62238fa1c3?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.bugatti,
    },

    // ID 16: Aston Martin Valkyrie
    16: {
        frames: [
            'https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767030-0a0a6c0aea36?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=1600&auto=format&fit=crop&sat=-100',
            'https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767030-0a0a6c0aea36?q=80&w=1600&auto=format&fit=crop',
        ],
        interior: INTERIORS.astonMartin,
    },
};

/**
 * Helper: given a carId and optional fallback image,
 * return { frames, interior } for the 360 viewer.
 */
export function get360Data(carId, fallbackImage) {
    const numId = Number(carId);
    if (car360Data[numId]) return car360Data[numId];
    // Fallback: create a minimal 3-frame set from the car's existing image
    const img = fallbackImage || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop';
    return {
        frames: [img, img, img, img, img, img],
        interior: img,
    };
}
