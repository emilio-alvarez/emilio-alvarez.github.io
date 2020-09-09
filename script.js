const experienceJSON = "content/experience.json";
const educationJSON = "content/education.json";
const projectsJSON = "content/projects.json";

$(document).ready(function () {
  // Load projects.json
  $.getJSON(experienceJSON, (experience) => {
    if (Array.isArray(experience)) {
      populateExperience(experience);
    }
  });

  $.getJSON(educationJSON, (education) => {
    if (Array.isArray(education)) {
      populateEducation(education);
    }
  });

  $.getJSON(projectsJSON, (projects) => {
    if (Array.isArray(projects)) {
      populateProjects(projects);
    }
  });
});

function populateExperience(experience) {
  $.get("templates/experience.ejs", function (template) {
    let html = ejs.render(template, { experience });
    $("#experience-container").html(html);
  });
}

function populateEducation(experience) {
  $.get("templates/experience.ejs", function (template) {
    let html = ejs.render(template, { experience });
    $("#education-container").html(html);
  });
}

function populateProjects(projects) {
  $.get("templates/projects.ejs", function (template) {
    let html = ejs.render(template, { projects });
    $("#projects-container").html(html);
  });
}
