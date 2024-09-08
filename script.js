// interface ResumeFormElements extends HTMLFormControlsCollection {
//   username: HTMLInputElement;
//   name: HTMLInputElement;
//   email: HTMLInputElement;
//   contactNo: HTMLInputElement;
//   education: HTMLTextAreaElement;
//   skills: HTMLTextAreaElement;
//   experience: HTMLTextAreaElement;
// }
document.addEventListener("DOMContentLoaded", function () {
    var resumeForm = document.getElementById("resumeForm");
    var shareableLinkInput = document.getElementById("shareableLink");
    var copyLinkButton = document.getElementById("copyLink");
    var outputElement = document.getElementById("resumeOutput");
    if (resumeForm) {
        resumeForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var formElements = resumeForm.elements;
            // Get form values
            var name = formElements.name.value;
            var email = formElements.email.value;
            var contactNo = formElements.contactNo.value;
            var education = formElements.education.value;
            var experience = formElements.experience.value;
            var skills = formElements.skills.value;
            var username = formElements.username.value;
            //  the unique URL
            var baseURL = window.location.href.split('#')[0];
            var uniqueURL = "".concat(baseURL, "#").concat(username.replace(/\s+/g, '_'));
            // the resume content
            var resumeOutput = "\n              <h1>Resume</h1>\n              <p><b>Name:</b> <span id=\"nameOutput\">".concat(name, "</span></p>\n              <p><b>Email:</b> <span id=\"emailOutput\">").concat(email, "</span></p>\n              <p><b>Contact No:</b> <span id=\"contactNoOutput\">").concat(contactNo, "</span></p>\n              <h3>Education:</h3>\n              <p id=\"educationOutput\">").concat(education, "</p>\n              <h3>Experience:</h3>\n              <p id=\"experienceOutput\">").concat(experience, "</p>\n              <h3>Skills:</h3>\n              <p id=\"skillsOutput\">").concat(skills, "</p>\n              <button id=\"editButton\">Edit</button>\n              <button id=\"saveButton\" style=\"display:none;\">Save</button>\n          ");
            // Display the resume output
            if (outputElement) {
                outputElement.innerHTML = resumeOutput;
                var downloadLink = document.createElement('a');
                downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
                downloadLink.download = "".concat(username.replace(/\s+/g, '_'), "_cv.html");
                downloadLink.innerHTML = "<button type=\"button\" style=\"padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; border: none; border-radius: 5px; cursor: pointer;\">Download Your Crafted Resume</button>";
                outputElement.appendChild(downloadLink);
                var editButton_1 = document.getElementById("editButton");
                var saveButton_1 = document.getElementById("saveButton");
                if (editButton_1 && saveButton_1) {
                    editButton_1.addEventListener("click", function () {
                        var _a, _b, _c, _d, _e, _f;
                        // Make only specific elements editable
                        (_a = document.getElementById("nameOutput")) === null || _a === void 0 ? void 0 : _a.setAttribute("contenteditable", "true");
                        (_b = document.getElementById("emailOutput")) === null || _b === void 0 ? void 0 : _b.setAttribute("contenteditable", "true");
                        (_c = document.getElementById("contactNoOutput")) === null || _c === void 0 ? void 0 : _c.setAttribute("contenteditable", "true");
                        (_d = document.getElementById("educationOutput")) === null || _d === void 0 ? void 0 : _d.setAttribute("contenteditable", "true");
                        (_e = document.getElementById("experienceOutput")) === null || _e === void 0 ? void 0 : _e.setAttribute("contenteditable", "true");
                        (_f = document.getElementById("skillsOutput")) === null || _f === void 0 ? void 0 : _f.setAttribute("contenteditable", "true");
                        editButton_1.style.display = "none";
                        saveButton_1.style.display = "inline-block";
                    });
                    saveButton_1.addEventListener("click", function () {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                        var nameOutput = (_a = document.getElementById("nameOutput")) === null || _a === void 0 ? void 0 : _a.innerText;
                        var emailOutput = (_b = document.getElementById("emailOutput")) === null || _b === void 0 ? void 0 : _b.innerText;
                        var contactNoOutput = (_c = document.getElementById("contactNoOutput")) === null || _c === void 0 ? void 0 : _c.innerText;
                        var educationOutput = (_d = document.getElementById("educationOutput")) === null || _d === void 0 ? void 0 : _d.innerText;
                        var experienceOutput = (_e = document.getElementById("experienceOutput")) === null || _e === void 0 ? void 0 : _e.innerText;
                        var skillsOutput = (_f = document.getElementById("skillsOutput")) === null || _f === void 0 ? void 0 : _f.innerText;
                        if (formElements.name && nameOutput)
                            formElements.name.value = nameOutput;
                        if (formElements.email && emailOutput)
                            formElements.email.value = emailOutput;
                        if (formElements.contactNo && contactNoOutput)
                            formElements.contactNo.value = contactNoOutput;
                        if (formElements.education && educationOutput)
                            formElements.education.value = educationOutput;
                        if (formElements.experience && experienceOutput)
                            formElements.experience.value = experienceOutput;
                        if (formElements.skills && skillsOutput)
                            formElements.skills.value = skillsOutput;
                        // Make the elements non-editable again
                        (_g = document.getElementById("nameOutput")) === null || _g === void 0 ? void 0 : _g.removeAttribute("contenteditable");
                        (_h = document.getElementById("emailOutput")) === null || _h === void 0 ? void 0 : _h.removeAttribute("contenteditable");
                        (_j = document.getElementById("contactNoOutput")) === null || _j === void 0 ? void 0 : _j.removeAttribute("contenteditable");
                        (_k = document.getElementById("educationOutput")) === null || _k === void 0 ? void 0 : _k.removeAttribute("contenteditable");
                        (_l = document.getElementById("experienceOutput")) === null || _l === void 0 ? void 0 : _l.removeAttribute("contenteditable");
                        (_m = document.getElementById("skillsOutput")) === null || _m === void 0 ? void 0 : _m.removeAttribute("contenteditable");
                        editButton_1.style.display = "inline-block";
                        saveButton_1.style.display = "none";
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
    }
    else {
        console.error("Form with id 'resumeForm' not found.");
    }
    if (copyLinkButton && shareableLinkInput) {
        copyLinkButton.addEventListener("click", function () {
            shareableLinkInput.select();
            document.execCommand("copy");
            alert("Link copied to clipboard!");
        });
    }
    // Check if there's a hash in the URL to display the resume
    var hash = window.location.hash.substring(1);
    if (hash && outputElement) {
        var decodedHash = decodeURIComponent(hash.replace(/_/g, ' '));
        // Display the saved resume (mockup for this example)
        outputElement.innerHTML = "<h1>Resume for ".concat(decodedHash, "</h1>\n      <p>displayed resume here for ").concat(decodedHash, ".</p>");
    }
});
