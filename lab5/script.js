// DOM element references
const catalogContainer = document.getElementById("catalog-container");
const homeLink = document.getElementById("home-link");
const catalogLink = document.getElementById("catalog-link");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mainNav = document.getElementById("main-nav");

/**
 * Fetches JSON data from a file using XMLHttpRequest (Ajax)
 * @param {string} file - Path to the JSON file
 * @param {Function} callback - Callback function to handle the parsed data
 */
function fetchJSON(file, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", file, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          callback(data);
        } catch (error) {
          console.error(`Error parsing JSON from ${file}:`, error);
        }
      } else {
        console.error(`Failed to load file: ${file} (Status: ${xhr.status})`);
      }
    }
  };

  xhr.onerror = function () {
    console.error(`Network error while loading file: ${file}`);
  };

  xhr.send();
}

/**
 * Renders the list of categories in the catalog container
 * @param {Array} categories - Array of category objects
 */
function renderCategories(categories) {
  catalogContainer.innerHTML = "";

  categories.forEach((category) => {
    const categoryEl = createCategoryElement(category);
    categoryEl.addEventListener("click", () => {
      loadCategoryItems(category.shortname, category.name);
    });
    catalogContainer.appendChild(categoryEl);
  });

  // Add Specials link for random category selection
  const specialsLink = createSpecialsElement();
  specialsLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadRandomCategory(categories);
  });
  catalogContainer.appendChild(specialsLink);
}

/**
 * Creates a DOM element for a category
 * @param {Object} category - Category object with name and notes
 * @returns {HTMLElement} Category element
 */
function createCategoryElement(category) {
  const categoryEl = document.createElement("div");
  categoryEl.className = "category";
  categoryEl.innerHTML = `
        <h3>${category.name}</h3>
        <p>${category.notes}</p>
    `;
  return categoryEl;
}

/**
 * Creates a DOM element for the Specials category
 * @returns {HTMLElement} Specials element
 */
function createSpecialsElement() {
  const specialsLink = document.createElement("div");
  specialsLink.className = "category";
  specialsLink.innerHTML = `
        <h3>Specials</h3>
        <p>Спеціальні пропозиції</p>
    `;
  return specialsLink;
}

/**
 * Loads and displays the list of categories
 */
function loadCategories() {
  fetchJSON("src/categories.json", renderCategories);
}

/**
 * Loads and displays items for a specific category
 * @param {string} shortname - Short name of the category (used for file path)
 * @param {string} categoryName - Display name of the category
 */
function loadCategoryItems(shortname, categoryName) {
  fetchJSON(`src/${shortname}.json`, (items) => {
    catalogContainer.innerHTML = "";

    // Add category title
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = categoryName;
    categoryTitle.style.textAlign = "center";
    categoryTitle.style.marginBottom = "20px";
    catalogContainer.appendChild(categoryTitle);

    // Render items
    items.forEach((item) => {
      const itemEl = createItemElement(item);
      catalogContainer.appendChild(itemEl);
    });
  });
}

/**
 * Creates a DOM element for a catalog item
 * @param {Object} item - Item object with name, description, and price
 * @returns {HTMLElement} Item element
 */
function createItemElement(item) {
  const itemEl = document.createElement("div");
  itemEl.className = "category";
  itemEl.innerHTML = `
        <img src="https://placehold.co/200x200" alt="${
          item.name
        }" loading="lazy">
        <h3>${item.name}</h3>
        <p>${item.description || "Опис відсутній."}</p>
        <p><strong>${item.price}</strong></p>
    `;
  return itemEl;
}

/**
 * Loads a random category from the available categories
 * @param {Array} categories - Array of category objects
 */
function loadRandomCategory(categories) {
  if (categories.length === 0) {
    console.error("No categories available");
    return;
  }

  const randomIndex = Math.floor(Math.random() * categories.length);
  const randomCategory = categories[randomIndex];
  loadCategoryItems(randomCategory.shortname, randomCategory.name);
}

/**
 * Displays the home page welcome message
 */
function showHomePage() {
  catalogContainer.innerHTML = "<p>Ласкаво просимо на головну сторінку!</p>";
  updateActiveNavLink(homeLink);
  closeMobileMenu();
}

/**
 * Updates the active state of navigation links
 * @param {HTMLElement} activeLink - The link to mark as active
 */
function updateActiveNavLink(activeLink) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  activeLink.classList.add("active");
}

/**
 * Closes the mobile menu
 */
function closeMobileMenu() {
  if (mainNav && mobileMenuToggle) {
    mainNav.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  }
}

// Mobile menu toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
if (homeLink && catalogLink) {
  homeLink.addEventListener("click", closeMobileMenu);
  catalogLink.addEventListener("click", closeMobileMenu);
}

// Event listeners
homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  showHomePage();
});

catalogLink.addEventListener("click", (e) => {
  e.preventDefault();
  loadCategories();
  updateActiveNavLink(catalogLink);
  closeMobileMenu();
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    mainNav &&
    mobileMenuToggle &&
    !mainNav.contains(e.target) &&
    !mobileMenuToggle.contains(e.target) &&
    mainNav.classList.contains("active")
  ) {
    closeMobileMenu();
  }
});

// Initialize page with home content
showHomePage();
