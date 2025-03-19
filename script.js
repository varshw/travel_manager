document.addEventListener("DOMContentLoaded", function () {
    // Sample Destination Data
    const destinations = [
        { name: "Paris, France", image: "images/parry.jpeg", description: "The city of love, famous for the Eiffel Tower, cafes, and rich history.", popularity: 5 },
        { name: "Maldives", image: "images/maldives.jpg", description: "A paradise of clear waters, white sand beaches, and luxury resorts.", popularity: 9 },
        { name: "Tokyo, Japan", image: "images/hero-japan.jpg", description: "A vibrant city blending modern skyscrapers with traditional temples.", popularity: 8 },
        { name: "Rome, Italy", image: "images/rome.jpeg", description: "The city of architecture.", popularity: 7 }
    ];

    let currentPage = 1;
    const perPage = 2; // Show 2 destinations per page
    const totalPages = Math.ceil(destinations.length / perPage); // Auto-detect total pages

    // Function to Render Destinations
    function renderDestinations() {
        const container = document.getElementById("destinationContainer");
        if (!container) return;
        container.innerHTML = "";

        let sortedData = [...destinations];
        const sortBy = document.getElementById("sortOptions") ? document.getElementById("sortOptions").value : "name";

        if (sortBy === "name") {
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "popularity") {
            sortedData.sort((a, b) => b.popularity - a.popularity);
        }

        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const paginatedData = sortedData.slice(start, end);

        paginatedData.forEach(dest => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${dest.image}" alt="${dest.name}">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
                <button class="view-more" onclick="openPopup('${dest.image}', '${dest.name}', '${dest.description}')">View More</button>
            `;
            container.appendChild(card);
        });

        // Update pagination display
        const pageNumber = document.getElementById("pageNumber");
        if (pageNumber) {
            pageNumber.innerText = `${currentPage} / ${totalPages}`;
        }

        // Disable buttons if needed
        document.getElementById("prevPage")?.setAttribute("disabled", currentPage === 1);
        document.getElementById("nextPage")?.setAttribute("disabled", currentPage === totalPages);
    }

    // Pagination Controls
    document.getElementById("prevPage")?.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderDestinations();
        }
    });

    document.getElementById("nextPage")?.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderDestinations();
        }
    });

    document.getElementById("sortOptions")?.addEventListener("change", renderDestinations);

    // Popup Functions
    function openPopup(imageSrc, title, description) {
        const popup = document.getElementById("popup");
        if (!popup) return;
        document.getElementById("popupImage").src = imageSrc;
        document.getElementById("popupTitle").innerText = title;
        document.getElementById("popupDescription").innerText = description;
        popup.style.display = "flex";
    }

    function closePopup() {
        const popup = document.getElementById("popup");
        if (popup) {
            popup.style.display = "none";
        }
    }
    
    // ✅ FIXED: Slideshow (Removed duplicate 'let slides' declaration)
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    if (slides.length > 0) {
        function showNextSlide() {
            slides[index].classList.remove("active");
            index = (index + 1) % slides.length; // Loop back to first image
            slides[index].classList.add("active");
        }

        // Set first slide as active initially
        slides[index].classList.add("active");

        // Change slide every 3 seconds
        setInterval(showNextSlide, 3000);
    }

    // Login & Logout Functionality
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginBtn && logoutBtn) {
        loginBtn.addEventListener("click", function () {
            alert("Login Successful!");
            loginBtn.style.display = "none";
            logoutBtn.style.display = "inline-block";
        });

        logoutBtn.addEventListener("click", function () {
            alert("Logged Out!");
            loginBtn.style.display = "inline-block";
            logoutBtn.style.display = "none";
        });
    }

    // Initial Render
    renderDestinations();
});
