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
        <a class="project__content" data-toggle="modal" data-target="#modal-<%= project.name %>">
          <div class="project__thumbnailContainer">
            <img class="project__thumbnail" src="assets/thumbnails/<%= project.thumbnail %>" alt="<%= project.name %> Project Thumbnail" />
          </div>
          <div class="project__name"><%= project.name %></div>
          <div class="project__overlay">
            <span><%= project.shortDescription %></span>
          </div>
        </a>
      </div>
      <% } %>
    </div>
    <div>
    <% for (project of projects) { %>
      <div class="modal fade" id="modal-<%= project.name %>" tabindex="-1" aria-labelledby="modal-<%= project.name %>-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal-<%= project.name %>-label"><%= project.name %></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id="<%= project.name %>-carousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <% for (let i=0; i<project.screenshotCount; i++) { %>
                  <li data-target="#<%= project.name %>-carousel" data-slide-to="<%= i %>" <% if (i === 0) { %> class="active" <% } %>></li>
                  <% } %>
                </ol>
                <div class="carousel-inner">
                  <% for (let i=0; i<project.screenshotCount; i++) { %>
                  <div class="carousel-item <% if (i === 0) { %> active <% } %>">
                    <img src="content/screenshots/<%= project.name %>/<%= i %>.png" class="d-block w-100" alt="<%= project.name %> Screenshot <%= i %>"/>
                  </div>
                  <% } %>
                </div>
                <a class="carousel-control-prev" href="#<%= project.name %>-carousel" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#<%= project.name %>-carousel" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <div class="project__catchphrase">
                <%= project.shortDescription %>
              </div>
              <ul class="project__description">
                <% for (paragraph of project.longDescription) { %>
                <li><%= paragraph %></li>
                <% } %>
              </ul>
              <a class="project__github" href="<%= project.github %>">
                <img src="assets/icons/github-square.svg" alt="GitHub Logo"/>
              </a>
            </div>
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
