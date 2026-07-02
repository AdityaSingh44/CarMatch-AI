const commonPros = ['Easy to drive', 'Good service reach'];
const commonCons = ['Popular variants can have waiting periods', 'Top trims can feel expensive'];

const stableUnsplashImages = [
    'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1400&q=85',
];

function buildCarGallery(index) {
    return Array.from({ length: 7 }, (_, offset) => stableUnsplashImages[(index + offset) % stableUnsplashImages.length]);
}

function car(index, make, model, variant, price, fuelType, transmission, bodyType, engine, mileage, safetyRating, seatingCapacity, description, pros = [], cons = []) {
    const gallery = buildCarGallery(index);

    return {
        make,
        model,
        variant,
        price,
        fuelType,
        transmission,
        bodyType,
        engine,
        mileage,
        safetyRating,
        seatingCapacity,
        description,
        image: gallery[0],
        images: gallery,
        pros: [...pros, ...commonPros].slice(0, 4),
        cons: [...cons, ...commonCons].slice(0, 4),
    };
}

export const cars = [
    car(0, 'Maruti Suzuki', 'Swift', 'ZXI Plus', 820000, 'Petrol', 'Manual', 'Hatchback', '1.2L Dual Jet Petrol', 22.4, 3, 5, 'A nimble hatchback for city buyers who want low running costs and easy ownership.', ['Excellent mileage', 'Compact footprint'], ['Average rear seat space']),
    car(1, 'Maruti Suzuki', 'Baleno', 'Alpha AMT', 960000, 'Petrol', 'Automatic', 'Hatchback', '1.2L K-Series Petrol', 22.9, 3, 5, 'A premium hatchback with generous cabin space, light controls, and efficient petrol performance.', ['Spacious cabin', 'Efficient engine'], ['Safety rating is modest']),
    car(2, 'Maruti Suzuki', 'Brezza', 'ZXI Plus AT', 1450000, 'Petrol', 'Automatic', 'Compact SUV', '1.5L K-Series Petrol', 19.8, 4, 5, 'A practical compact SUV with a smooth automatic and broad service support.', ['Comfortable ride', 'Strong resale value'], ['No diesel option']),
    car(3, 'Maruti Suzuki', 'Grand Vitara', 'Alpha Plus Hybrid', 1990000, 'Hybrid', 'Automatic', 'SUV', '1.5L Strong Hybrid', 27.9, 4, 5, 'A fuel-efficient SUV for buyers who want hybrid economy and everyday comfort.', ['Outstanding efficiency', 'Refined hybrid drive'], ['Boot space is limited by hybrid hardware']),
    car(4, 'Maruti Suzuki', 'Ertiga', 'ZXI Plus', 1220000, 'Petrol', 'Manual', 'MPV', '1.5L Smart Hybrid Petrol', 20.5, 3, 7, 'A value-focused 7-seater that works well for families and shared city-highway usage.', ['Seven-seat practicality', 'Low running costs'], ['Basic safety score']),

    car(5, 'Hyundai', 'i20', 'Asta IVT', 1120000, 'Petrol', 'Automatic', 'Hatchback', '1.2L Kappa Petrol', 20.0, 3, 5, 'A feature-rich premium hatchback with a refined automatic gearbox and upmarket cabin.', ['Premium interior', 'Smooth automatic'], ['Turbo variants are pricier']),
    car(6, 'Hyundai', 'Venue', 'SX Turbo DCT', 1420000, 'Petrol', 'Automatic', 'Compact SUV', '1.0L Turbo GDi Petrol', 18.3, 4, 5, 'A compact SUV with punchy turbo performance, connected features, and city-friendly dimensions.', ['Strong turbo engine', 'Loaded features'], ['Rear seat is best for two adults']),
    car(7, 'Hyundai', 'Creta', 'SX Tech', 1820000, 'Petrol', 'Automatic', 'SUV', '1.5L MPi Petrol IVT', 17.4, 3, 5, 'A polished midsize SUV with broad appeal, comfortable ride quality, and premium features.', ['Comfortable cabin', 'Feature loaded'], ['Safety rating trails rivals']),
    car(8, 'Hyundai', 'Verna', 'SX Turbo DCT', 1830000, 'Petrol', 'Automatic', 'Sedan', '1.5L Turbo GDi Petrol', 20.6, 5, 5, 'A fast, feature-rich sedan with strong safety credentials and a spacious cabin.', ['Excellent safety rating', 'Strong performance'], ['Low-slung stance may not suit rough roads']),
    car(9, 'Hyundai', 'Exter', 'SX AMT', 1030000, 'Petrol', 'Automatic', 'Compact SUV', '1.2L Kappa Petrol', 19.2, 3, 5, 'A small SUV-inspired city car with useful features and easy automatic convenience.', ['Easy city driving', 'Good feature list'], ['Compact boot space']),

    car(10, 'Honda', 'Amaze', 'VX CVT', 1120000, 'Petrol', 'Automatic', 'Sedan', '1.2L i-VTEC Petrol', 18.6, 4, 5, 'A compact sedan with a smooth CVT, comfortable seats, and dependable Honda ownership.', ['Smooth CVT', 'Comfortable cabin'], ['Cabin design feels conservative']),
    car(11, 'Honda', 'City', 'ZX CVT', 1710000, 'Petrol', 'Automatic', 'Sedan', '1.5L i-VTEC Petrol', 18.4, 5, 5, 'A refined sedan known for comfort, safety, and an enjoyable petrol engine.', ['Excellent safety', 'Refined engine'], ['Ground clearance is moderate']),
    car(12, 'Honda', 'City e:HEV', 'ZX Hybrid', 2050000, 'Hybrid', 'Automatic', 'Sedan', '1.5L Atkinson Hybrid', 27.1, 5, 5, 'A premium hybrid sedan with excellent economy and advanced driver assistance features.', ['Hybrid efficiency', 'Strong safety tech'], ['High upfront price']),
    car(13, 'Honda', 'Elevate', 'ZX CVT', 1700000, 'Petrol', 'Automatic', 'SUV', '1.5L i-VTEC Petrol', 16.9, 4, 5, 'A practical midsize SUV with good visibility, simple controls, and Honda reliability.', ['High seating position', 'Reliable powertrain'], ['No diesel or hybrid option']),
    car(14, 'Honda', 'WR-V', 'VX', 980000, 'Petrol', 'Manual', 'Compact SUV', '1.2L i-VTEC Petrol', 17.5, 4, 5, 'A compact crossover suited to buyers who want hatchback ease with added practicality.', ['Practical cabin', 'Reliable engine'], ['Limited automatic availability']),

    car(15, 'Toyota', 'Glanza', 'V AMT', 1020000, 'Petrol', 'Automatic', 'Hatchback', '1.2L Petrol', 22.3, 3, 5, 'A premium hatchback with Toyota-backed ownership and efficient city-friendly performance.', ['Efficient and easy', 'Low ownership fuss'], ['Driving feel is relaxed']),
    car(16, 'Toyota', 'Urban Cruiser Hyryder', 'V Hybrid', 2060000, 'Hybrid', 'Automatic', 'SUV', '1.5L Strong Hybrid', 27.9, 4, 5, 'A midsize SUV focused on excellent fuel economy, comfort, and long-term dependability.', ['Superb mileage', 'Toyota reliability'], ['Hybrid boot space compromise']),
    car(17, 'Toyota', 'Innova Hycross', 'VX Hybrid', 3050000, 'Hybrid', 'Automatic', 'MPV', '2.0L Strong Hybrid', 23.2, 5, 7, 'A premium family MPV with hybrid efficiency, space, comfort, and excellent highway manners.', ['Excellent family space', 'Premium ride comfort'], ['Expensive for budget buyers']),
    car(18, 'Toyota', 'Fortuner', '4x2 AT', 4100000, 'Diesel', 'Automatic', 'SUV', '2.8L Turbo Diesel', 14.4, 5, 7, 'A rugged body-on-frame SUV for buyers prioritising road presence and long-distance durability.', ['Commanding presence', 'Strong diesel engine'], ['High price and running costs']),
    car(19, 'Toyota', 'Rumion', 'V AT', 1350000, 'Petrol', 'Automatic', 'MPV', '1.5L Petrol', 20.1, 3, 7, 'A practical seven-seater MPV for families wanting automatic convenience and proven mechanicals.', ['Useful seven seats', 'Smooth automatic'], ['Interior feels utilitarian']),

    car(20, 'Mahindra', 'XUV 3XO', 'AX7 L AT', 1550000, 'Petrol', 'Automatic', 'Compact SUV', '1.2L TGDi Petrol', 18.2, 5, 5, 'A compact SUV with strong performance, modern features, and an impressive safety package.', ['Excellent safety', 'Punchy engine'], ['Boot is not class leading']),
    car(21, 'Mahindra', 'XUV700', 'AX7 Diesel AT', 2850000, 'Diesel', 'Automatic', 'SUV', '2.2L mHawk Diesel', 16.5, 5, 7, 'A powerful family SUV with advanced tech, high safety, and genuine seven-seat flexibility.', ['Powerful diesel', 'Advanced features'], ['Large size in tight cities']),
    car(22, 'Mahindra', 'Scorpio N', 'Z8L Diesel AT', 2450000, 'Diesel', 'Automatic', 'SUV', '2.2L mHawk Diesel', 15.4, 5, 7, 'A tough SUV with ladder-frame strength, commanding seating, and strong diesel performance.', ['Rugged build', 'Strong road presence'], ['Third row access is tight']),
    car(23, 'Mahindra', 'Thar', 'LX Diesel AT', 1780000, 'Diesel', 'Automatic', 'SUV', '2.2L mHawk Diesel', 15.2, 4, 4, 'A lifestyle SUV for buyers who value off-road ability and character over family practicality.', ['Great off-road ability', 'Iconic design'], ['Limited rear practicality']),
    car(24, 'Mahindra', 'Bolero Neo', 'N10', 1160000, 'Diesel', 'Manual', 'SUV', '1.5L mHawk Diesel', 17.3, 3, 7, 'A rugged people mover suited to rough roads and buyers needing simple diesel dependability.', ['Tough construction', 'Seven-seat layout'], ['Basic cabin experience']),

    car(25, 'Tata', 'Tiago', 'XZ Plus AMT', 820000, 'Petrol', 'Automatic', 'Hatchback', '1.2L Revotron Petrol', 19.0, 4, 5, 'A safe and affordable hatchback with automatic convenience and sensible running costs.', ['Strong safety for segment', 'Compact and practical'], ['Engine refinement is average']),
    car(26, 'Tata', 'Altroz', 'XZA Plus DCT', 1160000, 'Petrol', 'Automatic', 'Hatchback', '1.2L Revotron Petrol DCT', 18.5, 5, 5, 'A stylish premium hatchback with a strong safety rating and spacious cabin.', ['Five-star safety', 'Premium design'], ['Low-speed response can feel calm']),
    car(27, 'Tata', 'Punch', 'Creative AMT', 1040000, 'Petrol', 'Automatic', 'Compact SUV', '1.2L Revotron Petrol', 18.8, 5, 5, 'A compact SUV with standout safety, high seating, and easy city usability.', ['Excellent safety', 'High ground clearance'], ['Highway performance is modest']),
    car(28, 'Tata', 'Nexon', 'Fearless Plus DCA', 1620000, 'Petrol', 'Automatic', 'Compact SUV', '1.2L Turbo Petrol', 17.4, 5, 5, 'A strong all-round compact SUV with excellent safety, modern styling, and broad variant choice.', ['Five-star safety', 'Feature rich'], ['Touch controls need familiarity']),
    car(29, 'Tata', 'Harrier', 'Fearless Plus AT', 3050000, 'Diesel', 'Automatic', 'SUV', '2.0L Kryotec Diesel', 16.8, 5, 5, 'A premium diesel SUV with a commanding cabin, high safety, and relaxed highway ability.', ['Excellent safety', 'Strong highway presence'], ['No petrol option']),
    car(30, 'Tata', 'Safari', 'Accomplished Plus AT', 3450000, 'Diesel', 'Automatic', 'SUV', '2.0L Kryotec Diesel', 16.3, 5, 7, 'A three-row SUV for families wanting safety, space, diesel torque, and premium features.', ['Three-row practicality', 'Top safety score'], ['Large footprint in traffic']),
    car(31, 'Tata', 'Nexon EV', 'Empowered Plus LR', 1999000, 'Electric', 'Automatic', 'Compact SUV', '40.5 kWh Electric Motor', 465, 5, 5, 'An electric compact SUV with strong safety, silent performance, and practical real-world range.', ['Low running cost', 'Excellent safety'], ['Charging setup needed']),

    car(32, 'Kia', 'Sonet', 'GTX Plus DCT', 1580000, 'Petrol', 'Automatic', 'Compact SUV', '1.0L Turbo GDi Petrol', 18.4, 3, 5, 'A stylish compact SUV with a premium cabin, quick DCT, and feature-heavy ownership appeal.', ['Feature packed', 'Quick automatic'], ['Rear seat width is average']),
    car(33, 'Kia', 'Seltos', 'GTX Plus DCT', 2230000, 'Petrol', 'Automatic', 'SUV', '1.5L Turbo GDi Petrol', 17.9, 3, 5, 'A premium midsize SUV with strong performance, sharp styling, and a modern cabin.', ['Strong turbo performance', 'Premium features'], ['Safety rating is not segment-leading']),
    car(34, 'Kia', 'Carens', 'Luxury Plus DCT', 2050000, 'Petrol', 'Automatic', 'MPV', '1.5L Turbo Petrol', 16.5, 3, 7, 'A comfortable three-row family car with flexible seating and a long feature list.', ['Flexible cabin', 'Good feature set'], ['Safety score could be better']),
    car(35, 'Kia', 'EV6', 'GT Line AWD', 6590000, 'Electric', 'Automatic', 'SUV', '77.4 kWh Dual Motor Electric', 528, 5, 5, 'A premium electric crossover with fast performance, long range, and futuristic design.', ['Long EV range', 'Very quick performance'], ['Premium pricing']),
    car(36, 'Kia', 'Carnival', 'Limousine Plus', 6400000, 'Diesel', 'Automatic', 'MPV', '2.2L Diesel', 14.8, 5, 7, 'A luxury MPV for buyers who prioritise passenger comfort and long-distance family travel.', ['Luxury second row', 'Huge cabin'], ['Too large for dense city use']),

    car(37, 'MG', 'Astor', 'Sharp Pro CVT', 1880000, 'Petrol', 'Automatic', 'SUV', '1.5L VTi-Tech Petrol', 15.4, 5, 5, 'A feature-rich SUV with a premium cabin, ADAS features, and calm petrol performance.', ['Premium interior', 'Strong safety tech'], ['Mileage is average']),
    car(38, 'MG', 'Hector', 'Sharp Pro CVT', 2440000, 'Petrol', 'Automatic', 'SUV', '1.5L Turbo Petrol', 13.8, 4, 5, 'A large SUV with a roomy cabin, big infotainment display, and comfort-focused ride.', ['Very spacious', 'Comfortable ride'], ['Fuel efficiency is modest']),
    car(39, 'MG', 'Hector Plus', 'Sharp Pro Diesel', 2550000, 'Diesel', 'Manual', 'MPV', '2.0L Diesel', 15.6, 4, 7, 'A three-row family vehicle with SUV presence and generous cabin space.', ['Spacious three rows', 'Premium cabin feel'], ['Diesel lacks automatic option']),
    car(40, 'MG', 'Comet EV', 'Plush', 980000, 'Electric', 'Automatic', 'Hatchback', '17.3 kWh Electric Motor', 230, 3, 4, 'A compact urban EV for short commutes, tight parking, and low daily running costs.', ['Tiny city footprint', 'Low running cost'], ['Limited highway usability']),
    car(41, 'MG', 'ZS EV', 'Essence', 2590000, 'Electric', 'Automatic', 'SUV', '50.3 kWh Electric Motor', 461, 5, 5, 'An electric SUV with good range, premium features, and smooth urban performance.', ['Useful EV range', 'Premium cabin'], ['Charging access is important']),

    car(42, 'Skoda', 'Slavia', 'Style DSG', 1840000, 'Petrol', 'Automatic', 'Sedan', '1.5L TSI Petrol', 19.0, 5, 5, 'A safe and engaging sedan with strong turbo performance and European road manners.', ['Five-star safety', 'Fun to drive'], ['Service costs can be higher']),
    car(43, 'Skoda', 'Kushaq', 'Monte Carlo DSG', 2050000, 'Petrol', 'Automatic', 'SUV', '1.5L TSI Petrol', 18.6, 5, 5, 'A compact midsize SUV with strong safety, crisp handling, and quick turbo performance.', ['Excellent safety', 'Strong engine'], ['Rear seat width is average']),
    car(44, 'Skoda', 'Kodiaq', 'L&K 4x4', 4100000, 'Petrol', 'Automatic', 'SUV', '2.0L TSI Petrol', 13.3, 5, 7, 'A premium seven-seat SUV with refined performance, safety, and all-wheel-drive confidence.', ['Premium build', 'All-wheel drive'], ['Expensive maintenance']),
    car(45, 'Skoda', 'Superb', 'L&K', 5400000, 'Petrol', 'Automatic', 'Sedan', '2.0L TSI Petrol', 15.1, 5, 5, 'A luxury sedan with limousine-like space, refined performance, and understated design.', ['Huge rear seat space', 'Refined engine'], ['High purchase price']),

    car(46, 'Volkswagen', 'Virtus', 'GT Plus DSG', 1910000, 'Petrol', 'Automatic', 'Sedan', '1.5L TSI EVO Petrol', 19.6, 5, 5, 'A sporty sedan with excellent safety, strong performance, and efficient cylinder deactivation tech.', ['Five-star safety', 'Excellent performance'], ['Firm ride at low speeds']),
    car(47, 'Volkswagen', 'Taigun', 'GT Plus DSG', 2100000, 'Petrol', 'Automatic', 'SUV', '1.5L TSI EVO Petrol', 18.5, 5, 5, 'A driver-focused SUV with a safe body shell, premium feel, and strong turbo petrol engine.', ['Great driving dynamics', 'Five-star safety'], ['Cabin is practical rather than flashy']),
    car(48, 'Volkswagen', 'Tiguan', 'Elegance', 3550000, 'Petrol', 'Automatic', 'SUV', '2.0L TSI Petrol', 12.7, 5, 5, 'A premium SUV with all-wheel drive, solid build, and confident highway behavior.', ['Premium build quality', 'All-wheel drive'], ['Fuel economy is low']),
    car(49, 'Volkswagen', 'Polo', 'Legend Edition', 920000, 'Petrol', 'Manual', 'Hatchback', '1.0L TSI Petrol', 18.2, 4, 5, 'A compact hatchback remembered for solid build, punchy turbo performance, and driver appeal.', ['Fun to drive', 'Solid build'], ['Limited availability as a used-focused option']),
];
