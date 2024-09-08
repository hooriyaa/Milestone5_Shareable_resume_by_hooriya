// interface ResumeFormElements extends HTMLFormControlsCollection {
//   username: HTMLInputElement;
//   name: HTMLInputElement;
//   email: HTMLInputElement;
//   contactNo: HTMLInputElement;
//   education: HTMLTextAreaElement;
//   skills: HTMLTextAreaElement;
//   experience: HTMLTextAreaElement;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const resumeForm = document.getElementById("resumeForm") as HTMLFormElement | null;
//   const shareableLinkInput = document.getElementById("shareableLink") as HTMLInputElement | null;
//   const copyLinkButton = document.getElementById("copyLink") as HTMLButtonElement | null;
//   const outputElement = document.getElementById("resumeOutput") as HTMLElement | null;


//   if (resumeForm) {
//       resumeForm.addEventListener("submit", (event: Event) => {
//           event.preventDefault();

//           const formElements = resumeForm.elements as ResumeFormElements;

//           // Get form values
//           const name = formElements.name.value;
//           const email = formElements.email.value;
//           const contactNo = formElements.contactNo.value;
//           const education = formElements.education.value;
//           const experience = formElements.experience.value;
//           const skills = formElements.skills.value;
//           const username = formElements.username.value;

//           // Generate the unique URL
//           const baseURL = window.location.href.split('#')[0];
//           const uniqueURL = `${baseURL}#${username.replace(/\s+/g, '_')}`;

//           // Create the resume content
//           const resumeOutput = `
//               <h1>Resume</h1>
//               <p><b>Name:</b> ${name}</p>
//               <p><b>Email:</b> ${email}</p>
//               <p><b>Contact No:</b> ${contactNo}</p>
//               <h3>Education:</h3>
//               <p>${education}</p>
//               <h3>Experience:</h3>
//               <p>${experience}</p>
//               <h3>Skills:</h3>
//               <p>${skills}</p>
//           `;

//           // Display the resume output
//           if (outputElement) {
//               outputElement.innerHTML = resumeOutput;

//               const downloadLink = document.createElement('a');
//               downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
//               downloadLink.download = `${username.replace(/\s+/g, '_')}_cv.html`;
//               downloadLink.innerHTML = `<button type="button">Download Resume</button>`;
//               outputElement.appendChild(downloadLink);
//           }

//           // Display the shareable link
//           if (shareableLinkInput) {
//               shareableLinkInput.value = uniqueURL;
//           }

//           // Update the URL in the browser without reloading the page
//           window.history.replaceState({}, '', uniqueURL);
//       });
//   } else {
//       console.error("Form with id 'resumeForm' not found.");
//   }

//   if (copyLinkButton && shareableLinkInput) {
//       copyLinkButton.addEventListener("click", () => {
//           shareableLinkInput.select();
//           document.execCommand("copy");
//           alert("Link copied to clipboard!");
//       });
//   }

//   // Check if there's a hash in the URL to display the resume
//   const hash = window.location.hash.substring(1);
//   if (hash && outputElement) {
//       const decodedHash = decodeURIComponent(hash.replace(/_/g, ' '));

//       // Display the saved resume (mockup for this example)
//       outputElement.innerHTML = `<h1>Resume for ${decodedHash}</h1>
//       <p>Resume data would be fetched and displayed here for ${decodedHash}.</p>`;
//   }
// });

interface ResumeFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  name: HTMLInputElement;
  email: HTMLInputElement;
  contactNo: HTMLInputElement;
  education: HTMLTextAreaElement;
  skills: HTMLTextAreaElement;
  experience: HTMLTextAreaElement;
}

document.addEventListener("DOMContentLoaded", () => {
  const resumeForm = document.getElementById("resumeForm") as HTMLFormElement | null;
  const shareableLinkInput = document.getElementById("shareableLink") as HTMLInputElement | null;
  const copyLinkButton = document.getElementById("copyLink") as HTMLButtonElement | null;
  const outputElement = document.getElementById("resumeOutput") as HTMLElement | null;

  if (resumeForm) {
      resumeForm.addEventListener("submit", (event: Event) => {
          event.preventDefault();

          const formElements = resumeForm.elements as ResumeFormElements;

          // Get form values
          const name = formElements.name.value;
          const email = formElements.email.value;
          const contactNo = formElements.contactNo.value;
          const education = formElements.education.value;
          const experience = formElements.experience.value;
          const skills = formElements.skills.value;
          const username = formElements.username.value;

          //  the unique URL
          const baseURL = window.location.href.split('#')[0];
          const uniqueURL = `${baseURL}#${username.replace(/\s+/g, '_')}`;

          // the resume content
          const resumeOutput = `
              <h1>Resume</h1>
              <p><b>Name:</b> <span id="nameOutput">${name}</span></p>
              <p><b>Email:</b> <span id="emailOutput">${email}</span></p>
              <p><b>Contact No:</b> <span id="contactNoOutput">${contactNo}</span></p>
              <h3>Education:</h3>
              <p id="educationOutput">${education}</p>
              <h3>Experience:</h3>
              <p id="experienceOutput">${experience}</p>
              <h3>Skills:</h3>
              <p id="skillsOutput">${skills}</p>
              <button id="editButton">Edit</button>
              <button id="saveButton" style="display:none;">Save</button>
          `;

          // Display the resume output
          if (outputElement) {
              outputElement.innerHTML = resumeOutput;

              const downloadLink = document.createElement('a');
              downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
              downloadLink.download = `${username.replace(/\s+/g, '_')}_cv.html`;
              downloadLink.innerHTML = `<button type="button" style="padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; border: none; border-radius: 5px; cursor: pointer;">Download Your Crafted Resume</button>`;
              outputElement.appendChild(downloadLink);

              const editButton = document.getElementById("editButton");
              const saveButton = document.getElementById("saveButton");

              if (editButton && saveButton) {
                  editButton.addEventListener("click", function () {
                      // Make only specific elements editable
                      document.getElementById("nameOutput")?.setAttribute("contenteditable", "true");
                      document.getElementById("emailOutput")?.setAttribute("contenteditable", "true");
                      document.getElementById("contactNoOutput")?.setAttribute("contenteditable", "true");
                      document.getElementById("educationOutput")?.setAttribute("contenteditable", "true");
                      document.getElementById("experienceOutput")?.setAttribute("contenteditable", "true");
                      document.getElementById("skillsOutput")?.setAttribute("contenteditable", "true");

                      editButton.style.display = "none";
                      saveButton.style.display = "inline-block";
                  });

                  saveButton.addEventListener("click", function () {
                      const nameOutput = document.getElementById("nameOutput")?.innerText;
                      const emailOutput = document.getElementById("emailOutput")?.innerText;
                      const contactNoOutput = document.getElementById("contactNoOutput")?.innerText;
                      const educationOutput = document.getElementById("educationOutput")?.innerText;
                      const experienceOutput = document.getElementById("experienceOutput")?.innerText;
                      const skillsOutput = document.getElementById("skillsOutput")?.innerText;

                      if (formElements.name && nameOutput) formElements.name.value = nameOutput;
                      if (formElements.email && emailOutput) formElements.email.value = emailOutput;
                      if (formElements.contactNo && contactNoOutput) formElements.contactNo.value = contactNoOutput;
                      if (formElements.education && educationOutput) formElements.education.value = educationOutput;
                      if (formElements.experience && experienceOutput) formElements.experience.value = experienceOutput;
                      if (formElements.skills && skillsOutput) formElements.skills.value = skillsOutput;

                      // Make the elements non-editable again
                      document.getElementById("nameOutput")?.removeAttribute("contenteditable");
                      document.getElementById("emailOutput")?.removeAttribute("contenteditable");
                      document.getElementById("contactNoOutput")?.removeAttribute("contenteditable");
                      document.getElementById("educationOutput")?.removeAttribute("contenteditable");
                      document.getElementById("experienceOutput")?.removeAttribute("contenteditable");
                      document.getElementById("skillsOutput")?.removeAttribute("contenteditable");

                      editButton.style.display = "inline-block";
                      saveButton.style.display = "none";
                  });
              }
          }

          // Display the shareable link
          if (shareableLinkInput) {
              shareableLinkInput.value = uniqueURL;
          }

          // Update the URL in the browser without reloading the page
          window.history.replaceState({}, '', uniqueURL);
      });
  } else {
      console.error("Form with id 'resumeForm' not found.");
  }

  if (copyLinkButton && shareableLinkInput) {
      copyLinkButton.addEventListener("click", () => {
          shareableLinkInput.select();
          document.execCommand("copy");
          alert("Link copied to clipboard!");
      });
  }

  // Check if there's a hash in the URL to display the resume
  const hash = window.location.hash.substring(1);
  if (hash && outputElement) {
      const decodedHash = decodeURIComponent(hash.replace(/_/g, ' '));

      // Display the saved resume (mockup for this example)
      outputElement.innerHTML = `<h1>Resume for ${decodedHash}</h1>
      <p>displayed resume here for ${decodedHash}.</p>`;
  }
});
