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
    `
    <% for (position of experience) { %>
    <div class="position" style="border-left-color: <%= position.color %>">
      <div class="position__header">
        <a href="<%= position.link %>" class="position__company link--invisible">
          <%= position.company %>
        </a>
        <span class="position__location"><%= position.location %></span>
      </div>
      <div class="position__header">
        <div class="position__title"><%= position.title %></div>
        <div class="position__date"><%= position.dateString %></div>
      </div>
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
    `
    <div class="row row-cols-3">
      <% for (project of projects) { %>
      <div class="project">
        <div class="project__content">
          <div class="project__thumbnailContainer">
            <img class="project__thumbnail" src="<%= project.thumbnail %>" alt="<%= project.name %> Project Thumbnail" />
          </div>
          <div class="project__name"><%= project.name %></div>
          <div class="project__shortDescription"><%= project.shortDescription %></div>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-<%= project.name %>">Open</button>
        </div>
      </div>
      <% } %>
    </div>
    <div>
    <% for (project of projects) { %>
      <div class="modal fade" id="modal-<%= project.name %>" tabindex="-1" aria-labelledby="modal-<%= project.name %>-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal-<%= project.name %>-label"><%= project.name %></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">Hello</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    <% } %>
    </div>`,
    { projects }
  );
  $("#projects-container").html(html);
}
