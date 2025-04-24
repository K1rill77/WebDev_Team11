function uncheckAll() {
    const noneCheckbox = document.getElementById("none");
    const otherCheckboxes = document.querySelectorAll(".checkbox-group .group input[type='checkbox']:not(#none)");
  
    if (noneCheckbox.checked) {
      otherCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    } else {
      return;
    }
  }
  
  document.querySelectorAll(".checkbox-group .group input[type='checkbox']:not(#none)").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const noneCheckbox = document.getElementById("none");
      if (checkbox.checked) {
        noneCheckbox.checked = false;
      }
    });
  });
  
  //star rating selection
  document.addEventListener("DOMContentLoaded", () => {
    const experienceStars = document.querySelectorAll(".experience-rating .fa-star");
    const ratingExperience = document.getElementById("ratingExperience");
  
    experienceStars.forEach((star) => {
      star.addEventListener("click", () => {
        // Remove 'selected' class from all stars in this group
        experienceStars.forEach((s) => s.classList.remove("selected"));
  
        // Add 'selected' class to clicked star and all previous stars
        star.classList.add("selected");
        let previousSibling = star.previousElementSibling;
        while (previousSibling) {
          previousSibling.classList.add("selected");
          previousSibling = previousSibling.previousElementSibling;
        }
  
        // Set the rating value in the hidden input
        ratingExperience.value = star.getAttribute("data-value");
      });
    });
  
    const cleanlinessStars = document.querySelectorAll(".cleanliness-rating .fa-star");
    const ratingCleanliness = document.getElementById("ratingCleanliness");
  
    cleanlinessStars.forEach((star) => {
      star.addEventListener("click", () => {
        // Remove 'selected' class from all stars in this group
        cleanlinessStars.forEach((s) => s.classList.remove("selected"));
  
        // Add 'selected' class to clicked star and all previous stars
        star.classList.add("selected");
        let previousSibling = star.previousElementSibling;
        while (previousSibling) {
          previousSibling.classList.add("selected");
          previousSibling = previousSibling.previousElementSibling;
        }
  
        // Set the rating value in the hidden input
        ratingCleanliness.value = star.getAttribute("data-value");
      });
    });
  });
  
  // Function to handle form submission in rate.html
  function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get form values
    const name = document.getElementById("name").value || "Anonymous";
    const nationality = document.getElementById("nationality").value;
    const destination = document.getElementById("destination").value || "N/A";
    const dateVisited = document.getElementById("date").value || "N/A";
    const vacationRating = document.getElementById("ratingExperience").value || "N/A";
    const cleanlinessRating = document.getElementById("ratingCleanliness").value || "N/A";
    const comment = document.getElementById("comment").value || "No comment";
  
    // Get selected amenities
    const amenities = Array.from(
      document.querySelectorAll(".checkbox-group .group input[type='checkbox']:checked")
    )
      .map((checkbox) => checkbox.value)
      .join(", ") || "None";
  
    // Save to localStorage if destination is Boracay Island
    if (destination === "Boracay Island") {
      const boracayRatings = JSON.parse(localStorage.getItem("boracayRatings")) || [];
      boracayRatings.push({
        name,
        nationality,
        destination,
        dateVisited,
        vacationRating,
        cleanlinessRating,
        amenities,
        comment,
      });
      localStorage.setItem("boracayRatings", JSON.stringify(boracayRatings));
    } else if (destination === "Puerto Princesa") {
      const puertoRatings = JSON.parse(localStorage.getItem("puertoRatings")) || [];
      puertoRatings.push({
        name,
        nationality,
        destination,
        dateVisited,
        vacationRating,
        cleanlinessRating,
        amenities,
        comment,
      });
      localStorage.setItem("puertoRatings", JSON.stringify(puertoRatings));
    } else if (destination === "Siargao Island") {
        const siargaoRatings = JSON.parse(localStorage.getItem("siargaoRatings")) || [];
        siargaoRatings.push({
          name,
          nationality,
          destination,
          dateVisited,
          vacationRating,
          cleanlinessRating,
          amenities,
          comment,
        });
        localStorage.setItem("tagaytayRatings", JSON.stringify(siargaoRatings));
      }else if (destination === "Tagaytay") {
        const tagaytayRatings = JSON.parse(localStorage.getItem("tagaytayRatings")) || [];
        tagaytayRatings.push({
          name,
          nationality,
          destination,
          dateVisited,
          vacationRating,
          cleanlinessRating,
          amenities,
          comment,
        });
        localStorage.setItem("tagaytayRatings", JSON.stringify(tagaytayRatings));
      }
  
    // Populate the table in the current page (rate.html) with only the current rating
    const tableBody = document.getElementById("tableBody");
    
    const newRow = document.createElement("tr");
  
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${nationality}</td>
      <td>${destination}</td>
      <td>${dateVisited}</td>
      <td>${vacationRating} / 5</td>
      <td>${cleanlinessRating} / 5</td>
      <td>${amenities}</td>
      <td>${comment}</td>
    `;
  
    tableBody.appendChild(newRow);
  
    // Hide the form and show the table
    document.getElementById("book-form").classList.add("hidden");
    document.getElementById("tableContainer").classList.remove("hidden");
  
    document.getElementById('thankYouContainer').classList.remove('hidden');
  
    // Optionally, scroll to the table
    document.getElementById("tableContainer").scrollIntoView({ behavior: "smooth" });
  
    document.getElementById("resultTable").style.display = "table";
  
    // Clear the form
    document.getElementById("rateForm").reset();
  
    return false; // Prevent form submission
  }
  
  // Function to load Boracay ratings in boracay.html
  function loadBoracayRatings() {
    const boracayRatings = JSON.parse(localStorage.getItem("boracayRatings")) || [];
    const tableBody = document.getElementById("boracayTableBody");
  
    tableBody.innerHTML = ""; // Clear previous rows
    boracayRatings.forEach((rating) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${rating.name}</td>
        <td>${rating.nationality}</td>
        <td>${rating.destination}</td>
        <td>${rating.dateVisited}</td>
        <td>${rating.vacationRating} / 5</td>
        <td>${rating.cleanlinessRating} / 5</td>
        <td>${rating.amenities}</td>
        <td>${rating.comment}</td>
      `;
      tableBody.appendChild(newRow);
    });
  }

  // Function to load Puerto ratings in puerto.html
  function loadPuertoRatings() {
    const puertoRatings = JSON.parse(localStorage.getItem("puertoRatings")) || [];
    const tableBody = document.getElementById("puertoTableBody");
  
    tableBody.innerHTML = ""; // Clear previous rows
    puertoRatings.forEach((rating) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${rating.name}</td>
        <td>${rating.nationality}</td>
        <td>${rating.destination}</td>
        <td>${rating.dateVisited}</td>
        <td>${rating.vacationRating} / 5</td>
        <td>${rating.cleanlinessRating} / 5</td>
        <td>${rating.amenities}</td>
        <td>${rating.comment}</td>
      `;
      tableBody.appendChild(newRow);
    });
  }

   // Function to load Siargao ratings in siargao.html
   function loadSiargaoRatings() {
    const siargaoRatings = JSON.parse(localStorage.getItem("siargaoRatings")) || [];
    const tableBody = document.getElementById("siargaoTableBody");
  
    tableBody.innerHTML = ""; // Clear previous rows
    siargaoRatings.forEach((rating) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${rating.name}</td>
        <td>${rating.nationality}</td>
        <td>${rating.destination}</td>
        <td>${rating.dateVisited}</td>
        <td>${rating.vacationRating} / 5</td>
        <td>${rating.cleanlinessRating} / 5</td>
        <td>${rating.amenities}</td>
        <td>${rating.comment}</td>
      `;
      tableBody.appendChild(newRow);
    });
  }

  // Function to load Tagaytay ratings in tagaytay.html
  function loadTagaytayRatings() {
    const tagaytayRatings = JSON.parse(localStorage.getItem("tagaytayRatings")) || [];
    const tableBody = document.getElementById("tagaytayTableBody");
  
    tableBody.innerHTML = ""; // Clear previous rows
    tagaytayRatings.forEach((rating) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${rating.name}</td>
        <td>${rating.nationality}</td>
        <td>${rating.destination}</td>
        <td>${rating.dateVisited}</td>
        <td>${rating.vacationRating} / 5</td>
        <td>${rating.cleanlinessRating} / 5</td>
        <td>${rating.amenities}</td>
        <td>${rating.comment}</td>
      `;
      tableBody.appendChild(newRow);
    });
  }
  
  // Run the appropriate function based on the current page
  document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
  
    if (currentPage === "boracay.html") {
        loadBoracayRatings();
    } else if (currentPage === "puerto.html") {
        loadPuertoRatings();
    }else if (currentPage === "siargao.html") {
        loadSiargaoRatings();
    }else if (currentPage === "tagaytay.html") {
        loadTagaytayRatings();
    }
  });
