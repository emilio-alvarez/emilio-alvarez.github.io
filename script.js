const experienceJSON = "content/experience.json";
const educationJSON = "content/education.json";
const projectsJSON = "content/projects.json";

$(document).ready(function () {
  // Load templates, then data
  let experienceTemplate;
  let projectsTemplate;

  $.get("templates/experience.ejs", function (template) {
    experienceTemplate = ejs.compile(template, { client: true });

    populateElement(
      "#experience-container",
      experienceTemplate,
      experienceJSON
    );
    populateElement("#education-container", experienceTemplate, educationJSON);
  });

  $.get("templates/projects.ejs", function (template) {
    projectsTemplate = ejs.compile(template, { client: true });

    populateElement("#projects-container", projectsTemplate, projectsJSON);
  });
});

function populateElement(elementId, template, dataJSON) {
  $.getJSON(dataJSON, function (data) {
    let html = template({ data });

    $(elementId).html(html);
  });
}
