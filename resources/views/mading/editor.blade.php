<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor Mading - Canva Style</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .editor-container { height: 100vh; overflow: hidden; }
        .toolbar { background: #f8f9fa; border-bottom: 1px solid #dee2e6; padding: 10px; }
        .canvas-area { background: #e9ecef; flex: 1; position: relative; overflow: auto; }
        .canvas { background: white; margin: 20px auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); position: relative; }
        .sidebar { width: 250px; background: #f8f9fa; border-right: 1px solid #dee2e6; }
        .element { position: absolute; cursor: move; border: 2px dashed transparent; }
        .element:hover, .element.selected { border-color: #007bff; }
        .resize-handle { width: 8px; height: 8px; background: #007bff; position: absolute; }
        .resize-handle.nw { top: -4px; left: -4px; cursor: nw-resize; }
        .resize-handle.ne { top: -4px; right: -4px; cursor: ne-resize; }
        .resize-handle.sw { bottom: -4px; left: -4px; cursor: sw-resize; }
        .resize-handle.se { bottom: -4px; right: -4px; cursor: se-resize; }
    </style>
</head>
<body>
    <div class="editor-container d-flex flex-column">
        <!-- Toolbar -->
        <div class="toolbar d-flex align-items-center gap-2">
            <button class="btn btn-outline-primary btn-sm" onclick="addText()">
                <i class="fas fa-font"></i> Text
            </button>
            <button class="btn btn-outline-primary btn-sm" onclick="addImage()">
                <i class="fas fa-image"></i> Image
            </button>
            <button class="btn btn-outline-primary btn-sm" onclick="addShape('rectangle')">
                <i class="fas fa-square"></i> Rectangle
            </button>
            <button class="btn btn-outline-primary btn-sm" onclick="addShape('circle')">
                <i class="fas fa-circle"></i> Circle
            </button>
            <div class="vr"></div>
            <input type="color" id="colorPicker" class="form-control form-control-sm" style="width: 50px;">
            <input type="range" id="fontSizeSlider" min="8" max="72" value="16" class="form-range" style="width: 100px;">
            <div class="vr"></div>
            <button class="btn btn-success btn-sm" onclick="saveDesign()">
                <i class="fas fa-save"></i> Save
            </button>
            <button class="btn btn-primary btn-sm" onclick="exportDesign()">
                <i class="fas fa-download"></i> Export
            </button>
        </div>

        <div class="d-flex flex-1">
            <!-- Sidebar -->
            <div class="sidebar p-3">
                <h6>Templates</h6>
                <div class="row g-2 mb-3">
                    <div class="col-6">
                        <div class="card template-card" onclick="loadTemplate('poster')" style="height: 80px; cursor: pointer;">
                            <div class="card-body p-1 text-center">
                                <small>Poster</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card template-card" onclick="loadTemplate('flyer')" style="height: 80px; cursor: pointer;">
                            <div class="card-body p-1 text-center">
                                <small>Flyer</small>
                            </div>
                        </div>
                    </div>
                </div>

                <h6>Properties</h6>
                <div id="properties-panel">
                    <p class="text-muted small">Select an element to edit properties</p>
                </div>
            </div>

            <!-- Canvas Area -->
            <div class="canvas-area d-flex">
                <div id="canvas" class="canvas" style="width: 800px; height: 600px;">
                    <!-- Elements will be added here -->
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        let selectedElement = null;
        let isDragging = false;
        let isResizing = false;
        let dragOffset = { x: 0, y: 0 };
        let elementCounter = 0;

        function addText() {
            const canvas = document.getElementById('canvas');
            const textElement = document.createElement('div');
            textElement.className = 'element text-element';
            textElement.style.left = '50px';
            textElement.style.top = '50px';
            textElement.style.fontSize = '16px';
            textElement.style.color = '#000000';
            textElement.contentEditable = true;
            textElement.innerHTML = 'Double click to edit';
            textElement.id = 'element-' + (++elementCounter);
            
            addElementHandlers(textElement);
            canvas.appendChild(textElement);
        }

        function addImage() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const canvas = document.getElementById('canvas');
                        const imgElement = document.createElement('img');
                        imgElement.className = 'element image-element';
                        imgElement.style.left = '50px';
                        imgElement.style.top = '50px';
                        imgElement.style.width = '200px';
                        imgElement.style.height = 'auto';
                        imgElement.src = e.target.result;
                        imgElement.id = 'element-' + (++elementCounter);
                        
                        addElementHandlers(imgElement);
                        canvas.appendChild(imgElement);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        }

        function addShape(type) {
            const canvas = document.getElementById('canvas');
            const shapeElement = document.createElement('div');
            shapeElement.className = 'element shape-element';
            shapeElement.style.left = '50px';
            shapeElement.style.top = '50px';
            shapeElement.style.width = '100px';
            shapeElement.style.height = '100px';
            shapeElement.style.backgroundColor = '#007bff';
            shapeElement.id = 'element-' + (++elementCounter);
            
            if (type === 'circle') {
                shapeElement.style.borderRadius = '50%';
            }
            
            addElementHandlers(shapeElement);
            canvas.appendChild(shapeElement);
        }

        function addElementHandlers(element) {
            element.addEventListener('mousedown', startDrag);
            element.addEventListener('click', selectElement);
            
            // Add resize handles
            const handles = ['nw', 'ne', 'sw', 'se'];
            handles.forEach(handle => {
                const resizeHandle = document.createElement('div');
                resizeHandle.className = `resize-handle ${handle}`;
                resizeHandle.addEventListener('mousedown', startResize);
                element.appendChild(resizeHandle);
            });
        }

        function selectElement(e) {
            e.stopPropagation();
            if (selectedElement) {
                selectedElement.classList.remove('selected');
            }
            selectedElement = e.target;
            selectedElement.classList.add('selected');
            updatePropertiesPanel();
        }

        function startDrag(e) {
            if (e.target.classList.contains('resize-handle')) return;
            isDragging = true;
            selectedElement = e.target;
            const rect = selectedElement.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        }

        function drag(e) {
            if (!isDragging || !selectedElement) return;
            const canvas = document.getElementById('canvas');
            const canvasRect = canvas.getBoundingClientRect();
            const x = e.clientX - canvasRect.left - dragOffset.x;
            const y = e.clientY - canvasRect.top - dragOffset.y;
            selectedElement.style.left = Math.max(0, x) + 'px';
            selectedElement.style.top = Math.max(0, y) + 'px';
        }

        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }

        function startResize(e) {
            e.stopPropagation();
            isResizing = true;
            // Resize logic would go here
        }

        function updatePropertiesPanel() {
            const panel = document.getElementById('properties-panel');
            if (!selectedElement) {
                panel.innerHTML = '<p class="text-muted small">Select an element to edit properties</p>';
                return;
            }

            let html = '<div class="mb-2">';
            html += '<label class="form-label small">Position X:</label>';
            html += `<input type="number" class="form-control form-control-sm" value="${parseInt(selectedElement.style.left)}" onchange="updateElementProperty('left', this.value + 'px')">`;
            html += '</div>';
            
            html += '<div class="mb-2">';
            html += '<label class="form-label small">Position Y:</label>';
            html += `<input type="number" class="form-control form-control-sm" value="${parseInt(selectedElement.style.top)}" onchange="updateElementProperty('top', this.value + 'px')">`;
            html += '</div>';

            if (selectedElement.classList.contains('text-element')) {
                html += '<div class="mb-2">';
                html += '<label class="form-label small">Font Size:</label>';
                html += `<input type="number" class="form-control form-control-sm" value="${parseInt(selectedElement.style.fontSize)}" onchange="updateElementProperty('fontSize', this.value + 'px')">`;
                html += '</div>';
                
                html += '<div class="mb-2">';
                html += '<label class="form-label small">Color:</label>';
                html += `<input type="color" class="form-control form-control-sm" value="${selectedElement.style.color || '#000000'}" onchange="updateElementProperty('color', this.value)">`;
                html += '</div>';
            }

            panel.innerHTML = html;
        }

        function updateElementProperty(property, value) {
            if (selectedElement) {
                selectedElement.style[property] = value;
            }
        }

        function saveDesign() {
            const canvas = document.getElementById('canvas');
            const designData = {
                elements: [],
                canvas: {
                    width: canvas.style.width,
                    height: canvas.style.height
                }
            };

            canvas.querySelectorAll('.element').forEach(element => {
                const elementData = {
                    id: element.id,
                    type: element.classList.contains('text-element') ? 'text' : 
                          element.classList.contains('image-element') ? 'image' : 'shape',
                    style: {
                        left: element.style.left,
                        top: element.style.top,
                        width: element.style.width,
                        height: element.style.height,
                        fontSize: element.style.fontSize,
                        color: element.style.color,
                        backgroundColor: element.style.backgroundColor,
                        borderRadius: element.style.borderRadius
                    },
                    content: element.innerHTML || element.src || ''
                };
                designData.elements.push(elementData);
            });

            // Save to localStorage or send to server
            localStorage.setItem('madingDesign', JSON.stringify(designData));
            alert('Design saved successfully!');
        }

        function exportDesign() {
            // Convert canvas to image and download
            html2canvas(document.getElementById('canvas')).then(canvas => {
                const link = document.createElement('a');
                link.download = 'mading-design.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        }

        function loadTemplate(type) {
            const canvas = document.getElementById('canvas');
            canvas.innerHTML = '';
            
            if (type === 'poster') {
                // Add default poster elements
                addText();
                addShape('rectangle');
            } else if (type === 'flyer') {
                // Add default flyer elements
                addText();
                addImage();
            }
        }

        // Click outside to deselect
        document.getElementById('canvas').addEventListener('click', function(e) {
            if (e.target === this) {
                if (selectedElement) {
                    selectedElement.classList.remove('selected');
                    selectedElement = null;
                    updatePropertiesPanel();
                }
            }
        });
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
</body>
</html>