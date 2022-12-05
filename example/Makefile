setup:
	watchman watch-del-all
	rm -rf ./node_modules
	yarn
	rm -rf ./ios/Pods
	rm -f ./ios/Podfile.lock
	arch -x86_64 pod install --project-directory='./ios/'
	arch -x86_64 npx react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios' --assets-dest='./ios'