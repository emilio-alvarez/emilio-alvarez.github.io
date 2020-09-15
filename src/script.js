const experienceJSON = "/content/data/experience.json";
const educationJSON = "/content/data/education.json";
const projectsJSON = "/content/data/projects.json";

$(document).ready(function () {
  // Load templates, then data
  let experienceTemplate;
  let projectsTemplate;

  $.get("/templates/experience.ejs", function (template) {
    experienceTemplate = ejs.compile(template, { client: true });

    populateElement(
      "#experience-container",
      experienceTemplate,
      experienceJSON
    );
    populateElement("#education-container", experienceTemplate, educationJSON);
  });

  $.get("/templates/projects.ejs", function (template) {
    projectsTemplate = ejs.compile(template, { client: true });

    populateElement("#projects-container", projectsTemplate, projectsJSON);
  });

  $('[data-toggle="tooltip"]').tooltip();
});

function populateElement(elementId, template, dataJSON) {
  $.getJSON(dataJSON, function (data) {
    let html = template({ data });

    $(elementId).html(html);
  });
}
