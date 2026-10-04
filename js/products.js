/* ===== YOUR PRODUCTS =====
   This is the ONLY file you need to edit to add, remove or change artworks.
   Copy one { ... } block, paste it, and change the details.
   - id:        a unique short name, no spaces
   - stripeLink: paste your Stripe Payment Link here (looks like https://buy.stripe.com/...)
   - price:     in Rand (ZAR), numbers only
*/
const CATEGORIES = {
  "Aesthete Paintings": ["Custom Artwork", "Arabic Calligraphy", "Aesthete Thoughts Artwork"],
  "Aesthete Prints": ["Custom Acrylic Signs", "Keyrings", "Personalized Gifts"]
};

const PRODUCTS = [
  { id:"custom-artwork", name:"Custom Commission Canvas", category:"Aesthete Paintings", type:"Custom Artwork",
    price:2500, image:"images/painting.jpg", featured:true,
    description:"A one-of-a-kind painting made to your colours, size and story.",
    stripeLink:"" },
  { id:"bismillah-gold", name:"Bismillah in Gold", category:"Aesthete Paintings", type:"Arabic Calligraphy",
    price:1800, image:"images/calligraphy.jpg", featured:true,
    description:"Hand-painted Arabic calligraphy in gold leaf tones on cream canvas.",
    stripeLink:"" },
  { id:"thoughts-stillness", name:"Stillness — Aesthete Thoughts", category:"Aesthete Paintings", type:"Aesthete Thoughts Artwork",
    price:1200, image:"images/painting.jpg", featured:false,
    description:"An abstract reflection piece from the Aesthete Thoughts collection.",
    stripeLink:"" },
  { id:"acrylic-sign", name:"Custom Acrylic Sign", category:"Aesthete Prints", type:"Custom Acrylic Signs",
    price:450, image:"images/acrylic.jpg", featured:true,
    description:"Clear acrylic sign with your words in gold — weddings, homes, events.",
    stripeLink:"" },
  { id:"keyring", name:"Personalised Keyring", category:"Aesthete Prints", type:"Keyrings",
    price:120, image:"images/acrylic.jpg", featured:false,
    description:"Engraved acrylic keyring with a name, initials or date.",
    stripeLink:"" },
  { id:"gift-set", name:"Personalised Gift Set", category:"Aesthete Prints", type:"Personalized Gifts",
    price:650, image:"images/acrylic.jpg", featured:false,
    description:"A thoughtful custom gift bundle, wrapped and ready to give.",
    stripeLink:"" }
];
