import urllib.request, urllib.error, json
url = 'http://localhost:8000/api/chat'
data = json.dumps({'user_id':'student-1','message':'Hello from test'}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type':'application/json'}, method='POST')
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        print('STATUS', resp.status)
        print(resp.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print('HTTP', e.code)
    print(e.read().decode('utf-8'))
except Exception as e:
    print('ERR', type(e).__name__, e)
