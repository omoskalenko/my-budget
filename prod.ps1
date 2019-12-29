Remove-Item -Path '.\production\server' -Recurse

Copy-Item '.\server' -Destination '.\production'  -Recurse -Exclude 'server\node_modules'
Remove-Item -Path '.\production\server\node_modules' -Recurse

Copy-Item '.\build' -Destination '.\production\server\' -Recurse