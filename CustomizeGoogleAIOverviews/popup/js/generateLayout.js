const toggles = document.querySelectorAll(".toggle");

// Generate the layout for each toggle
toggles.forEach(toggle => {
    const text = toggle.getAttribute("text");
    const selector = toggle.getAttribute("selector");

    for (const element of toggle.attributes) {
        if (element.name !== "class") {
            toggle.removeAttribute(element.name);
        }
    }

    toggle.innerHTML = `
        <div class="btnText">${text}</div>
        <label class="switch">
            <input class="iosToggle" type="checkbox" selector="${selector}">
            <div class="btn"></div>
        </label>
    `;
});