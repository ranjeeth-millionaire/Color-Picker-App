const colorInput = document.getElementById('colorInput');
const swatchLabel = document.querySelector('.swatch-label');
const swatch = document.getElementById('swatch');
const hexVal = document.getElementById('hexVal');
const rgbVal = document.getElementById('rgbVal');
const copyBtn = document.getElementById('copyBtn');
const btnText = document.getElementById('btnText');

// Trigger native color picker when label is clicked
swatchLabel.addEventListener('click', () => colorInput.click());

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function updateUI(hex) {
  const { r, g, b } = hexToRgb(hex);
  const upper = hex.toUpperCase();

  // Update text values
  hexVal.textContent = upper;
  rgbVal.textContent = `${r}, ${g}, ${b}`;

  // Update swatch
  swatch.style.background = hex;

  // Update page background
  document.body.style.background = hex;

  // Update button text
  if (!copyBtn.classList.contains('copied')) {
    btnText.textContent = `Copy  ${upper}`;
  }
}

colorInput.addEventListener('input', (e) => updateUI(e.target.value));

// Copy HEX to clipboard
copyBtn.addEventListener('click', () => {
  const hex = hexVal.textContent;
  navigator.clipboard.writeText(hex).then(() => {
    copyBtn.classList.add('copied');
    btnText.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      btnText.textContent = `Copy  ${hex}`;
    }, 2000);
  });
});

// Init with default color
updateUI(colorInput.value);
