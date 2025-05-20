document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".filters input[type='checkbox']");
  const allCheckbox = document.querySelector(".filters input[value='all']");
  const cards = document.querySelectorAll(".card");

  function filterProjects() {
    const selectedTechnologies = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked && checkbox.value !== "all")
      .map(checkbox => checkbox.value.toLowerCase());

    // If "All" is checked or no other is selected
    if (allCheckbox.checked || selectedTechnologies.length === 0) {
      cards.forEach(card => (card.style.display = "flex"));
      return;
    }

    cards.forEach(card => {
      const tags = Array.from(card.querySelectorAll("ul li"))
        .map(li => li.className.toLowerCase());

      const hasTechnology = selectedTechnologies.some(tech => tags.includes(tech));
      card.style.display = hasTechnology ? "flex" : "none";
    });
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      // If checked anything other than "All", uncheck "All"
      if (checkbox.value !== "all" && checkbox.checked) {
        allCheckbox.checked = false;
      }

      // If "All" is checked, uncheck others
      if (checkbox.value === "all" && checkbox.checked) {
        checkboxes.forEach(cb => {
          if (cb !== allCheckbox) cb.checked = false;
        });
      }

      filterProjects();
    });
  });

  filterProjects(); // Apply the filter on page load
});
