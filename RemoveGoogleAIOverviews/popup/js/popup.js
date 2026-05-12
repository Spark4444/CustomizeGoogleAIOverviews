// Variables
const checkboxes = document.querySelectorAll("#iosToggle");
// Retrieve the current options from Chrome storage
getFromChromeStorage("options", (value) => {
    value = checkIfAValueIsSet(value, {});

    checkboxes.forEach(checkbox => {
        const selector = checkbox.getAttribute("selector");
        checkbox.checked = !checkIfAValueIsSet(value[selector], false);
    });
});


// Go through each checkbox and add event listeners
checkboxes.forEach(checkbox => {
    // Add event listener to the checkbox to save the setting
    checkbox.addEventListener("input", () => {
        const isChecked = !checkbox.checked;
        const selector = checkbox.getAttribute("selector");

        // Check if the value in Chrome storage is different from the checkbox state and save it
        getFromChromeStorage("options", (value) => {
            value = checkIfAValueIsSet(value, {});
            const oldValue = checkIfAValueIsSet(value[selector], false);
            if (oldValue !== isChecked) {
                value[selector] = isChecked;
                saveToChromeStorage("options", value);
            }
        });
    });
});