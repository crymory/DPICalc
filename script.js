function calculateSensitivity() {
    const startingSensitivity = parseFloat(document.getElementById('startingSensitivity').value);
    const baseSensitivity = parseFloat(document.getElementById('baseSensitivity').value);
    const step = parseFloat(document.getElementById('step').value);
    const iterations = parseInt(document.getElementById('iterations').value);
    
    let lowerSensitivity = startingSensitivity;
    let higherSensitivity = startingSensitivity;
    
    const results = [];
    for (let i = 1; i <= iterations; i++) {
        const iteration = {
            lower: lowerSensitivity,
            base: baseSensitivity,
            higher: higherSensitivity
        };
        
        results.push(iteration);
        
        lowerSensitivity = calculateLowerSensitivity(baseSensitivity, step);
        higherSensitivity = calculateHigherSensitivity(baseSensitivity, step);
    }
    
    displayResults(results);
    
    return false;
}

function calculateLowerSensitivity(baseSensitivity, step) {
    return baseSensitivity - step;
}

function calculateHigherSensitivity(baseSensitivity, step) {
    return baseSensitivity + step;
}

function displayResults(results) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '';
    
    const table = document.createElement('table');
    table.borderCollapse = 'collapse';
    table.width = '100%';
    
    const headerRow = table.insertRow();
    const headerCells = ['Итерация', 'Lower', 'Base', 'Higher'];
    for (const cellText of headerCells) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = cellText;
    }
    
    for (const iteration of results) {
        const row = table.insertRow();
        const iterationCell = row.insertCell();
        iterationCell.textContent = iteration.lower;
        
        const baseCell = row.insertCell();
        baseCell.textContent = iteration.base;
        
        const higherCell = row.insertCell();
        higherCell.textContent = iteration.higher;
    }
    
    resultsElement.appendChild(table);
}
