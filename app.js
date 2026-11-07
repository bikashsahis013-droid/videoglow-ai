document.addEventListener('DOMContentLoaded', () => {
    const videoInput = document.getElementById('videoInput');
    const sourceVideo = document.getElementById('sourceVideo');
    const emptyPreview = document.getElementById('emptyPreview');
    const fileNameDiv = document.getElementById('fileName');
    const exportBtn = document.getElementById('exportBtn');
    const downloadLink = document.getElementById('downloadLink');
    const statusDiv = document.getElementById('status');

    // Filters and Sliders elements
    const filterButtons = document.querySelectorAll('.filter');
    const brightnessSlider = document.getElementById('brightness');
    const contrastSlider = document.getElementById('contrast');
    const saturationSlider = document.getElementById('saturation');
    
    const brightnessVal = document.getElementById('brightnessValue');
    const contrastVal = document.getElementById('contrastValue');
    const saturationVal = document.getElementById('saturationValue');

    let currentFilter = 'original';

    // 1. Handle Video Selection
    videoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            sourceVideo.src = videoURL;
            sourceVideo.style.display = 'block';
            emptyPreview.style.display = 'none';
            fileNameDiv.textContent = file.name;
            
            // Enable export/controls
            exportBtn.classList.remove('disabled');
            exportBtn.removeAttribute('disabled');
            statusDiv.textContent = 'Video loaded successfully! Adjust filters below.';
        }
    });

    // 2. Handle Filter Selection
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.getAttribute('data-filter');
            applyVideoStyles();
        });
    });

    // 3. Handle Sliders & Adjustments
    function applyVideoStyles() {
        let filterString = '';
        
        switch (currentFilter) {
            case 'natural': filterString = 'contrast(110%) saturate(120%)'; break;
            case 'cinematic': filterString = 'contrast(130%) brightness(90%) sepia(20%)'; break;
            case 'vivid': filterString = 'saturate(180%) contrast(120%)'; break;
            case 'vintage': filterString = 'sepia(50%) contrast(110%) brightness(95%)'; break;
            case 'mono': filterString = 'grayscale(100%)'; break;
            default: filterString = 'none'; break;
        }

        const bright = brightnessSlider ? brightnessSlider.value : 100;
        const contrast = contrastSlider ? contrastSlider.value : 100;
        const saturation = saturationSlider ? saturationSlider.value : 100;

        sourceVideo.style.filter = `${filterString} brightness(${bright}%) contrast(${contrast}%) saturate(${saturation}%)`;
    }

    if (brightnessSlider) {
        brightnessSlider.addEventListener('input', (e) => {
            brightnessVal.textContent = e.target.value + '%';
            applyVideoStyles();
        });
    }

    if (contrastSlider) {
        contrastSlider.addEventListener('input', (e) => {
            contrastVal.textContent = e.target.value + '%';
            applyVideoStyles();
        });
    }

    if (saturationSlider) {
        saturationSlider.addEventListener('input', (e) => {
            saturationVal.textContent = e.target.value + '%';
            applyVideoStyles();
        });
    }

    // 4. Handle Export Button Simulation
    exportBtn.addEventListener('click', () => {
        if (exportBtn.classList.contains('disabled')) return;
        
        statusDiv.textContent = 'Processing video preview...';
        setTimeout(() => {
            statusDiv.textContent = 'Ready! You can play or preview your styled video above.';
        }, 1500);
 
});
});
