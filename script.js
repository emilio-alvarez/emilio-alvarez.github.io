const experienceJSON = "content/experience.json";
const projectsJSON = "content/projects.json";

$(document).ready(function () {
  // Load projects.json
  $.getJSON(experienceJSON, (experience) => {
    if (Array.isArray(experience)) {
      populateExperience(experience);
    }
  });

  $.getJSON(projectsJSON, (projects) => {
    if (Array.isArray(projects)) {
      populateProjects(projects);
    }
  });
});

function populateExperience(experience) {
  let html = ejs.render(
    `<% for (position of experience) { %>
    <div class="position">
    <a href="<%= position.link %>" class="position__company"><%= position.company %></a>
    <div class="position__title"><%= position.title %></div>
    <div class="position__location"><%= position.location %></div>
    <div class="position__date"><%= position.dateString %></div>
    <ul class="position__duties">
    <% for (duty of position.duties) { %>
    <li><%= duty %></li>
    <% } %>
    </ul>
    </div>
    <% } %>`,
    { experience }
  );
  $("#experience-container").html(html);
}

function populateProjects(projects) {
  let html = ejs.render(
    `<% for (project of projects) { %>
    <div class="project">
    <div class="project__name"><%= project.name %></div>
    <div class="project__shortDescription"><%= project.shortDescription %></div>
    <% if (project.github) { %>
    <a href="<%= project.github %>" class="project__github">Source code</a>
    <% } %>
    </div>
    <% } %>`,
    { projects }
  );
  $("#projects-container").html(html);
}
