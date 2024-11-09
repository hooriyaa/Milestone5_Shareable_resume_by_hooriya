document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resume-form");
  const resumeContent = document.getElementById("resume-content");
  const shareableLink = document.getElementById("shareable-link");
  const copyLinkBtn = document.getElementById("copy-link-btn");
  const downloadBtn = document.getElementById("download-btn");

  // Add event listeners for dynamic form elements
  const addElementListeners = {
    education: {
      container: document.getElementById("education-container"),
      addButton: document.getElementById("add-education"),
      template: () => `
        <div class="education-entry">
          <input type="text" class="degree" placeholder="Degree/Certificate" />
          <input type="text" class="school" placeholder="School/University" />
          <input type="number" class="grad-year" placeholder="Graduation Year" />
          <button type="button" class="remove-education">Remove</button>
        </div>
      `
    },
    certificates: {
      container: document.getElementById("certificates-container"),
      addButton: document.getElementById("add-certificate"),
      template: () => `
        <div class="certificate-entry">
          <input type="text" class="cert-name" placeholder="Certificate Name" />
          <input type="text" class="cert-issuer" placeholder="Issuing Organization" />
          <input type="date" class="cert-date" />
          <button type="button" class="remove-cert">Remove</button>
        </div>
      `
    },
    experience: {
      container: document.getElementById("experience-container"),
      addButton: document.getElementById("add-experience"),
      template: () => `
        <div class="experience-entry">
          <input type="text" class="job-title" placeholder="Job Title" />
          <input type="text" class="company" placeholder="Company" />
          <input type="number" class="years" placeholder="Years of Experience" />
          <textarea class="job-description" rows="3" 
            style="width: 95%; border-radius: 8px; width: calc(100% - 24px); box-sizing: border-box; border: 2px solid #00d2d3; margin-top: 10px; padding: 8px;"
            placeholder="Describe your key responsibilities and achievements"></textarea>
          <button type="button" class="remove-experience">Remove</button>
        </div>
      `
    }
  };

  // Setup dynamic form elements
  Object.entries(addElementListeners).forEach(([key, config]) => {
    // Add new entry
    config.addButton.addEventListener("click", () => {
      const div = document.createElement("div");
      div.innerHTML = config.template();
      config.container.appendChild(div.firstElementChild);
    });

    // Remove entry
    config.container.addEventListener("click", (e) => {
      if (e.target.classList.contains(`remove-${key}`)) {
        e.target.parentElement.remove();
      }
    });
  });

  // Generate social links HTML
  function generateSocialLinks(data) {
    const socialLinks = [];
    const socialStyles = {
      linkedin: { color: "#0077B5", title: "LinkedIn" },
      github: { color: "#333333", title: "GitHub" },
      instagram: { color: "#E4405F", title: "Instagram" },
      youtube: { color: "#FF0000", title: "YouTube" },
      twitter: { color: "#1DA1F2", title: "Twitter" },
      whatsapp: { color: "#25D366", title: "WhatsApp" }
    };

    Object.entries({
      linkedin: data.linkedin,
      github: data.github,
      instagram: data.instagram,
      youtube: data.youtube,
      twitter: data.twitter,
      whatsapp: data.whatsapp
    }).forEach(([platform, url]) => {
      if (url) {
        const finalUrl = platform === "whatsapp" ? 
          `https://wa.me/${url.replace(/\D/g, "")}` : url;

        socialLinks.push(`
          <a href="${finalUrl}" 
             target="_blank" 
             class="social-link"
             title="${socialStyles[platform].title}"
             style="color: ${socialStyles[platform].color}; font-size: 24px; margin: 0 10px;">
            <i class="fab fa-${platform}"></i>
          </a>
        `);
      }
    });

    return socialLinks.length ? 
      `<div class="social-links" style="margin: 20px 0 20px 0;">${socialLinks.join("")}</div>` : "";
  }

  // Form submission handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Gather form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      linkedin: document.getElementById("linkedin").value,
      github: document.getElementById("github").value,
      instagram: document.getElementById("instagram").value,
      youtube: document.getElementById("youtube").value,
      twitter: document.getElementById("twitter").value,
      whatsapp: document.getElementById("whatsapp").value,
      skills: document.getElementById("skills").value.split(",").map(skill => skill.trim()),
      
      // Gather education entries
      education: Array.from(document.querySelectorAll(".education-entry")).map(entry => ({
        degree: entry.querySelector(".degree").value,
        school: entry.querySelector(".school").value,
        gradYear: entry.querySelector(".grad-year").value
      })).filter(edu => edu.degree || edu.school || edu.gradYear),

      // Gather certificate entries
      certificates: Array.from(document.querySelectorAll(".certificate-entry")).map(entry => ({
        name: entry.querySelector(".cert-name").value,
        issuer: entry.querySelector(".cert-issuer").value,
        date: entry.querySelector(".cert-date").value
      })).filter(cert => cert.name || cert.issuer),

      // Gather experience entries
      experience: Array.from(document.querySelectorAll(".experience-entry")).map(entry => ({
        jobTitle: entry.querySelector(".job-title").value,
        company: entry.querySelector(".company").value,
        years: entry.querySelector(".years").value,
        jobDescription: entry.querySelector(".job-description").value
      })).filter(exp => exp.jobTitle || exp.company || exp.years || exp.jobDescription)
    };

    // Generate resume HTML
    resumeContent.innerHTML = `
      <div class="resume-header">
        <h2>${formData.name}</h2>
        <div class="contact-info">
          ${formData.email ? `<p><i class="fas fa-envelope"></i> ${formData.email}</p>` : ""}
          ${formData.phone ? `<p><i class="fas fa-phone"></i> ${formData.phone}</p>` : ""}
          ${formData.address ? `<p><i class="fas fa-map-marker-alt"></i> ${formData.address}</p>` : ""}
          ${generateSocialLinks(formData)}
        </div>
      </div>

      ${formData.education.length ? `
        <div class="section">
          <h3 class="section-title"><i class="fas fa-graduation-cap"></i> Education</h3>
          <div class="section-content">
            ${formData.education.map(edu => `
              <p><strong>${edu.degree}</strong> ${edu.school ? `from ${edu.school}` : ""} 
                 ${edu.gradYear ? `(Class of ${edu.gradYear})` : ""}</p>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${formData.experience.length ? `
        <div class="section">
          <h3 class="section-title"><i class="fas fa-briefcase"></i> Work Experience</h3>
          <div class="section-content">
            ${formData.experience.map(exp => `
              <div class="experience-item">
                <p><strong>${exp.jobTitle}</strong> ${exp.company ? `at ${exp.company}` : ""} 
                   ${exp.years ? `(${exp.years} years)` : ""}</p>
                ${exp.jobDescription ? `<p class="job-description">${exp.jobDescription}</p>` : ""}
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${formData.certificates.length ? `
        <div class="section">
          <h3 class="section-title"><i class="fas fa-certificate"></i> Certifications</h3>
          <div class="section-content">
            <ul class="certificates-list">
              ${formData.certificates.map(cert => `
                <li>
                  <strong>${cert.name}</strong> ${cert.issuer ? `- ${cert.issuer}` : ""}
                  ${cert.date ? `<span class="cert-date">(${new Date(cert.date).toLocaleDateString()})</span>` : ""}
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      ` : ""}

      ${formData.skills.length ? `
        <div class="section">
          <h3 class="section-title"><i class="fas fa-tools"></i> Skills</h3>
          <div class="section-content">
            <ul class="skills-list">
              ${formData.skills.map(skill => `<li class="skill-item">${skill}</li>`).join("")}
            </ul>
          </div>
        </div>
      ` : ""}
    `;

    // Save to localStorage and setup sharing
    const userName = formData.name.toLowerCase().replace(/\s+/g, "");
    const uniqueUrl = `review.html?username=${userName}`;
    localStorage.setItem(userName, JSON.stringify(formData));

    shareableLink.href = uniqueUrl;
    shareableLink.textContent = `Open Resume: ${uniqueUrl}`;
    shareableLink.style.display = "inline";
    copyLinkBtn.style.display = "inline-block";
  });

  // PDF download handler
  downloadBtn.addEventListener("click", () => {
    const opt = {
      margin: 1,
      filename: "Professional_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };
    html2pdf().from(resumeContent).set(opt).save();
  });
});