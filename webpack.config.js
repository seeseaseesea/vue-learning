var path = require('path')
module.exports = {
    entry: './src/main.js',
     output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/, loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false',
                exclude: /node_modules/
            },
	    {test: /\.scss$/, loader: "style!css!sass"},
	    {test: /\.(jpg|png)$/, loader: "url?limit=8192"}
         ]
    }

}
