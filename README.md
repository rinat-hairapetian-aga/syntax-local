## Steps for deploy with wrangler
1. run npm clean install command: ```npm ci```
2. check wrangler version: ```wrangler --version```
3. make sure that you have latest version of wrangler, update if needed: ```npm install -g wrangler@latest```
4. build your project: ```gatsby build```
5. check project build result using: ```gatsby serve```
   1. also you can check project using wrangler command: ```wrangler pages dev ./public```
6. login to your cloudflare account through wrangler: ```wrangler login```
   1. you can check current wrangler login data using current command: ```wrangler whoami```
7. deploy your project: ```wrangler pages deploy ./public```
   1. select cloudflare account from list
   2. select to deploy to existing project (select "create new project" if you don't have one)

## Steps for development
1. run npm clean install command on first time: ```npm ci```
2. start gatsby development: ```gatsby develop```
3. after finish development run build command: ```gatsby build```
4. repeat steps 5-7 from wrangler deployment steps