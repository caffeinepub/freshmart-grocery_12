export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  description: string;
  unit: string;
  emoji: string;
  bgColor: string;
  featured?: boolean;
  deal?: boolean;
}

export type Category =
  | "Fruits & Vegetables"
  | "Dairy"
  | "Snacks"
  | "Beverages"
  | "Personal Care"
  | "Household Items";

export const CATEGORIES: Category[] = [
  "Fruits & Vegetables",
  "Dairy",
  "Snacks",
  "Beverages",
  "Personal Care",
  "Household Items",
];

export const CATEGORY_CONFIG: Record<
  Category,
  { color: string; emoji: string }
> = {
  "Fruits & Vegetables": { color: "#4CAF50", emoji: "🥦" },
  Dairy: { color: "#FFF9C4", emoji: "🥛" },
  Snacks: { color: "#FF8F00", emoji: "🍿" },
  Beverages: { color: "#1565C0", emoji: "🧃" },
  "Personal Care": { color: "#E91E63", emoji: "🧴" },
  "Household Items": { color: "#5C6BC0", emoji: "🧹" },
};

export const products: Product[] = [
  // Fruits & Vegetables
  {
    id: "fv1",
    name: "Fresh Tomatoes",
    brand: "Farm Fresh",
    category: "Fruits & Vegetables",
    price: 60,
    discountedPrice: 40,
    discountPercent: 33,
    description:
      "Juicy, ripe tomatoes sourced directly from local farms. Perfect for curries, salads, and chutneys.",
    unit: "500g",
    emoji: "🍅",
    bgColor: "#4CAF50",
    featured: true,
    deal: true,
  },
  {
    id: "fv2",
    name: "Cavendish Bananas",
    brand: "Green Valley",
    category: "Fruits & Vegetables",
    price: 80,
    discountedPrice: 60,
    discountPercent: 25,
    description:
      "Sweet and energy-rich bananas, ideal for breakfast or a quick snack on the go.",
    unit: "6 pcs",
    emoji: "🍌",
    bgColor: "#4CAF50",
    featured: true,
  },
  {
    id: "fv3",
    name: "Fresh Potatoes",
    brand: "Farm Fresh",
    category: "Fruits & Vegetables",
    price: 50,
    discountedPrice: 35,
    discountPercent: 30,
    description:
      "Premium quality potatoes, great for aloo sabzi, french fries, and soups.",
    unit: "1 kg",
    emoji: "🥔",
    bgColor: "#4CAF50",
    deal: true,
  },
  {
    id: "fv4",
    name: "Nashik Onions",
    brand: "Kisan Bazaar",
    category: "Fruits & Vegetables",
    price: 60,
    discountedPrice: 45,
    discountPercent: 25,
    description:
      "Pungent and flavourful Nashik onions — the soul of Indian cooking.",
    unit: "1 kg",
    emoji: "🧅",
    bgColor: "#4CAF50",
  },
  {
    id: "fv5",
    name: "Shimla Apples",
    brand: "Himachal Orchard",
    category: "Fruits & Vegetables",
    price: 240,
    discountedPrice: 180,
    discountPercent: 25,
    description:
      "Crisp, sweet Shimla apples packed with vitamins and freshness.",
    unit: "4 pcs (~500g)",
    emoji: "🍎",
    bgColor: "#4CAF50",
    featured: true,
    deal: true,
  },
  {
    id: "fv6",
    name: "Baby Spinach",
    brand: "Green Harvest",
    category: "Fruits & Vegetables",
    price: 45,
    discountedPrice: 30,
    discountPercent: 33,
    description:
      "Tender baby spinach leaves, washed and ready to cook or toss in salads.",
    unit: "200g",
    emoji: "🥬",
    bgColor: "#4CAF50",
  },
  // Dairy
  {
    id: "d1",
    name: "Amul Butter",
    brand: "Amul",
    category: "Dairy",
    price: 65,
    discountedPrice: 55,
    discountPercent: 15,
    description:
      "India's favourite table butter — creamy, salted, and perfect for bread, rotis, and cooking.",
    unit: "100g",
    emoji: "🧈",
    bgColor: "#FFF9C4",
    featured: true,
  },
  {
    id: "d2",
    name: "Toned Milk",
    brand: "Mother Dairy",
    category: "Dairy",
    price: 72,
    discountedPrice: 68,
    discountPercent: 6,
    description:
      "Fresh toned milk in a convenient poly pack. Ideal for tea, coffee, and cooking.",
    unit: "1 L",
    emoji: "🥛",
    bgColor: "#FFF9C4",
    deal: true,
  },
  {
    id: "d3",
    name: "Amul Paneer",
    brand: "Amul",
    category: "Dairy",
    price: 110,
    discountedPrice: 85,
    discountPercent: 23,
    description:
      "Soft, fresh paneer made from pasteurised cow milk. Excellent for paneer butter masala.",
    unit: "200g",
    emoji: "🧀",
    bgColor: "#FFF9C4",
    featured: true,
    deal: true,
  },
  {
    id: "d4",
    name: "Dahi (Curd)",
    brand: "Nestle",
    category: "Dairy",
    price: 55,
    discountedPrice: 45,
    discountPercent: 18,
    description:
      "Rich, creamy curd set fresh daily. Great for raita, lassi, or as a side.",
    unit: "400g",
    emoji: "🫙",
    bgColor: "#FFF9C4",
  },
  {
    id: "d5",
    name: "Cheese Slices",
    brand: "Amul",
    category: "Dairy",
    price: 150,
    discountedPrice: 120,
    discountPercent: 20,
    description:
      "Perfectly portioned processed cheese slices for sandwiches and burgers.",
    unit: "10 slices",
    emoji: "🧀",
    bgColor: "#FFF9C4",
  },
  // Snacks
  {
    id: "s1",
    name: "Lay's Classic Salted",
    brand: "Lay's",
    category: "Snacks",
    price: 30,
    discountedPrice: 20,
    discountPercent: 33,
    description:
      "Light, crispy potato chips with just the right amount of salt. Classic snack for all ages.",
    unit: "26g",
    emoji: "🥔",
    bgColor: "#FF8F00",
    featured: true,
    deal: true,
  },
  {
    id: "s2",
    name: "Aloo Bhujia",
    brand: "Haldiram's",
    category: "Snacks",
    price: 80,
    discountedPrice: 60,
    discountPercent: 25,
    description:
      "Crispy, spicy aloo bhujia — a timeless Indian snack loved across generations.",
    unit: "150g",
    emoji: "🫘",
    bgColor: "#FF8F00",
    featured: true,
  },
  {
    id: "s3",
    name: "Parle-G Biscuits",
    brand: "Parle",
    category: "Snacks",
    price: 15,
    discountedPrice: 10,
    discountPercent: 33,
    description:
      "India's most iconic glucose biscuit — sweet, crunchy, and nostalgic.",
    unit: "100g",
    emoji: "🍪",
    bgColor: "#FF8F00",
    deal: true,
  },
  {
    id: "s4",
    name: "Kurkure Masala Munch",
    brand: "Kurkure",
    category: "Snacks",
    price: 30,
    discountedPrice: 20,
    discountPercent: 33,
    description:
      "Twisted corn puffs loaded with tangy masala punch. Impossible to stop at one!",
    unit: "35g",
    emoji: "🌽",
    bgColor: "#FF8F00",
  },
  {
    id: "s5",
    name: "Bourbon Biscuits",
    brand: "Britannia",
    category: "Snacks",
    price: 45,
    discountedPrice: 30,
    discountPercent: 33,
    description:
      "Chocolate-flavoured sandwich biscuits with a smooth cocoa cream filling.",
    unit: "150g",
    emoji: "🍫",
    bgColor: "#FF8F00",
  },
  // Beverages
  {
    id: "bv1",
    name: "Mixed Fruit Juice",
    brand: "Tropicana",
    category: "Beverages",
    price: 120,
    discountedPrice: 90,
    discountPercent: 25,
    description:
      "Refreshing blend of tropical fruits with no added preservatives.",
    unit: "1 L",
    emoji: "🧃",
    bgColor: "#1565C0",
    featured: true,
    deal: true,
  },
  {
    id: "bv2",
    name: "Classic Coffee",
    brand: "Nescafe",
    category: "Beverages",
    price: 299,
    discountedPrice: 250,
    discountPercent: 16,
    description: "Rich, aromatic instant coffee for your perfect morning cup.",
    unit: "50g",
    emoji: "☕",
    bgColor: "#1565C0",
  },
  {
    id: "bv3",
    name: "Premium Tea",
    brand: "Tata Tea",
    category: "Beverages",
    price: 150,
    discountedPrice: 120,
    discountPercent: 20,
    description:
      "Strong, full-bodied Assam blend tea leaves for a perfect masala chai.",
    unit: "250g",
    emoji: "🍵",
    bgColor: "#1565C0",
    featured: true,
  },
  {
    id: "bv4",
    name: "Mineral Water",
    brand: "Bisleri",
    category: "Beverages",
    price: 25,
    discountedPrice: 20,
    discountPercent: 20,
    description:
      "Safe, pure drinking water sealed at the source with stringent quality checks.",
    unit: "1 L",
    emoji: "💧",
    bgColor: "#1565C0",
    deal: true,
  },
  {
    id: "bv5",
    name: "Energy Drink",
    brand: "Red Bull",
    category: "Beverages",
    price: 150,
    discountedPrice: 125,
    discountPercent: 17,
    description:
      "Energising drink with caffeine and B-vitamins to keep you alert and focused.",
    unit: "250ml",
    emoji: "🥤",
    bgColor: "#1565C0",
  },
  // Personal Care
  {
    id: "pc1",
    name: "Dove Moisturising Soap",
    brand: "Dove",
    category: "Personal Care",
    price: 60,
    discountedPrice: 45,
    discountPercent: 25,
    description:
      "Nourishing beauty bar with 1/4 moisturising cream for soft, smooth skin.",
    unit: "100g",
    emoji: "🧼",
    bgColor: "#E91E63",
    featured: true,
    deal: true,
  },
  {
    id: "pc2",
    name: "Strong Teeth Toothpaste",
    brand: "Colgate",
    category: "Personal Care",
    price: 110,
    discountedPrice: 85,
    discountPercent: 23,
    description:
      "Advanced fluoride formula for 12-hour germ protection and strong enamel.",
    unit: "200g",
    emoji: "🦷",
    bgColor: "#E91E63",
  },
  {
    id: "pc3",
    name: "Anti-Dandruff Shampoo",
    brand: "Head & Shoulders",
    category: "Personal Care",
    price: 380,
    discountedPrice: 299,
    discountPercent: 21,
    description:
      "Clinically proven to eliminate dandruff with regular use. Leaves hair clean and fresh.",
    unit: "340ml",
    emoji: "🧴",
    bgColor: "#E91E63",
  },
  {
    id: "pc4",
    name: "Handwash Liquid",
    brand: "Dettol",
    category: "Personal Care",
    price: 110,
    discountedPrice: 89,
    discountPercent: 19,
    description:
      "Kills 99.9% of germs with dermatologically tested antibacterial formula.",
    unit: "250ml",
    emoji: "🫧",
    bgColor: "#E91E63",
    deal: true,
  },
  // Household Items
  {
    id: "hi1",
    name: "Matic Detergent",
    brand: "Surf Excel",
    category: "Household Items",
    price: 220,
    discountedPrice: 180,
    discountPercent: 18,
    description:
      "Top-loading washing machine detergent with built-in softener for bright, clean clothes.",
    unit: "1 kg",
    emoji: "🫧",
    bgColor: "#5C6BC0",
    featured: true,
    deal: true,
  },
  {
    id: "hi2",
    name: "Dishwash Bar",
    brand: "Vim",
    category: "Household Items",
    price: 80,
    discountedPrice: 65,
    discountPercent: 19,
    description:
      "Active lime formula that cuts through grease and leaves utensils sparkling clean.",
    unit: "200g",
    emoji: "🍽️",
    bgColor: "#5C6BC0",
  },
  {
    id: "hi3",
    name: "Toilet Cleaner",
    brand: "Harpic",
    category: "Household Items",
    price: 110,
    discountedPrice: 89,
    discountPercent: 19,
    description:
      "Powerful 10x stronger formula for 100% stain removal and germ kill.",
    unit: "500ml",
    emoji: "🚽",
    bgColor: "#5C6BC0",
    deal: true,
  },
  {
    id: "hi4",
    name: "Front-Load Powder",
    brand: "Ariel",
    category: "Household Items",
    price: 280,
    discountedPrice: 220,
    discountPercent: 21,
    description:
      "Advanced laundry detergent that removes 100+ stains even in cold water.",
    unit: "1 kg",
    emoji: "🧺",
    bgColor: "#5C6BC0",
  },
  {
    id: "hi5",
    name: "Floor Cleaner",
    brand: "Lizol",
    category: "Household Items",
    price: 185,
    discountedPrice: 149,
    discountPercent: 19,
    description:
      "Kills 99.9% germs and leaves floors fresh and shining with a pleasant fragrance.",
    unit: "500ml",
    emoji: "🧹",
    bgColor: "#5C6BC0",
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getDealProducts = () => products.filter((p) => p.deal);
export const getProductsByCategory = (cat: Category) =>
  products.filter((p) => p.category === cat);
export const getProductById = (id: string) => products.find((p) => p.id === id);
