import os
import re

search_dirs = [
    r'd:\karyasiswa\resources\js\pages\Admin',
    r'd:\karyasiswa\resources\js\pages\Osis',
    r'd:\karyasiswa\resources\js\pages\Mading',
    r'd:\karyasiswa\resources\js\pages\Works'
]

# We need to replace:
# const handleSubmit = (e) => { ... e.preventDefault(); \n if (!window.confirm(...)) return; \n // rest of code \n };
# To:
# const handleSubmit = async (e) => { ... e.preventDefault(); \n const result = await Swal.fire({title: 'Sudah yakin?', text: 'Melanjutkan aksi ini?', icon: 'question', showCancelButton: true}); if (!result.isConfirmed) return; \n // rest of code \n };
# PLUS we need to insert `import Swal from 'sweetalert2';` at the top.

for d in search_dirs:
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith('.jsx') and f not in ('Index.jsx', 'Dashboard.jsx'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                if 'window.confirm("Sudah yakin? Melanjutkan aksi ini.")' in content:
                    # Replace window.confirm
                    new_content = content.replace(
                        'if (!window.confirm("Sudah yakin? Melanjutkan aksi ini.")) return;',
                        "const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });\n        if (!result.isConfirmed) return;"
                    )
                    
                    # Make function async if it's not already
                    new_content = re.sub(r'const handleSubmit = \(e\) =>\s*{', 'const handleSubmit = async (e) => {', new_content)
                    
                    # Add import if missing
                    if 'import Swal' not in new_content:
                        # Insert after first import
                        new_content = new_content.replace('import ', "import Swal from 'sweetalert2';\nimport ", 1)
                        
                    with open(path, 'w', encoding='utf-8') as out_file:
                        out_file.write(new_content)
                    print(f"Patched {path}")

