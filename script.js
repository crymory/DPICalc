function calculateDPI() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const diagonal = parseFloat(document.getElementById('diagonal').value);

    if (!width || !height || !diagonal) {
        alert("Пожалуйста, введите все значения.");
        return;
    }

    const diagonalPixels = Math.sqrt(width * width + height * height);
    const dpi = diagonalPixels / diagonal;

    document.getElementById('result').innerText = `DPI: ${dpi.toFixed(2)}`;
}
