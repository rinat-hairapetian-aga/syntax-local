default:
	@echo Must specify rule


yarn-gatsby:
	make yarn-install
	yarn develop


	
gatsby-build:
	gatsby build 
	

gatsby-install:
	#https://yarnpkg.com/lang/en/docs/cli/install/
	npm install
	
yarn-add:
	# example: make yarn-add packages="vue-fullscreen"
	yarn add $(packages)
	
yarn-upgrade:
	# yarn upgrade packages="caniuse-lite"
	yarn upgrade $(packages)
	
# yarn-add-dependencies:
# 	yarn add vue-chartjs chart.js
# 	yarn add vue-gtm
# 	cd ./.vuepress && yarn add -D sass-loader node-sass
# 	cd ./.vuepress && yarn add axios vue-axios tabulator-tables vue-tabulator
# 	cd ./.vuepress && yarn add vuetify
# 	cd ./.vuepress && yarn add vue-youtube
	
yarn-remove-dependencies:
	yarn remove vuetify
	
	