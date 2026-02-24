const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_u3Yj1FhAQlNIm7A94qo6l2rtdWwRSDfeaYI7JqP5u4TrxDzDQwxGzCqPhZAG0tQf/exec";

const form = document.getElementById("ecoForm");
const button = form.querySelector("button");
const loader = form.querySelector(".loader");
const btnText = form.querySelector(".btn-text");
const success = form.querySelector(".success-message");

/* ===== Custom Select Logic ===== */

const selectBox = document.querySelector(".select-box");
const options = document.querySelector(".options");
const hiddenInput = document.querySelector("input[name='department']");

selectBox.addEventListener("click", () => {
    options.style.display = options.style.display === "block" ? "none" : "block";
});

options.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
        selectBox.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;
        options.style.display = "none";
    });
});

document.addEventListener("click", e => {
    if(!e.target.closest(".custom-select")){
        options.style.display = "none";
    }
});

/* ===== Form Submit ===== */

form.addEventListener("submit", e => {
    e.preventDefault();

    loader.style.display = "block";
    btnText.style.visibility = "hidden";
    success.style.display = "none";

    const data = new URLSearchParams(new FormData(form));

    fetch(SCRIPT_URL, {
        method: "POST",
        body: data
    })
    .then(() => {
        loader.style.display = "none";
        btnText.style.visibility = "visible";
        success.style.display = "block";
        form.reset();
        selectBox.textContent = "Select Department";
    })
    .catch(() => {
        loader.style.display = "none";
        btnText.style.visibility = "visible";
        alert("Connection error");
    });
});