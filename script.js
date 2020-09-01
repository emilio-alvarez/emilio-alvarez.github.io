const experienceJSON = "content/experience.json";

$(document).ready(function () {
  // Load projects.json
  $.getJSON(experienceJSON, (experience) => {
    if (Array.isArray(experience)) {
      populateExperience(experience);
    }
  });
});

function populateExperience(experience) {
  let html = ejs.render(
    `<% for (position of experience) { %>
    <h1><%= position.company %></h1>
    <% } %>`,
    { experience }
  );
  $("#experience-container").html(html);
}

function generateProjectElement(projects) {}
