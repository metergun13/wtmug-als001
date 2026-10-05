const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

/* ===========================
   GECE MODU
   =========================== */

const THEME_KEY = "mini-gorevler-theme";

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "🌙";
    }
}

// Kayıtlı temayı yükle (yoksa sistem tercihini kullan)
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme) {
    applyTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
}

// Butona tıklanınca temayı değiştir
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
});

/* ===========================
   GÖREV İŞLEMLERİ
   =========================== */

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const li = document.createElement("li");
    li.className = "task";

    const span = document.createElement("span");
    span.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
    deleteButton.className = "delete-button";

    span.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    deleteButton.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

/* ===========================
   SERVICE WORKER
   =========================== */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("service-worker.js")
            .then(() => {
                console.log("Service Worker kayıt edildi.");
            })
            .catch((error) => {
                console.error(
                    "Service Worker kayıt hatası:",
                    error
                );
            });

    });

}