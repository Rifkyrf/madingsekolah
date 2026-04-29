import os
import glob
import re

search_dirs = [
    r'd:\karyasiswa\resources\js\pages\Works',
    r'd:\karyasiswa\resources\js\pages\Mading'
]

for d in search_dirs:
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith('.jsx') and f not in ('Index.jsx', 'Dashboard.jsx'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                if 'e.preventDefault();' in content and 'useForm' in content:
                    if 'window.confirm' not in content:
                        new_content = content.replace('e.preventDefault();', 'e.preventDefault();\n        if (!window.confirm("Sudah yakin? Melanjutkan aksi ini.")) return;')
                        with open(path, 'w', encoding='utf-8') as file:
                            file.write(new_content)
                        print(f"Updated {path}")
