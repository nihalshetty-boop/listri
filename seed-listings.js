const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Sample listings data with diverse categories and realistic information
const sampleListings = [
  // Electronics
  {
    title: "MacBook Pro 13-inch 2020",
    description: "Excellent condition MacBook Pro with M1 chip. Perfect for students or professionals. Includes original charger and box. No scratches or dents.",
    price: 1200,
    originalPrice: 1799,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
    category: "Electronics",
    condition: "excellent",
    location: "Downtown",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: true
  },
  {
    title: "iPhone 13 Pro Max 256GB",
    description: "Like new iPhone 13 Pro Max in Sierra Blue. Unlocked, works with all carriers. Screen protector applied since day one.",
    price: 850,
    originalPrice: 1099,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
    category: "Electronics",
    condition: "like-new",
    location: "Mission District",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: false
  },
  {
    title: "Sony WH-1000XM4 Headphones",
    description: "Premium noise-canceling headphones. Barely used, in perfect condition. Great for travel and work from home.",
    price: 280,
    originalPrice: 350,
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
    category: "Electronics",
    condition: "excellent",
    location: "Castro",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: true
  },

  // Clothing
  {
    title: "Nike Air Jordan 1 Retro High",
    description: "Classic Jordan 1s in Chicago colorway. Size 10.5, worn only a few times. Original box included.",
    price: 180,
    originalPrice: 170,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop",
    category: "Clothing",
    condition: "good",
    location: "Haight-Ashbury",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: true
  },
  {
    title: "Patagonia Down Sweater Jacket",
    description: "Warm and lightweight down jacket. Size Medium, perfect for hiking and outdoor activities. Excellent condition.",
    price: 120,
    originalPrice: 199,
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=600&fit=crop",
    category: "Clothing",
    condition: "excellent",
    location: "Marina",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: false
  },
  {
    title: "Vintage Levi's 501 Jeans",
    description: "Classic vintage Levi's 501s from the 90s. Size 32x32. Authentic vintage with natural fading and wear.",
    price: 85,
    originalPrice: 60,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop",
    category: "Clothing",
    condition: "good",
    location: "Mission District",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "pickup",
    negotiable: true
  },

  // Books
  {
    title: "Clean Code by Robert Martin",
    description: "Essential programming book for any developer. Hardcover edition in great condition. No highlighting or notes.",
    price: 25,
    originalPrice: 45,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    category: "Books",
    condition: "excellent",
    location: "SOMA",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: false
  },
  {
    title: "The Great Gatsby - First Edition",
    description: "Rare first edition of F. Scott Fitzgerald's masterpiece. Some wear on dust jacket but pages are pristine.",
    price: 450,
    originalPrice: 500,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    category: "Books",
    condition: "good",
    location: "Nob Hill",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "pickup",
    negotiable: true
  },

  // Home & Garden
  {
    title: "Dyson V11 Cordless Vacuum",
    description: "Powerful cordless vacuum with multiple attachments. Great for apartments and small homes. Well maintained.",
    price: 350,
    originalPrice: 599,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    category: "Home & Garden",
    condition: "excellent",
    location: "Pacific Heights",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: true
  },
  {
    title: "IKEA Kallax Shelf Unit",
    description: "White 4x4 cube storage unit. Perfect for organizing books, records, or decorative items. Some minor wear.",
    price: 60,
    originalPrice: 89,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    category: "Home & Garden",
    condition: "good",
    location: "Richmond",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "pickup",
    negotiable: false
  },
  {
    title: "KitchenAid Stand Mixer",
    description: "Classic red KitchenAid mixer with dough hook, whisk, and paddle attachments. Barely used, like new condition.",
    price: 220,
    originalPrice: 329,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    category: "Home & Garden",
    condition: "like-new",
    location: "Sunset",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: true
  },

  // Sports
  {
    title: "Yoga Mat Premium Quality",
    description: "High-quality non-slip yoga mat. Used for home practice, excellent condition. Easy to clean and maintain.",
    price: 35,
    originalPrice: 65,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    category: "Sports",
    condition: "excellent",
    location: "Castro",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: false
  },
  {
    title: "Wilson Pro Staff Tennis Racket",
    description: "Professional tennis racket used by many pros. Strung with premium strings. Great for intermediate to advanced players.",
    price: 150,
    originalPrice: 220,
    imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop",
    category: "Sports",
    condition: "good",
    location: "Marina",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: true
  },

  // Toys
  {
    title: "LEGO Creator Expert Modular Building",
    description: "Complete LEGO modular building set. All pieces included with original instructions. Perfect for collectors.",
    price: 180,
    originalPrice: 200,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    category: "Toys",
    condition: "excellent",
    location: "Mission District",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: false
  },

  // Automotive
  {
    title: "Car Phone Mount with Wireless Charging",
    description: "Premium car phone mount with wireless charging capability. Compatible with all phone sizes. Barely used.",
    price: 45,
    originalPrice: 79,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    category: "Automotive",
    condition: "excellent",
    location: "SOMA",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: true
  },

  // Health & Beauty
  {
    title: "Dyson Supersonic Hair Dryer",
    description: "Professional hair dryer with multiple attachments. Reduces heat damage and dries hair faster. Excellent condition.",
    price: 280,
    originalPrice: 399,
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
    category: "Health & Beauty",
    condition: "excellent",
    location: "Pacific Heights",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: true
  },

  // Music
  {
    title: "Fender Stratocaster Electric Guitar",
    description: "Classic Fender Strat in sunburst finish. Great condition with minor wear. Perfect for beginners or collectors.",
    price: 450,
    originalPrice: 650,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    category: "Music",
    condition: "good",
    location: "Haight-Ashbury",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "pickup",
    negotiable: true
  },
  {
    title: "Audio-Technica Turntable",
    description: "Professional turntable for vinyl enthusiasts. Includes cartridge and stylus. Great for home listening.",
    price: 320,
    originalPrice: 450,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    category: "Music",
    condition: "excellent",
    location: "Richmond",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: false
  },

  // Gaming
  {
    title: "Nintendo Switch with Games",
    description: "Nintendo Switch console with 3 games: Zelda, Mario Kart, and Animal Crossing. Includes all accessories and original box.",
    price: 280,
    originalPrice: 400,
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop",
    category: "Gaming",
    condition: "excellent",
    location: "Sunset",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: true
  },

  // Photography
  {
    title: "Canon 50mm f/1.8 Lens",
    description: "Fast prime lens perfect for portraits and low light photography. Compatible with Canon EF mount cameras.",
    price: 120,
    originalPrice: 125,
    imageUrl: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop",
    category: "Photography",
    condition: "excellent",
    location: "Nob Hill",
    city: "San Francisco",
    state: "CA",
    buyingMethod: "both",
    negotiable: false
  }
];

async function seedListings() {
  try {
    console.log('🌱 Starting to seed listings...');

    // First, check if we have any users in the database
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true }
    });

    if (users.length === 0) {
      console.log('❌ No users found in database. Please create some users first.');
      return;
    }

    console.log(`📊 Found ${users.length} users in database`);

    // Create listings and associate them with random users
    const createdListings = [];
    
    for (let i = 0; i < sampleListings.length; i++) {
      const listingData = sampleListings[i];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      
      const listing = await prisma.listing.create({
        data: {
          ...listingData,
          userId: randomUser.id,
        }
      });
      
      createdListings.push(listing);
      console.log(`✅ Created listing: "${listing.title}" (assigned to ${randomUser.name})`);
    }

    console.log(`🎉 Successfully created ${createdListings.length} listings!`);
    console.log('\n📋 Summary:');
    
    // Group by category
    const byCategory = createdListings.reduce((acc, listing) => {
      acc[listing.category] = (acc[listing.category] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(byCategory).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} listings`);
    });

  } catch (error) {
    console.error('❌ Error seeding listings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedListings();
