const $ = id => document.getElementById(id);

const imageInput = $("imageInput");
const nameInput = $("name");
const jobInput = $("job");
const bioInput = $("bio");
const emailInput = $("email");
const phoneInput = $("phone");
const locationInput = $("location");
const skillsInput = $("skills");
const websiteInput = $("website");
const githubInput = $("github");
const linkedinInput = $("linkedin");
const instagramInput = $("instagram");
const colorInput = $("color");

const card = $("card");
const cardImage = $("cardImage");
const cardName = $("cardName");
const cardJob = $("cardJob");
const cardBio = $("cardBio");
const cardEmail = $("cardEmail");
const cardPhone = $("cardPhone");
const cardLocation = $("cardLocation");
const skillContainer = $("skillContainer");

const websiteLink = $("websiteLink");
const githubLink = $("githubLink");
const linkedinLink = $("linkedinLink");
const instagramLink = $("instagramLink");

const generateBtn = $("generateBtn");
const resetBtn = $("resetBtn");
const themeBtn = $("themeBtn");
const downloadPNG = $("downloadPNG");
const downloadPDF = $("downloadPDF");

const DEFAULT_IMAGE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23111'/%3E%3Ccircle cx='50' cy='38' r='16' fill='white'/%3E%3Cellipse cx='50' cy='85' rx='28' ry='22' fill='white'/%3E%3C/svg%3E`;
const DEFAULT_COLOR = "#4f46e5";

const inputs = [
    nameInput, jobInput, bioInput,
    emailInput, phoneInput, locationInput,
    skillsInput, websiteInput, githubInput,
    linkedinInput, instagramInput, colorInput
];

function toast(message) {
    let old = document.querySelector(".toast");
    if (old) old.remove();

    const div = document.createElement("div");
    div.className = "toast";
    div.textContent = message;
    document.body.appendChild(div);

    setTimeout(() => div.classList.add("show"), 50);
    setTimeout(() => {
        div.classList.remove("show");
        setTimeout(() => div.remove(), 300);
    }, 2500);
}

function animateCard() {
    card.animate(
        [{ transform: "scale(.96)", opacity: .7 }, { transform: "scale(1)", opacity: 1 }],
        { duration: 250, easing: "ease" }
    );
}

function createSkill(skill) {
    const span = document.createElement("span");
    span.textContent = skill;
    span.style.background = colorInput.value;
    span.style.opacity = "0";
    span.style.transform = "translateY(15px)";

    requestAnimationFrame(() => {
        span.style.transition = ".35s";
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
    });

    return span;
}

function updateSkills() {
    skillContainer.innerHTML = "";

    const skills = skillsInput.value
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

    const list = skills.length ? skills : ["HTML", "CSS", "JavaScript"];
    list.forEach(skill => skillContainer.appendChild(createSkill(skill)));
}

function updateLinks() {
    websiteLink.href = websiteInput.value || "#";
    githubLink.href = githubInput.value || "#";
    linkedinLink.href = linkedinInput.value || "#";
    instagramLink.href = instagramInput.value || "#";
}

function updateThemeColor() {
    const color = colorInput.value;

    document.querySelector(".top").style.background =
        `linear-gradient(135deg, ${color}, ${color}cc, ${color}99)`;

    document.querySelectorAll(".social a, .info i").forEach(el => {
        el.style.background = color;
    });

    document.querySelectorAll(".skills span").forEach(el => {
        el.style.background = color;
    });

    document.querySelector(".divider").style.background =
        `linear-gradient(90deg, ${color}, ${color}88)`;
}

function saveData() {
    const data = {
        name: nameInput.value,
        job: jobInput.value,
        bio: bioInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        location: locationInput.value,
        skills: skillsInput.value,
        website: websiteInput.value,
        github: githubInput.value,
        linkedin: linkedinInput.value,
        instagram: instagramInput.value,
        color: colorInput.value
    };

    localStorage.setItem("profile-card", JSON.stringify(data));
}

function loadData() {
    const saved = JSON.parse(localStorage.getItem("profile-card"));
    if (!saved) return;

    nameInput.value = saved.name || "";
    jobInput.value = saved.job || "";
    bioInput.value = saved.bio || "";
    emailInput.value = saved.email || "";
    phoneInput.value = saved.phone || "";
    locationInput.value = saved.location || "";
    skillsInput.value = saved.skills || "";
    websiteInput.value = saved.website || "";
    githubInput.value = saved.github || "";
    linkedinInput.value = saved.linkedin || "";
    instagramInput.value = saved.instagram || "";
    colorInput.value = saved.color || DEFAULT_COLOR;

    if (saved.image) {
        cardImage.src = saved.image;
        cardImage.style.display = "block";
    } else {
        cardImage.src = DEFAULT_IMAGE;
        cardImage.style.display = "block";
    }
}

function updateCard() {
    cardName.textContent = nameInput.value.trim() || "Your Name";
    cardJob.textContent = jobInput.value.trim() || "Frontend Developer";
    cardBio.textContent = bioInput.value.trim() || "Your bio will appear here...";
    cardEmail.textContent = emailInput.value.trim() || "example@email.com";
    cardPhone.textContent = phoneInput.value.trim() || "+92 300 0000000";
    cardLocation.textContent = locationInput.value.trim() || "Pakistan";

    updateSkills();
    updateLinks();
    updateThemeColor();
    animateCard();
    saveData();
}

function validate() {
    if (nameInput.value.trim() === "") {
        toast("Please enter your name.");
        nameInput.focus();
        return false;
    }

    if (emailInput.value.trim() !== "" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        toast("Invalid email address.");
        emailInput.focus();
        return false;
    }

    return true;
}

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        toast("Please select an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = e => {
        cardImage.src = e.target.result;
        cardImage.style.display = "block";
        animateCard();
        saveData();
        toast("Profile image updated.");
    };
    reader.readAsDataURL(file);
});

inputs.forEach(input => input.addEventListener("input", updateCard));

generateBtn.addEventListener("click", () => {
    if (!validate()) return;

    updateCard();
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    setTimeout(() => {
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Card";
        toast("Profile card generated!");
    }, 800);
});

resetBtn.addEventListener("click", () => {
    if (!confirm("Reset all profile information?")) return;

    document.querySelectorAll("input, textarea").forEach(input => {
        if (input.type === "color") input.value = DEFAULT_COLOR;
        else if (input.type === "file") input.value = "";
        else input.value = "";
    });

    cardImage.src = DEFAULT_IMAGE;
    cardImage.style.display = "block";
    localStorage.removeItem("profile-card");
    updateCard();
    toast("Profile reset.");
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    themeBtn.textContent = dark ? "☀ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("theme", dark ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀ Light Mode";
}

downloadPNG.addEventListener("click", async () => {
    try {
        downloadPNG.disabled = true;
        downloadPNG.textContent = "Downloading...";

        const canvas = await html2canvas(card, { scale: 2, useCORS: true });
        const link = document.createElement("a");
        link.download = "ProfileCard.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        toast("PNG downloaded.");
    } catch (error) {
        toast("Download failed.");
        console.error(error);
    } finally {
        downloadPNG.disabled = false;
        downloadPNG.textContent = "Download PNG";
    }
});

downloadPDF.addEventListener("click", async () => {
    try {
        downloadPDF.disabled = true;
        downloadPDF.textContent = "Generating PDF...";

        const canvas = await html2canvas(card, { scale: 2, useCORS: true });
        const img = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(img, "PNG", 10, 10, 190, 0);
        pdf.save("ProfileCard.pdf");
        toast("PDF downloaded.");
    } catch (error) {
        toast("PDF failed.");
        console.error(error);
    } finally {
        downloadPDF.disabled = false;
        downloadPDF.textContent = "Download PDF";
    }
});

card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = -(y - rect.height / 2) / 20;
    const rotateY = (x - rect.width / 2) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});

card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
});

document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        downloadPNG.click();
    }
});

cardImage.src = DEFAULT_IMAGE;
loadData();
updateCard();

window.addEventListener("load", () => {
    setTimeout(() => toast("Welcome back 👋"), 500);
});