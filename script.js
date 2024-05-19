function calculatePSA() {
    let startingSensitivity = parseFloat(document.getElementById('startingSensitivity').value);
    if (isNaN(startingSensitivity) || startingSensitivity <= 0) {
        alert('Please enter a valid starting sensitivity.');
        return;
    }

    let results = [];
    let lower = startingSensitivity / 2;
    let upper = startingSensitivity * 2;

    for (let i = 0; i < 7; i++) {
        let mid = (lower + upper) / 2;
        results.push({
            iteration: i + 1,
            lower: lower.toFixed(2),
            mid: mid.toFixed(2),
            upper: upper.toFixed(2)
        });

        let userChoice = prompt(`Iteration ${i + 1}\nChoose:\n1. Lower (${lower.toFixed(2)})\n2. Mid (${mid.toFixed(2)})\n3. Upper (${upper.toFixed(2)})`);

        if (userChoice == '1') {
            upper = mid;
        } else if (userChoice == '3') {
            lower = mid;
        } else {
            lower = (lower + mid) / 2;
            upper = (mid + upper) / 2;
        }
    }

    displayResults(results);
}

function displayResults(results) {
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>PSA Calculation Results</h2>';
    let table = document.createElement('table');
    table.border = '1';
    let headerRow = table.insertRow();
    headerRow.insertCell().innerText = 'Iteration';
    headerRow.insertCell().innerText = 'Lower';
    headerRow.insertCell().innerText = 'Mid';
    headerRow.insertCell().innerText = 'Upper';

    results.forEach(result => {
        let row = table.insertRow();
        row.insertCell().innerText = result.iteration;
        row.insertCell().innerText = result.lower;
        row.insertCell().innerText = result.mid;
        row.insertCell().innerText = result.upper;
    });

    resultDiv.appendChild(table);
}
