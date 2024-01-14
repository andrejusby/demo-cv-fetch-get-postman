const experienceUrl = "https://pond-spurious-medicine.glitch.me/experiences";
const codingSkillsUrl = "https://pond-spurious-medicine.glitch.me/skills";

const addWorkExperience = (info) => {
  const workYearDiv = document.getElementById("work-year");
  const workDescriptionDv = document.getElementById("job-description");

  info.forEach((inf) => {
    const year = document.createElement("h4");
    year.innerText = `${inf.startYear} - ${inf.finishYear}`;

    const company = document.createElement("p");
    company.innerText = inf.companyName;

    workYearDiv.append(year, company);

    const position = document.createElement("h4");
    position.innerText = inf.position;

    const description = document.createElement("p");
    description.innerText = inf.description;

    workDescriptionDv.append(position, description);
  });
};

const addCodingSkills = (skills) => {
  const progressBarSectionDiv = document.getElementById("progressBarSection");

  skills.forEach((skill) => {
    const skillTitle = document.createElement("p");
    skillTitle.classList.add("black");
    skillTitle.innerText = skill.title;

    const skillLevel = document.createElement("p");
    skillLevel.classList.add("grey");
    skillLevel.innerText = `${skill.level} %`;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("progress-bar-item");
    infoDiv.classList.add("info")

    infoDiv.append(skillTitle, skillLevel);

    const progressBarInnerDiv = document.createElement("div");
    progressBarInnerDiv.style.width = skill.level + "%";

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");

    progressBar.append(progressBarInnerDiv);

    progressBarSectionDiv.append(infoDiv, progressBar);
  });
};

function fetchExperience() {
  fetch(experienceUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Pirmasis tinklo atsakas nebuvo tinkamas");
      }
      return res.json();
    })
    .then((data1) => {
      addWorkExperience(data1);
      console.log("Pirmajam viskas ok, duomenys is API 1", data1);
      console.log(typeof data1[0].startYear);
    });
  return fetch(codingSkillsUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Antrasis tinklo atsakas nebuvo tinkamas");
      }
      return res.json();
    })
    .then((data2) => {
      addCodingSkills(data2);
      console.log("Antrajam viskas ok, duomenenys is API 2", data2);
    })
    .catch((err) => {
      console.error("Perziureti koda, kazkur klaida", err);
    });
}

fetchExperience();
