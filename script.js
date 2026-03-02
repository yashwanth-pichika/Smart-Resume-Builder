const form = document.getElementById("resume-form");
const previewEl = document.getElementById("resume-preview");
const templateSelect = document.getElementById("template");
const clearButton = document.getElementById("btn-clear");
const downloadButton = document.getElementById("btn-download");

const state = {
  template: "classic",
  fullName: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  links: [],
  summary: "",
  experience: [],
  experienceHighlights: [],
  education: [],
  skills: [],
};

function normalizeLines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function normalizeList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function updateStateFromForm() {
  const data = new FormData(form);

  state.template = data.get("template") || "classic";
  state.fullName = data.get("fullName")?.trim() || "Your Name";
  state.headline = data.get("headline")?.trim() || "";
  state.email = data.get("email")?.trim() || "";
  state.phone = data.get("phone")?.trim() || "";
  state.location = data.get("location")?.trim() || "";
  state.links = normalizeList(data.get("links") || "");
  state.summary = data.get("summary")?.trim() || "";
  state.experience = normalizeLines(data.get("experience") || "");
  state.experienceHighlights = normalizeLines(data.get("experienceHighlights") || "");
  state.education = normalizeLines(data.get("education") || "");
  state.skills = normalizeList(data.get("skills") || "");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderClassic() {
  const metaParts = [];
  if (state.email) metaParts.push(escapeHtml(state.email));
  if (state.phone) metaParts.push(escapeHtml(state.phone));
  if (state.location) metaParts.push(escapeHtml(state.location));

  return `
    <div class="resume resume-classic">
      <header class="resume-header">
        <div class="resume-name">${escapeHtml(state.fullName)}</div>
        ${
          state.headline
            ? `<div class="resume-headline">${escapeHtml(state.headline)}</div>`
            : ""
        }
        ${
          metaParts.length
            ? `<div class="resume-meta">
                ${metaParts.map((m) => `<span>${m}</span>`).join("")}
              </div>`
            : ""
        }
        ${
          state.links.length
            ? `<div class="resume-links">
                ${state.links.map((link) => `<span>${escapeHtml(link)}</span>`).join("")}
              </div>`
            : ""
        }
      </header>

      ${
        state.summary
          ? `<section class="resume-section">
              <div class="resume-section-title">Summary</div>
              <div class="resume-summary">${escapeHtml(state.summary)}</div>
            </section>`
          : ""
      }

      ${
        state.experience.length || state.experienceHighlights.length
          ? `<section class="resume-section">
              <div class="resume-section-title">Experience</div>
              ${
                state.experience.length
                  ? `<ul class="resume-list">
                      ${state.experience
                        .map((line) => `<li>${escapeHtml(line)}</li>`)
                        .join("")}
                    </ul>`
                  : ""
              }
              ${
                state.experienceHighlights.length
                  ? `<ul class="resume-list">
                      ${state.experienceHighlights
                        .map((line) => `<li>${escapeHtml(line)}</li>`)
                        .join("")}
                    </ul>`
                  : ""
              }
            </section>`
          : ""
      }

      ${
        state.education.length
          ? `<section class="resume-section">
              <div class="resume-section-title">Education</div>
              <ul class="resume-list">
                ${state.education
                  .map((line) => `<li>${escapeHtml(line)}</li>`)
                  .join("")}
              </ul>
            </section>`
          : ""
      }

      ${
        state.skills.length
          ? `<section class="resume-section">
              <div class="resume-section-title">Skills</div>
              <div class="resume-tags">
                ${state.skills
                  .map((skill) => `<span class="resume-tag">${escapeHtml(skill)}</span>`)
                  .join("")}
              </div>
            </section>`
          : ""
      }
    </div>
  `;
}

function renderModern() {
  const metaParts = [];
  if (state.email) metaParts.push(escapeHtml(state.email));
  if (state.phone) metaParts.push(escapeHtml(state.phone));
  if (state.location) metaParts.push(escapeHtml(state.location));

  return `
    <div class="resume resume-modern">
      <div class="resume-modern-header">
        <div class="resume-name">${escapeHtml(state.fullName)}</div>
        ${
          state.headline
            ? `<div class="resume-headline">${escapeHtml(state.headline)}</div>`
            : ""
        }
        ${
          metaParts.length
            ? `<div class="resume-meta">
                ${metaParts.map((m) => `<span>${m}</span>`).join("")}
              </div>`
            : ""
        }
        ${
          state.links.length
            ? `<div class="resume-links">
                ${state.links.map((link) => `<span>${escapeHtml(link)}</span>`).join("")}
              </div>`
            : ""
        }
      </div>
      <div class="resume-modern-body">
        ${
          state.summary
            ? `<section class="resume-section">
                <div class="resume-section-title">Summary</div>
                <div class="resume-summary">${escapeHtml(state.summary)}</div>
              </section>`
            : ""
        }

        ${
          state.experience.length || state.experienceHighlights.length
            ? `<section class="resume-section">
                <div class="resume-section-title">Experience</div>
                ${
                  state.experience.length
                    ? `<ul class="resume-list">
                        ${state.experience
                          .map((line) => `<li>${escapeHtml(line)}</li>`)
                          .join("")}
                      </ul>`
                    : ""
                }
                ${
                  state.experienceHighlights.length
                    ? `<ul class="resume-list">
                        ${state.experienceHighlights
                          .map((line) => `<li>${escapeHtml(line)}</li>`)
                          .join("")}
                      </ul>`
                    : ""
                }
              </section>`
            : ""
        }

        ${
          state.education.length
            ? `<section class="resume-section">
                <div class="resume-section-title">Education</div>
                <ul class="resume-list">
                  ${state.education
                    .map((line) => `<li>${escapeHtml(line)}</li>`)
                    .join("")}
                </ul>
              </section>`
            : ""
        }

        ${
          state.skills.length
            ? `<section class="resume-section">
                <div class="resume-section-title">Skills</div>
                <div class="resume-tags">
                  ${state.skills
                    .map((skill) => `<span class="resume-tag">${escapeHtml(skill)}</span>`)
                    .join("")}
                </div>
              </section>`
            : ""
        }
      </div>
    </div>
  `;
}

function renderMinimal() {
  const metaParts = [];
  if (state.email) metaParts.push(escapeHtml(state.email));
  if (state.phone) metaParts.push(escapeHtml(state.phone));
  if (state.location) metaParts.push(escapeHtml(state.location));

  return `
    <div class="resume resume-minimal">
      <header class="resume-header">
        <div class="resume-name">${escapeHtml(state.fullName)}</div>
        ${
          state.headline
            ? `<div class="resume-headline">${escapeHtml(state.headline)}</div>`
            : ""
        }
        ${
          metaParts.length
            ? `<div class="resume-meta">
                ${metaParts.map((m) => `<span>${m}</span>`).join("")}
              </div>`
            : ""
        }
      </header>

      ${
        state.summary
          ? `<section class="resume-section">
              <div class="resume-section-title">Profile</div>
              <div class="resume-summary">${escapeHtml(state.summary)}</div>
            </section>`
          : ""
      }

      <div class="resume-body-grid">
        <div class="resume-main">
          ${
            state.experience.length || state.experienceHighlights.length
              ? `<section class="resume-section">
                  <div class="resume-section-title">Experience</div>
                  ${
                    state.experience.length
                      ? `<ul class="resume-list">
                          ${state.experience
                            .map((line) => `<li>${escapeHtml(line)}</li>`)
                            .join("")}
                        </ul>`
                      : ""
                  }
                  ${
                    state.experienceHighlights.length
                      ? `<ul class="resume-list">
                          ${state.experienceHighlights
                            .map((line) => `<li>${escapeHtml(line)}</li>`)
                            .join("")}
                        </ul>`
                      : ""
                  }
                </section>`
              : ""
          }

          ${
            state.education.length
              ? `<section class="resume-section">
                  <div class="resume-section-title">Education</div>
                  <ul class="resume-list">
                    ${state.education
                      .map((line) => `<li>${escapeHtml(line)}</li>`)
                      .join("")}
                  </ul>
                </section>`
              : ""
          }
        </div>
        <div class="resume-side">
          ${
            state.skills.length
              ? `<section class="resume-section">
                  <div class="resume-section-title">Skills</div>
                  <div class="resume-tags">
                    ${state.skills
                      .map(
                        (skill) => `<span class="resume-tag">${escapeHtml(skill)}</span>`
                      )
                      .join("")}
                  </div>
                </section>`
              : ""
          }

          ${
            state.links.length
              ? `<section class="resume-section">
                  <div class="resume-section-title">Links</div>
                  <ul class="resume-list">
                    ${state.links
                      .map((link) => `<li>${escapeHtml(link)}</li>`)
                      .join("")}
                  </ul>
                </section>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

function renderResume() {
  let html;
  switch (state.template) {
    case "modern":
      html = renderModern();
      break;
    case "minimal":
      html = renderMinimal();
      break;
    case "classic":
    default:
      html = renderClassic();
  }

  previewEl.innerHTML = html;
}

function handleInputChange() {
  updateStateFromForm();
  renderResume();
}

if (form) {
  form.addEventListener("input", handleInputChange);
  form.addEventListener("change", handleInputChange);
}

if (templateSelect) {
  templateSelect.addEventListener("change", handleInputChange);
}

if (clearButton) {
  clearButton.addEventListener("click", () => {
    form.reset();
    updateStateFromForm();
    renderResume();
  });
}

if (downloadButton) {
  downloadButton.addEventListener("click", () => {
    window.print();
  });
}

updateStateFromForm();
renderResume();

