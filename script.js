function calculateSettings() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const diagonal = parseFloat(document.getElementById('diagonal').value);
    const sensitivity = parseFloat(document.getElementById('sensitivity').value);

    if (!width || !height || !diagonal || !sensitivity) {
        alert("Пожалуйста, введите все значения.");
        return;
    }

    const diagonalPixels = Math.sqrt(width * width + height * height);
    const dpi = diagonalPixels / diagonal;
    const sensDPI = sensitivity * dpi;

    document.getElementById('resultDPI').innerText = `DPI: ${dpi.toFixed(2)}`;

    const resultsBody = document.getElementById('resultsBody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>${dpi.toFixed(2)}</td>
        <td>${sensitivity.toFixed(2)}</td>
        <td>${sensDPI.toFixed(2)}</td>
    `;

    resultsBody.appendChild(newRow);
}
