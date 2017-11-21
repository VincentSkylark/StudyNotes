### Clone repo to server:
- ``` cd /var/www ```
- ``` git clone https://github.com/EmersonEcologics/ProductManagement-UI.git ```
- user name
- password

### install package
- ``` cd ProductManagement-UI ```
- check out the branch for the environment <br/>
``` git checkout {develop/qa/production} ```
- install npm modules <br/> 
``` npm install ```
- install bower modules, pick the latest packages <br/>
``` bower install ```
<br/> if root access is required run (sudo bower install --allow-root)

### start node server
- pm2 start {server_http.js, server_https.js}

### bug and issue:
- Error: "EACCES" <br/>
Solution: need sudo privileges 
- Error: "EADDRINUSE" <br/>
Solution: port 30000 is occupied, stop old pm2 task first

### update/ deploy
``` 
git checkout {develop/qa/production}
npm install
bower install
pm2 stop server_https
pm2 delete server_https
pm2 start server_https
```
restart nginx if necessary

### deploy new environment
create config_ENV.json
copy json to config.json 
replace object "config" from ./app/service/dataFactory.js <br/>
modify error redirect url from ./app.js as "{domain}/#/Error401"
