const input = document.getElementById("search");
  const button = document.getElementById("search-btn");

  // Pressing Enter triggers search
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      button.click();
    }
  });

  // Search function
  button.addEventListener("click", () => {
    const keyword = input.value.toLowerCase();
    const allSections = document.querySelectorAll(".all");

    // If input is empty, reset all
    if (keyword.trim() === "") {
      allSections.forEach(section => {
        section.style.display = "grid";
        const links = section.querySelectorAll("a");
        links.forEach(link => link.style.display = "grid");
      });
      return; // Stop here so no filtering happens
    }

    // Else, do filtering
    allSections.forEach(section => {
      const links = section.querySelectorAll("a");
      let matchFound = false;

      links.forEach(link => {
        const nameSpan = link.querySelector(".name");

        if (nameSpan && nameSpan.textContent.toLowerCase().includes(keyword)) {
          link.style.display = "grid";
          matchFound = true;
        } else {
          link.style.display = "none";
        }
      });

      section.style.display = matchFound ? "grid" : "none";
    });
  });