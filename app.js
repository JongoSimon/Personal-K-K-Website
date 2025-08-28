const carMakes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai', 'Kia'];

// Example: log all car makes
console.log('Available car makes:', carMakes);

document.addEventListener('DOMContentLoaded', function () {
    const vinForm = document.getElementById('vinForm');
    const vinInput = document.getElementById('vinInput');
    const vinResult = document.getElementById('vinResult');

    vinForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const vin = vinInput.value.trim();
        if (!vin) return;

        vinResult.innerHTML = 'Searching...';

        // Example API call (replace with your actual API key and endpoint)
        fetch(`https://vindecoder.eu/api/v1/decode/${vin}?apikey=demo`)
            .then(response => response.json())
            .then(data => {
                if (data && data.vehicle) {
                    const vehicle = data.vehicle;
                    vinResult.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${vehicle.make} ${vehicle.model}</h5>
                                <p><strong>Year:</strong> ${vehicle.year}</p>
                                <p><strong>Trim:</strong> ${vehicle.trim || 'N/A'}</p>
                                <p><strong>Engine:</strong> ${vehicle.engine || 'N/A'}</p>
                                <p><strong>Body Style:</strong> ${vehicle.body_style || 'N/A'}</p>
                                <p><strong>VIN:</strong> ${vin}</p>
                            </div>
                        </div>
                    `;
                } else {
                    vinResult.innerHTML = '<div class="alert alert-danger">No information found for this VIN.</div>';
                }
            })
            .catch(() => {
                vinResult.innerHTML = '<div class="alert alert-danger">Error fetching VIN data.</div>';
            });
    });
});