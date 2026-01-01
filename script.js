// 🔥 Firebase SDKs (NO npm needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔐 Firebase config (YOUR REAL VALUES)
const firebaseConfig = {
  apiKey: "AIzaSyCao0ovaWeL5vhoyx-Ff-EsuwUTM2kj-6I",
  authDomain: "snapchef-ai-367a9.firebaseapp.com",
  projectId: "snapchef-ai-367a9",
  storageBucket: "snapchef-ai-367a9.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 🚀 Initialize Firebase (ONLY ONCE)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("✅ Firebase connected successfully");

// ===============================
// 🍽️ Load Recipes from Firestore
// ===============================
const recipesContainer = document.getElementById("recipesContainer");

async function loadRecipes() {
  const querySnapshot = await getDocs(collection(db, "recipes"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${data.name}</h3>
      <p>⏱️ ${data.time}</p>
      <p>🧑‍🍳 ${data.difficulty}</p>
    `;

    recipesContainer.appendChild(card);
  });
}

loadRecipes();

// ===============================
// 📸 Image preview logic (frontend)
// ===============================
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
});
