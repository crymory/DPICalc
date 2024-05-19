document.addEventListener("DOMContentLoaded", () => {
    const iterationsDiv = document.getElementById("iterations");

    // Add iteration options dynamically
    for (let i = 1; i <= 7; i++) {
        const div = document.createElement("div");
        div.classList.add('iteration');
        div.style.display = i === 1 ? 'block' : 'none'; // Show only the first iteration initially
        div.innerHTML = `
            <label>Итерация ${i}:</label>
            <div>
                <input type="radio" id="iteration${i}Lower" name="iteration${i}" value="lower" required>
                <label for="iteration${i}Lower">Lower</label>
                <input type="radio" id="iteration${i}Higher" name="iteration${i}" value="higher">
                <label for="iteration${i}Higher">Higher</label>
            </div>
        `;
        iterationsDiv.appendChild(div);
    }
});

function calculateSensitivity() {
    const baseSensitivity = parseFloat(document.getElementById('baseSensitivity').value);
    const resultsBody = document.getElementById('resultsBody');
    const perfectSensitivity = document.getElementById('perfectSensitivity');
    resultsBody.innerHTML = ""; // Clear previous results
    let sensitivity = baseSensitivity;

    let lowerSensitivity, higherSensitivity;

    for (let i = 1; i <= 7; i++) {
        const iteration = document.querySelector(`input[name="iteration${i}"]:checked`).value;

        lowerSensitivity = sensitivity / 2;
        higherSensitivity = sensitivity * 1.5;

        if (iteration === "lower") {
            sensitivity = lowerSensitivity;
        } else {
            sensitivity = higherSensitivity;
        }

        const newRow = document.createElement('tr');
        newRow.classList.add('result-row');
        newRow.style.setProperty('--animation-delay', `${i * 0.5}s`);
        newRow.innerHTML = `
            <td>${lowerSensitivity.toFixed(2)}</td>
            <td>${sensitivity.toFixed(2)}</td>
            <td>${higherSensitivity.toFixed(2)}</td>
        `;
        resultsBody.appendChild(newRow);

        if (i < 7) {
            // Show the next iteration options
            const nextIterationDiv = document.querySelector(`.iteration:nth-child(${i + 1})`);
            nextIterationDiv.style.display = 'block';
        }
    }

    perfectSensitivity.textContent = `Perfect Sensitivity: ${sensitivity.toFixed(2)}`;
}
