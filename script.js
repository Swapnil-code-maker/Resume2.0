const modal = document.getElementById("modal");
const titleEl = document.getElementById("modalTitle");
const descEl = document.getElementById("modalDesc");
const techEl = document.getElementById("modalTech");
const imgEl = document.getElementById("modalImg");
const badgeEl = document.getElementById("verifiedBadge");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    renderCertificates(data.certificates);
    renderProjects(data.projects);
  });

function renderCertificates(certs) {
  const container = document.getElementById("certList");
  certs.forEach(c => {
    const li = document.createElement("li");
    li.className = "cert-item";
    li.style.cssText = "cursor: pointer; margin-bottom: 12px; list-style: none;";
    li.innerHTML = `<span style="color:#fbbf24">✦</span> <strong>${c.title}</strong> — ${c.org}`;
    li.onclick = () => openModal(c.title, `Verified certification issued by ${c.org}.`, "", c.image, true);
    container.appendChild(li);
  });
}

function renderProjects(projects) {
  const grid = document.getElementById("projectGrid");
  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><small style="color:#fbbf24">${p.tech}</small>`;
    card.onclick = () => openModal(p.title, p.desc, p.tech, "", false);
    grid.appendChild(card);
  });
}

function openModal(title, desc, tech, img, isCert) {
  titleEl.textContent = title;
  descEl.textContent = desc;
  techEl.innerHTML = tech ? `<strong>Built with:</strong> ${tech}` : "";
  badgeEl.style.display = isCert ? "inline-flex" : "none";
  imgEl.src = img || "";
  imgEl.parentElement.style.display = img ? "block" : "none";
  modal.classList.add("active");
}

document.getElementById("closeModal").onclick = () => modal.classList.remove("active");
modal.onclick = (e) => { if(e.target === modal) modal.classList.remove("active"); };