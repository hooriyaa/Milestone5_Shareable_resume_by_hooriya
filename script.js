document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resume-form");
  const resumeContent = document.getElementById("resume-content");
  const shareableLink = document.getElementById("shareable-link");
  const copyLinkBtn = document.getElementById("copy-link-btn");
  const downloadBtn = document.getElementById("download-btn");
  const addCertificateBtn = document.getElementById("add-certificate");
  const certificatesContainer = document.getElementById(
    "certificates-container"
  );

  // Handle adding new certificate fields
  addCertificateBtn.addEventListener("click", () => {
    const certificateEntry = document.createElement("div");
    certificateEntry.className = "certificate-entry";
    certificateEntry.innerHTML = `
      <input type="text" class="cert-name" placeholder="Certificate Name" />
      <input type="text" class="cert-issuer" placeholder="Issuing Organization" />
      <input type="date" class="cert-date" />
      <button type="button" class="remove-cert">Remove</button>
    `;
    certificatesContainer.appendChild(certificateEntry);
  });

  // Handle removing certificate fields
  certificatesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-cert")) {
      e.target.parentElement.remove();
    }
  });

  function generateSocialLinks(data) {
    const socialLinks = [];
    const socialStyles = {
      linkedin: { color: "#0077B5", title: "LinkedIn" },
      github: { color: "#333333", title: "GitHub" },
      instagram: { color: "#E4405F", title: "Instagram" },
      youtube: { color: "#FF0000", title: "YouTube" },
      twitter: { color: "#1DA1F2", title: "Twitter" },
      whatsapp: { color: "#25D366", title: "WhatsApp" },
    };

    // Add CSS for social links if not already present
    if (!document.getElementById("social-links-style")) {
      const style = document.createElement("style");
      style.id = "social-links-style";
      style.textContent = `
    
        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 13px;
          margin-bottom: 13px;
          justify-content: start;
        }
        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .social-link i {
          font-size: 25px;
        }
        .social-link:hover {
          transform: translateY(-2px);
        }
      `;
      document.head.appendChild(style);
    }

    // Generate social media links with styling
    Object.entries({
      linkedin: data.linkedin,
      github: data.github,
      instagram: data.instagram,
      youtube: data.youtube,
      twitter: data.twitter,
      whatsapp: data.whatsapp,
    }).forEach(([platform, url]) => {
      if (url) {
        const finalUrl =
          platform === "whatsapp"
            ? `https://wa.me/${url.replace(/\D/g, "")}`
            : url;

        socialLinks.push(`
          <a href="${finalUrl}" 
             target="_blank" 
             class="social-link"
             title="${socialStyles[platform].title}"
             style="color: ${socialStyles[platform].color}; ">
            <i class="fab fa-${platform}"></i>
          </a>
        `);
      }
    });

    return socialLinks.length
      ? `<div class="social-links">${socialLinks.join("")}</div>`
      : "";
  }

  // Rest of your existing code...
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Gather certificates data
    const certificates = Array.from(
      document.querySelectorAll(".certificate-entry")
    )
      .map((entry) => ({
        name: entry.querySelector(".cert-name").value,
        issuer: entry.querySelector(".cert-issuer").value,
        date: entry.querySelector(".cert-date").value,
      }))
      .filter((cert) => cert.name && cert.issuer);

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
      degree: document.getElementById("degree").value,
      school: document.getElementById("school").value,
      gradYear: document.getElementById("gradYear").value,
      jobTitle: document.getElementById("jobTitle").value,
      company: document.getElementById("company").value,
      years: document.getElementById("years").value,
      jobDescription: document.getElementById("jobDescription").value,
      skills: document
        .getElementById("skills")
        .value.split(",")
        .map((skill) => skill.trim()),
      certificates: certificates,
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
      <div class="resume-header">
        <h2>${data.name}</h2>
        <div class="contact-info">
          ${
            data.email
              ? `<p><i class="fas fa-envelope"></i> ${data.email}</p>`
              : ""
          }
          ${
            data.phone
              ? `<p><i class="fas fa-phone"></i> ${data.phone}</p>`
              : ""
          }
          ${
            data.address
              ? `<p><i class="fas fa-map-marker-alt"></i> ${data.address}</p>`
              : ""
          }
          ${generateSocialLinks(data)}
        </div>
      </div>

      ${
        data.degree || data.school || data.gradYear
          ? `
        <div class="section">
          <h3 class="section-title" style="color: #133E87;"><i class="fas fa-graduation-cap"></i> Education</h3>
          <div class="section-content">
            <p><strong>${data.degree}</strong> ${
              data.school ? `from ${data.school}` : ""
            } ${data.gradYear ? `(Class of ${data.gradYear})` : ""}</p>
          </div>
        </div>
      `
          : ""
      }

      ${
        data.certificates.length
          ? `
        <div class="section">
          <h3 class="section-title" style="color: #133E87;"><i class="fas fa-certificate"></i> Certifications</h3>
          <div class="section-content">
            <ul class="certificates-list">
              ${data.certificates
                .map(
                  (cert) => `
                <li>
                  <strong>${cert.name}</strong> - ${cert.issuer}
                  ${
                    cert.date
                      ? `<span class="cert-date">(${new Date(
                          cert.date
                        ).toLocaleDateString()})</span>`
                      : ""
                  }
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </div>
      `
          : ""
      }

      ${
        data.jobTitle || data.company || data.years
          ? `
        <div class="section">
          <h3 class="section-title " style="color: #133E87;"><i class="fas fa-briefcase"></i> Work Experience</h3>
          <div class="section-content">
            <p><strong>${data.jobTitle}</strong> ${
              data.company ? `at ${data.company}` : ""
            } ${data.years ? `(${data.years} years)` : ""}</p>
            ${
              data.jobDescription
                ? `<p class="job-description">${data.jobDescription}</p>`
                : ""
            }
          </div>
        </div>
      `
          : ""
      }

      ${
        data.skills.length
          ? `
        <div class="section">
          <h3 class="section-title" style="color: #133E87;"><i class="fas fa-tools"></i> Skills</h3>
          <div class="section-content">
            <ul class="skills-list">
              ${data.skills
                .map((skill) => `<li class="skill-item">${skill}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
      `
          : ""
      }
    `;
  }

  downloadBtn.addEventListener("click", () => {
    const opt = {
      margin: 1,
      filename: "Professional_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(document.getElementById("resume")).set(opt).save();
  });
});
