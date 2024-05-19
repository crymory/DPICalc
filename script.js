function calculateSensitivity() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const diagonal = parseFloat(document.getElementById('diagonal').value);
    const baseSensitivity = parseFloat(document.getElementById('baseSensitivity').value);
    const adjustment = document.getElementById('adjustment').value;

    if (!width || !height || !diagonal || !baseSensitivity || !adjustment) {
        alert("Пожалуйста, введите все значения.");
        return;
    }

    const diagonalPixels = Math.sqrt(width * width + height * height);
    const dpi = diagonalPixels / diagonal;

    let lowerSensitivity, higherSensitivity;

    if (adjustment === "increase") {
        lowerSensitivity = baseSensitivity;
        higherSensitivity = baseSensitivity * 2;
    } else {
        lowerSensitivity = baseSensitivity / 2;
        higherSensitivity = baseSensitivity;
    }

    const resultsBody = document.getElementById('resultsBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${lowerSensitivity.toFixed(2)}</td>
        <td>${baseSensitivity.toFixed(2)}</td>
        <td>${higherSensitivity.toFixed(2)}</td>
    `;

    resultsBody.appendChild(newRow);
}
