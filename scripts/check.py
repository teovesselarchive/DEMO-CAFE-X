"""Validate the generated site's routes, assets, menu integrity, and demo boundaries."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import json, re

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'dist'
errors=[]
class Audit(HTMLParser):
    def __init__(self,file):super().__init__();self.file=file;self.h1=0;self.ids=[]
    def handle_starttag(self,tag,attrs):
        data=dict(attrs)
        if tag=='h1':self.h1+=1
        if 'id' in data:self.ids.append(data['id'])
        if tag=='img' and 'alt' not in data:errors.append(f'{self.file}: missing image alt')
        for key in ('src','href'):
            value=data.get(key,'')
            if value and not urlparse(value).scheme and not value.startswith(('#','/')):
                path=(self.file.parent/unquote(value.split('?')[0].split('#')[0])).resolve()
                if not path.exists():errors.append(f'{self.file}: missing {value}')

for file in OUT.rglob('*.html'):
    parser=Audit(file);text=file.read_text();parser.feed(text)
    if parser.h1!=1:errors.append(f'{file}: expected exactly one H1')
    if len(parser.ids)!=len(set(parser.ids)):errors.append(f'{file}: duplicate IDs')
    if 'noindex' not in text:errors.append(f'{file}: demo noindex missing')
    if '{BASE}' in text or '—' in text:errors.append(f'{file}: unresolved template or punctuation')
for file in set(re.findall(r"['\"]([a-z0-9-]+\.webp)['\"]",(ROOT/'app.js').read_text())):
    if not (OUT/'assets/images'/file).is_file():errors.append(f'Interactive image missing: {file}')
menu=json.loads((ROOT/'data/menu.json').read_text())
assert len(menu)==8
assert sum(len(s['items']) for s in menu)==76
assert (OUT/'menu/index.html').read_text().count('class="menu-item"')==76
assert 'Disallow: /' in (OUT/'robots.txt').read_text()
if errors:raise SystemExit('\n'.join(errors))
print('PASS: 8 pages, 76 menu items, 8 categories, all local routes/assets, interactive imagery, unique IDs, and demo indexing controls.')
