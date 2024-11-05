document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resume-form");
  const resumeContent = document.getElementById("resume-content");
  const shareableLink = document.getElementById("shareable-link");
  const copyLinkBtn = document.getElementById("copy-link-btn");
  const downloadBtn = document.getElementById("download-btn");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      degree: document.getElementById("degree").value,
      school: document.getElementById("school").value,
      gradYear: document.getElementById("gradYear").value,
      jobTitle: document.getElementById("jobTitle").value,
      company: document.getElementById("company").value,
      years: document.getElementById("years").value,
      skills: document
        .getElementById("skills")
        .value.split(",")
        .map((skill) => skill.trim()),
    };

    generateResume(formData);

    const userName = formData.name.toLowerCase().replace(/\s+/g, "");
    const uniqueUrl = `review.html?username=${userName}`;
    localStorage.setItem(userName, JSON.stringify(formData));

    shareableLink.href = uniqueUrl;
    shareableLink.textContent = `Open Resume: ${uniqueUrl}`;
    shareableLink.style.display = "inline";
    copyLinkBtn.style.display = "inline-block";
    copyLinkBtn.onclick = () => {
      navigator.clipboard.writeText(`${window.location.origin}/${uniqueUrl}`);
      alert("Link copied to clipboard!");
    };
  });

  function generateResume(data) {
    resumeContent.innerHTML = `
      <h3>${data.name}</h3>
      <p>Email: ${data.email}</p>
      ${data.degree || data.school || data.gradYear ? `<h4>Education</h4>` : ""}
      <p>${data.degree} ${data.school ? "from " + data.school : ""} ${
      data.gradYear ? "(Class of " + data.gradYear + ")" : ""
    }</p>
      ${
        data.jobTitle || data.company || data.years
          ? `<h4>Work Experience</h4>`
          : ""
      }
      <p>${data.jobTitle} ${data.company ? "at " + data.company : ""} ${
      data.years ? "(" + data.years + " years)" : ""
    }</p>
      ${
        data.skills.length
          ? `<h4>Skills</h4><ul>${data.skills
              .map((skill) => `<li>${skill}</li>`)
              .join("")}</ul>`
          : ""
      }
    `;
  }

  downloadBtn.addEventListener("click", () => {
    const opt = {
      margin: 1,
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(document.getElementById("resume")).set(opt).save();
  });
});
