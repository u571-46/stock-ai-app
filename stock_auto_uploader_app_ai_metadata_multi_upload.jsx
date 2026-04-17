<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Stock AI Simple</title>
  <style>
    body { font-family: Arial; padding: 15px; }
    input, textarea, button { width: 100%; margin-top: 10px; padding: 10px; }
    .card { border: 1px solid #ddd; padding: 10px; margin-top: 15px; border-radius: 10px; }
  </style>
</head>
<body>

<h2>Stock AI Uploader (HP Version)</h2>

<input type="file" id="fileInput" multiple />
<button onclick="generateAll()">Generate AI (Simple)</button>

<div id="output"></div>

<script>
let files = [];

const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');

fileInput.addEventListener('change', (e) => {
  files = Array.from(e.target.files);
  render();
});

function generateAI() {
  return {
    title: "Indonesian daily life urban activity",
    description: "Real life situation in Indonesia showing urban lifestyle and environment",
    keywords: "indonesia, urban, daily life, asia, lifestyle, city, real life, street"
  };
}

function generateAll() {
  files = files.map(file => ({ file, meta: generateAI() }));
  render(true);
}

function render(hasMeta = false) {
  output.innerHTML = "";

  files.forEach((item, i) => {
    const file = item.file || item;
    const meta = item.meta || { title: "", description: "", keywords: "" };

    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <b>${file.name}</b>
      <input value="${meta.title}" placeholder="Title" onchange="update(${i}, 'title', this.value)" />
      <textarea placeholder="Description" onchange="update(${i}, 'description', this.value)">${meta.description}</textarea>
      <textarea placeholder="Keywords" onchange="update(${i}, 'keywords', this.value)">${meta.keywords}</textarea>
      <button onclick="copy(${i})">Copy Metadata</button>
    `;

    output.appendChild(div);
  });
}

function update(index, field, value) {
  files[index].meta[field] = value;
}

function copy(index) {
  const m = files[index].meta;
  const text = `${m.title}\n${m.description}\n${m.keywords}`;
  navigator.clipboard.writeText(text);
  alert('Copied!');
}
</script>

</body>
</html>
