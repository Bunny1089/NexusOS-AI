import urllib.request, urllib.error
url = 'http://127.0.0.1:8000/api/chat'
headers = {
    'Origin': 'http://localhost:3000',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'content-type'
}
req = urllib.request.Request(url, method='OPTIONS', headers=headers)
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        print('STATUS', resp.status)
        for k, v in resp.getheaders():
            if k.lower().startswith('access-control'):
                print(f'{k}: {v}')
except urllib.error.HTTPError as e:
    print('HTTP', e.code)
    for k, v in e.headers.items():
        if k.lower().startswith('access-control'):
            print(f'{k}: {v}')
    print(e.read().decode('utf-8', 'ignore'))
except Exception as e:
    print('ERR', type(e).__name__, e)
