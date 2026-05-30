# 서버 스냅샷 (2026-05-30 19:55)

## 1. 시스템
```
PRETTY_NAME="Ubuntu 24.04.4 LTS"
kernel: 6.8.0-101-generic
CPU: 4코어 | up 13 weeks, 1 day, 7 hours, 3 minutes
               total        used        free      shared  buff/cache   available
Mem:            15Gi       729Mi        13Gi        27Mi       1.0Gi        14Gi
/dev/mapper/ubuntu--vg-ubuntu--lv  914G   17G  860G   2% /
```
## 2. 런타임/버전
```
node v20.20.2 / npm 10.8.2
nginx version: nginx/1.24.0 (Ubuntu)
psql (PostgreSQL) 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
pm2 6.0.14
```
## 3. 열린 포트(LISTEN)
```
Netid State  Recv-Q Send-Q      Local Address:Port Peer Address:PortProcess
tcp   LISTEN 0      511               0.0.0.0:443       0.0.0.0:*    users:(("nginx",pid=3080789,fd=5),("nginx",pid=3080788,fd=5),("nginx",pid=3080787,fd=5),("nginx",pid=3080786,fd=5),("nginx",pid=3080785,fd=5))
tcp   LISTEN 0      4096              0.0.0.0:22        0.0.0.0:*    users:(("sshd",pid=2579452,fd=5),("systemd",pid=1,fd=147))
tcp   LISTEN 0      511               0.0.0.0:80        0.0.0.0:*    users:(("nginx",pid=3080789,fd=7),("nginx",pid=3080788,fd=7),("nginx",pid=3080787,fd=7),("nginx",pid=3080786,fd=7),("nginx",pid=3080785,fd=7))
tcp   LISTEN 0      4096              0.0.0.0:1945      0.0.0.0:*    users:(("sshd",pid=2579452,fd=3),("systemd",pid=1,fd=145))
tcp   LISTEN 0      511             127.0.0.1:4000      0.0.0.0:*    users:(("node /home/kjj/",pid=3080751,fd=20))
tcp   LISTEN 0      200             127.0.0.1:5432      0.0.0.0:*    users:(("postgres",pid=3077321,fd=6))
tcp   LISTEN 0      4096        127.0.0.53%lo:53        0.0.0.0:*    users:(("systemd-resolve",pid=3019723,fd=15))
tcp   LISTEN 0      200           192.168.0.4:5432      0.0.0.0:*    users:(("postgres",pid=3077321,fd=7))
tcp   LISTEN 0      4096           127.0.0.54:53        0.0.0.0:*    users:(("systemd-resolve",pid=3019723,fd=17))
tcp   LISTEN 0      511                  [::]:443          [::]:*    users:(("nginx",pid=3080789,fd=6),("nginx",pid=3080788,fd=6),("nginx",pid=3080787,fd=6),("nginx",pid=3080786,fd=6),("nginx",pid=3080785,fd=6))
tcp   LISTEN 0      4096                 [::]:22           [::]:*    users:(("sshd",pid=2579452,fd=6),("systemd",pid=1,fd=148))
tcp   LISTEN 0      511                  [::]:80           [::]:*    users:(("nginx",pid=3080789,fd=8),("nginx",pid=3080788,fd=8),("nginx",pid=3080787,fd=8),("nginx",pid=3080786,fd=8),("nginx",pid=3080785,fd=8))
tcp   LISTEN 0      4096                 [::]:1945         [::]:*    users:(("sshd",pid=2579452,fd=4),("systemd",pid=1,fd=146))
```
## 4. 방화벽(UFW)
```
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), deny (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
80/tcp                     ALLOW IN    Anywhere
443/tcp                    ALLOW IN    Anywhere
22/tcp                     ALLOW IN    192.168.0.0/24
5432/tcp                   ALLOW IN    192.168.0.0/24
80/tcp (v6)                ALLOW IN    Anywhere (v6)
443/tcp (v6)               ALLOW IN    Anywhere (v6)

```
## 5. PM2
```
┌────┬─────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name            │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼─────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ auth-backend    │ default     │ 1.0.0   │ fork    │ 3080751  │ 13m    │ 26   │ online    │ 0%       │ 53.2mb   │ kjj      │ disabled │
└────┴─────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```
## 6. nginx 핵심 설정(경로/지시문만, 비밀 없음)
```
[enabled sites]
https-default.conf
redirect
add_header Cache-Control "public";
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options DENY;
add_header X-XSS-Protection "1; mode=block";
limit_req_status 429;
limit_req_zone $binary_remote_addr zone=my_ddos_limit:10m rate=5r/s;
limit_req zone=my_ddos_limit burst=100 nodelay;
listen      [::]:443 ssl http2;
listen      443 ssl http2;
listen [::]:80 default_server;
listen 80 default_server;
location / {
location /api/ {
location /assets/ {
location ~ \.(json|lock|map)$ {
location ~ /\.(?!well-known) {
proxy_pass http://127.0.0.1:4000;
root        /var/www/portfolio/frontend/react/dist;
server_name _;
server_name jongjinportfolio.com www.jongjinportfolio.com;
ssl_certificate     /etc/letsencrypt/live/jongjinportfolio.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/jongjinportfolio.com/privkey.pem;
try_files $uri $uri/ /index.html;
```
## 7. 인증서/자동갱신
```
  Certificate Name: jongjinportfolio.com
    Domains: jongjinportfolio.com www.jongjinportfolio.com
    Expiry Date: 2026-08-02 06:45:30+00:00 (VALID: 63 days)
Sat 2026-05-30 23:59:46 KST   4h 4min Sat 2026-05-30 09:02:50 KST       10h ago certbot.timer                  certbot.service
```
## 8. fail2ban(차단 IP 목록 제외)
```
Status for the jail: sshd
|- Filter
|  |- Currently failed: 0
|  |- Total failed:     0
|  `- File list:        /var/log/auth.log
`- Actions
   |- Currently banned: 0
   |- Total banned:     0
```
## 9. SSH 실효 설정(비밀 없음)
```
port 22
port 1945
permitrootlogin without-password
pubkeyauthentication yes
passwordauthentication no
```
## 10. 예약 작업(cron)
```
```
## 11. 부팅 자동기동
```
enabled
enabled
enabled
```