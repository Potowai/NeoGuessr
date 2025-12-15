import { LocationData } from "../types";

const LOCATIONS: LocationData[] = [
  {
    country: "France",
    city: "Paris",
    region: "Europe",
    landmark: "Eiffel Tower",
    clues: ["Iron Lady", "Built for the 1889 World's Fair", "Located on the Champ de Mars"],
    funFact: "It was originally intended to be a temporary structure for 20 years.",
    coordinates: { lat: 48.8584, lng: 2.2945 },
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "United States",
    city: "New York City",
    region: "North America",
    landmark: "Statue of Liberty",
    clues: ["A gift from France", "Holds a torch and a tablet", "Stands on Liberty Island"],
    funFact: "The statue's full name is 'Liberty Enlightening the World'.",
    coordinates: { lat: 40.6892, lng: -74.0445 },
    imageUrl: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Italy",
    city: "Rome",
    region: "Europe",
    landmark: "The Colosseum",
    clues: ["Ancient gladiatorial arena", "Largest amphitheater built", "Located in the capital of Italy"],
    funFact: "It could hold up to 80,000 spectators in ancient times.",
    coordinates: { lat: 41.8902, lng: 12.4922 },
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "India",
    city: "Agra",
    region: "Asia",
    landmark: "Taj Mahal",
    clues: ["White marble mausoleum", "Built by Emperor Shah Jahan", "Symbol of eternal love"],
    funFact: "The colors of the marble change depending on the time of day.",
    coordinates: { lat: 27.1751, lng: 78.0421 },
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "China",
    city: "Beijing",
    region: "Asia",
    landmark: "Great Wall of China",
    clues: ["Visible from space (myth)", "Thousands of miles long", "Built to protect against invasions"],
    funFact: "Sticky rice was used in the mortar to bind the stones.",
    coordinates: { lat: 40.4319, lng: 116.5704 },
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Peru",
    city: "Cusco Region",
    region: "South America",
    landmark: "Machu Picchu",
    clues: ["Lost City of the Incas", "Located high in the Andes", "Discovered in 1911"],
    funFact: "It was built without the use of wheels or iron tools.",
    coordinates: { lat: -13.1631, lng: -72.5450 },
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Brazil",
    city: "Rio de Janeiro",
    region: "South America",
    landmark: "Christ the Redeemer",
    clues: ["Art Deco statue", "Stands atop Mount Corcovado", "Overlooks a famous harbor"],
    funFact: "It is the largest Art Deco statue in the world.",
    coordinates: { lat: -22.9519, lng: -43.2105 },
    imageUrl: "https://images.unsplash.com/photo-1598124146163-36819847264d?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Australia",
    city: "Sydney",
    region: "Oceania",
    landmark: "Sydney Opera House",
    clues: ["Sail-shaped shells", "Located in a famous harbor", "Performing arts center"],
    funFact: "The roof is covered with over one million tiles.",
    coordinates: { lat: -33.8568, lng: 151.2153 },
    imageUrl: "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Egypt",
    city: "Giza",
    region: "Africa",
    landmark: "Great Pyramid of Giza",
    clues: ["Oldest of the Seven Wonders", "Built for Khufu", "Guarded by the Sphinx"],
    funFact: "It was the tallest man-made structure for over 3,800 years.",
    coordinates: { lat: 29.9792, lng: 31.1342 },
    imageUrl: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "United Kingdom",
    city: "London",
    region: "Europe",
    landmark: "Big Ben (Elizabeth Tower)",
    clues: ["Famous clock tower", "Part of the Palace of Westminster", "Rings every hour"],
    funFact: "Big Ben is actually the nickname for the bell inside, not the tower.",
    coordinates: { lat: 51.5007, lng: -0.1246 },
    imageUrl: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Greece",
    city: "Athens",
    region: "Europe",
    landmark: "The Parthenon",
    clues: ["Temple on the Acropolis", "Dedicated to Athena", "Doric columns"],
    funFact: "It has survived explosions, fires, and earthquakes over 2,500 years.",
    coordinates: { lat: 37.9715, lng: 23.7267 },
    imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Spain",
    city: "Barcelona",
    region: "Europe",
    landmark: "Sagrada Família",
    clues: ["Unfinished basilica", "Designed by Gaudí", "Unique organic architecture"],
    funFact: "Construction began in 1882 and is still ongoing.",
    coordinates: { lat: 41.4036, lng: 2.1744 },
    imageUrl: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "United Arab Emirates",
    city: "Dubai",
    region: "Asia",
    landmark: "Burj Khalifa",
    clues: ["Tallest building in the world", "Located in the desert", "Over 828 meters high"],
    funFact: "You can watch the sunset twice in one day from the bottom and top.",
    coordinates: { lat: 25.1972, lng: 55.2744 },
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "United States",
    city: "San Francisco",
    region: "North America",
    landmark: "Golden Gate Bridge",
    clues: ["Orange suspension bridge", "Spans a strait", "Often covered in fog"],
    funFact: "The color is officially called 'International Orange'.",
    coordinates: { lat: 37.8199, lng: -122.4783 },
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Russia",
    city: "Moscow",
    region: "Europe",
    landmark: "Saint Basil's Cathedral",
    clues: ["Colorful onion domes", "Located in Red Square", "Iconic Russian architecture"],
    funFact: "Legend says the architects were blinded so they couldn't recreate it.",
    coordinates: { lat: 55.7525, lng: 37.6231 },
    imageUrl: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Japan",
    city: "Kyoto",
    region: "Asia",
    landmark: "Kinkaku-ji (Golden Pavilion)",
    clues: ["Zen Buddhist temple", "Top floors covered in gold leaf", "Reflects in a pond"],
    funFact: "It was burned down by a novice monk in 1950.",
    coordinates: { lat: 35.0394, lng: 135.7292 },
    imageUrl: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Cambodia",
    city: "Siem Reap",
    region: "Asia",
    landmark: "Angkor Wat",
    clues: ["Largest religious monument", "Originally Hindu, then Buddhist", "Featured on the national flag"],
    funFact: "It was built to represent Mount Meru, home of the gods.",
    coordinates: { lat: 13.4125, lng: 103.8670 },
    imageUrl: "https://images.unsplash.com/photo-1600523097108-a53d3b734892?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Jordan",
    city: "Ma'an",
    region: "Asia",
    landmark: "Petra (The Treasury)",
    clues: ["Rose City", "Carved directly into rock", "Entrance via the Siq"],
    funFact: "Only 15% of the city has been uncovered by archaeologists.",
    coordinates: { lat: 30.3285, lng: 35.4444 },
    imageUrl: "https://images.unsplash.com/photo-1579606038837-e54e4eb1303b?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "United States",
    city: "Arizona",
    region: "North America",
    landmark: "Grand Canyon",
    clues: ["Carved by the Colorado River", "Mile deep", "Visible layers of red rock"],
    funFact: "It reveals nearly 2 billion years of Earth's geological history.",
    coordinates: { lat: 36.1069, lng: -112.1129 },
    imageUrl: "https://images.unsplash.com/photo-1474044159687-1ee9f03fd3f4?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Canada",
    city: "Toronto",
    region: "North America",
    landmark: "CN Tower",
    clues: ["Concrete communications tower", "Dominates the skyline", "Has a glass floor"],
    funFact: "It was the world's tallest free-standing structure for 32 years.",
    coordinates: { lat: 43.6426, lng: -79.3871 },
    imageUrl: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "United States",
    city: "Seattle",
    region: "North America",
    landmark: "Space Needle",
    clues: ["Built for 1962 World's Fair", "Futuristic saucer top", "Observation deck"],
    funFact: "It was designed to look like a flying saucer on legs.",
    coordinates: { lat: 47.6205, lng: -122.3493 },
    imageUrl: "https://images.unsplash.com/photo-1541457523724-95f54f7740cc?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Italy",
    city: "Pisa",
    region: "Europe",
    landmark: "Leaning Tower of Pisa",
    clues: ["Freestanding bell tower", "Famous for its tilt", "Romanesque style"],
    funFact: "It began to lean during construction in the 12th century.",
    coordinates: { lat: 43.7230, lng: 10.3966 },
    imageUrl: "https://images.unsplash.com/photo-1553913861-c0fdd6552085?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Germany",
    city: "Berlin",
    region: "Europe",
    landmark: "Brandenburg Gate",
    clues: ["Neoclassical monument", "Symbol of unity", "Quadriga on top"],
    funFact: "Napoleon stole the Quadriga statue and took it to Paris.",
    coordinates: { lat: 52.5163, lng: 13.3777 },
    imageUrl: "https://images.unsplash.com/photo-1560930869-95e54c46d3e1?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Turkey",
    city: "Istanbul",
    region: "Europe/Asia",
    landmark: "Hagia Sophia",
    clues: ["Huge dome", "Church turned mosque turned museum", "Byzantine masterpiece"],
    funFact: "It was the world's largest cathedral for nearly 1000 years.",
    coordinates: { lat: 41.0086, lng: 28.9802 },
    imageUrl: "https://images.unsplash.com/photo-1628945415712-46a2468352b2?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Malaysia",
    city: "Kuala Lumpur",
    region: "Asia",
    landmark: "Petronas Twin Towers",
    clues: ["Twin skyscrapers", "Connected by a skybridge", "Islamic art motifs"],
    funFact: "They were the tallest buildings in the world from 1998 to 2004.",
    coordinates: { lat: 3.1578, lng: 101.7116 },
    imageUrl: "https://images.unsplash.com/photo-1582235948750-f844a475514f?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Singapore",
    city: "Singapore",
    region: "Asia",
    landmark: "Marina Bay Sands",
    clues: ["Ship-like roof", "Infinity pool on top", "Integrated resort"],
    funFact: "The SkyPark is longer than the Eiffel Tower is tall.",
    coordinates: { lat: 1.2847, lng: 103.8610 },
    imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "South Africa",
    city: "Cape Town",
    region: "Africa",
    landmark: "Table Mountain",
    clues: ["Flat-topped mountain", "Overlooks the city bowl", "Often covered by 'tablecloth' clouds"],
    funFact: "It is one of the oldest mountains in the world.",
    coordinates: { lat: -33.9628, lng: 18.4098 },
    imageUrl: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Zimbabwe",
    city: "Livingstone",
    region: "Africa",
    landmark: "Victoria Falls",
    clues: ["The Smoke that Thunders", "Largest waterfall by volume", "Border of Zambia and Zimbabwe"],
    funFact: "You can see the spray from the falls from 30 miles away.",
    coordinates: { lat: -17.9243, lng: 25.8572 },
    imageUrl: "https://images.unsplash.com/photo-1627914445695-888915570086?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Iceland",
    city: "Snæfellsnes",
    region: "Europe",
    landmark: "Kirkjufell",
    clues: ["Church Mountain", "Most photographed mountain in Iceland", "Near a waterfall"],
    funFact: "It appeared as the 'Arrowhead Mountain' in Game of Thrones.",
    coordinates: { lat: 64.9417, lng: -23.3069 },
    imageUrl: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Netherlands",
    city: "Amsterdam",
    region: "Europe",
    landmark: "Canal Ring",
    clues: ["Waterways", "Narrow houses", "Cycling capital"],
    funFact: "Amsterdam has more canals than Venice.",
    coordinates: { lat: 52.3676, lng: 4.9041 },
    imageUrl: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Italy",
    city: "Venice",
    region: "Europe",
    landmark: "Rialto Bridge",
    clues: ["Spans the Grand Canal", "Stone arch bridge", "City of water"],
    funFact: "It was the only bridge across the Grand Canal until 1854.",
    coordinates: { lat: 45.4380, lng: 12.3359 },
    imageUrl: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Czech Republic",
    city: "Prague",
    region: "Europe",
    landmark: "Charles Bridge",
    clues: ["Historic bridge", "Lined with statues", "Connects Old Town and Castle"],
    funFact: "Egg yolks were mixed into the mortar to strengthen the construction.",
    coordinates: { lat: 50.0865, lng: 14.4114 },
    imageUrl: "https://images.unsplash.com/photo-1541849546-216549242869?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Hungary",
    city: "Budapest",
    region: "Europe",
    landmark: "Hungarian Parliament Building",
    clues: ["Gothic Revival style", "On the Danube river", "Largest building in the country"],
    funFact: "It has 691 rooms and 20 kilometers of stairs.",
    coordinates: { lat: 47.5071, lng: 19.0457 },
    imageUrl: "https://images.unsplash.com/photo-1551862143-698f1262d057?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Austria",
    city: "Vienna",
    region: "Europe",
    landmark: "Schönbrunn Palace",
    clues: ["Imperial summer residence", "Baroque architecture", "Famous gardens"],
    funFact: "Mozart performed here for the Empress at age six.",
    coordinates: { lat: 48.1849, lng: 16.3122 },
    imageUrl: "https://images.unsplash.com/photo-1596708681538-4e5dc0e163d4?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Denmark",
    city: "Copenhagen",
    region: "Europe",
    landmark: "Nyhavn",
    clues: ["Colorful harbor", "Wooden ships", "Hans Christian Andersen lived here"],
    funFact: "The oldest house, No. 9, dates back to 1681.",
    coordinates: { lat: 55.6795, lng: 12.5910 },
    imageUrl: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Portugal",
    city: "Lisbon",
    region: "Europe",
    landmark: "Belém Tower",
    clues: ["Fortified tower", "Manueline style", "Gateway to the city"],
    funFact: "It served as a ceremonial gateway to Lisbon.",
    coordinates: { lat: 38.6916, lng: -9.2160 },
    imageUrl: "https://images.unsplash.com/photo-1588528990666-608b8b832e82?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Mexico",
    city: "Yucatan",
    region: "North America",
    landmark: "Chichen Itza",
    clues: ["Mayan pyramid", "El Castillo", "Equinox serpent shadow"],
    funFact: "Clapping your hands at the base creates an echo like a bird chirp.",
    coordinates: { lat: 20.6843, lng: -88.5678 },
    imageUrl: "https://images.unsplash.com/photo-1518638151313-982d918399d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Cuba",
    city: "Havana",
    region: "North America",
    landmark: "El Capitolio",
    clues: ["Resembles US Capitol", "National Capitol Building", "Symbol of pre-revolution"],
    funFact: "It houses the world's third largest indoor statue.",
    coordinates: { lat: 23.1353, lng: -82.3592 },
    imageUrl: "https://images.unsplash.com/photo-1503424886307-b090341d2c4b?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Canada",
    city: "Banff",
    region: "North America",
    landmark: "Lake Louise",
    clues: ["Turquoise water", "Glacial lake", "Canadian Rockies"],
    funFact: "The water color comes from rock flour created by glacial grinding.",
    coordinates: { lat: 51.4254, lng: -116.1773 },
    imageUrl: "https://images.unsplash.com/photo-1536698658682-6e21307b2756?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Greece",
    city: "Santorini",
    region: "Europe",
    landmark: "Oia Blue Domes",
    clues: ["White houses", "Blue domes", "Volcanic island"],
    funFact: "The island is actually the rim of an active volcano.",
    coordinates: { lat: 36.4618, lng: 25.3753 },
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "India",
    city: "Mumbai",
    region: "Asia",
    landmark: "Gateway of India",
    clues: ["Arch monument", "Overlooks the Arabian Sea", "Built for King George V"],
    funFact: "The last British troops left India through this gateway.",
    coordinates: { lat: 18.9220, lng: 72.8347 },
    imageUrl: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "South Korea",
    city: "Seoul",
    region: "Asia",
    landmark: "Gyeongbokgung Palace",
    clues: ["Main royal palace", "Joseon dynasty", "Changing of the guard"],
    funFact: "It was destroyed by fire during the Imjin War and abandoned for two centuries.",
    coordinates: { lat: 37.5796, lng: 126.9770 },
    imageUrl: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Taiwan",
    city: "Taipei",
    region: "Asia",
    landmark: "Taipei 101",
    clues: ["Bamboo stalk shape", "Former tallest building", "Earthquake damper"],
    funFact: "Its elevators are among the fastest in the world.",
    coordinates: { lat: 25.0330, lng: 121.5654 },
    imageUrl: "https://images.unsplash.com/photo-1532054616239-1d95eb4407b7?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "New Zealand",
    city: "Auckland",
    region: "Oceania",
    landmark: "Sky Tower",
    clues: ["Telecommunications tower", "Southern Hemisphere's tallest", "Bungee jump from it"],
    funFact: "It is taller than the Eiffel Tower.",
    coordinates: { lat: -36.8485, lng: 174.7633 },
    imageUrl: "https://images.unsplash.com/photo-1575453003058-c0b873a46d1b?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Vietnam",
    city: "Quảng Ninh",
    region: "Asia",
    landmark: "Ha Long Bay",
    clues: ["Emerald waters", "Limestone islands", "Junk boat tours"],
    funFact: "The name means 'descending dragon'.",
    coordinates: { lat: 20.9101, lng: 107.1839 },
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Thailand",
    city: "Bangkok",
    region: "Asia",
    landmark: "Wat Arun",
    clues: ["Temple of Dawn", "Riverside", "Khmer-style tower"],
    funFact: "It is covered in colorful porcelain and seashells.",
    coordinates: { lat: 13.7437, lng: 100.4888 },
    imageUrl: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Indonesia",
    city: "Bali",
    region: "Asia",
    landmark: "Ulun Danu Beratan Temple",
    clues: ["Water temple", "Lake Beratan", "Iconic pagoda"],
    funFact: "It appears to float on the water when the lake level rises.",
    coordinates: { lat: -8.2752, lng: 115.1668 },
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Ireland",
    city: "Dublin",
    region: "Europe",
    landmark: "Temple Bar",
    clues: ["Cobblestone streets", "Cultural quarter", "Famous red pub"],
    funFact: "It has retained its medieval street pattern.",
    coordinates: { lat: 53.3454, lng: -6.2641 },
    imageUrl: "https://images.unsplash.com/photo-1564959130747-897fb406b9dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Scotland",
    city: "Edinburgh",
    region: "Europe",
    landmark: "Edinburgh Castle",
    clues: ["Dominates the skyline", "Built on a volcanic rock", "Home of Crown Jewels"],
    funFact: "It is one of the most attacked places in the world.",
    coordinates: { lat: 55.9486, lng: -3.1999 },
    imageUrl: "https://images.unsplash.com/photo-1562095034-75cd86766465?auto=format&fit=crop&w=800&q=80"
  },
  {
    country: "Sweden",
    city: "Stockholm",
    region: "Europe",
    landmark: "Gamla Stan",
    clues: ["Old Town", "Colorful buildings", "Nobel Museum"],
    funFact: "It is one of the best preserved medieval city centers in Europe.",
    coordinates: { lat: 59.3251, lng: 18.0708 },
    imageUrl: "https://images.unsplash.com/photo-1496582453673-a8e579308107?auto=format&fit=crop&w=800&q=80"
  }
];

export const fetchRandomLocation = async (): Promise<LocationData> => {
  // Simulate network delay for effect
  await new Promise(resolve => setTimeout(resolve, 300));
  const randomIndex = Math.floor(Math.random() * LOCATIONS.length);
  return LOCATIONS[randomIndex];
};

export const getWikimediaImageUrl = (filename: string) => {
  return filename; 
};
