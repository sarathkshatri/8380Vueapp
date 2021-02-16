const path = require('path')

module.exports = {
	transpileDependencies: [
		/\bbootstrap-vue\b/
	],
	chainWebpack: config => {
		// Add "node_modules" alias
		config.resolve.alias
			.set('node_modules', path.join(__dirname, './node_modules'))

		// Disable "prefetch" plugin since it's not properly working in some browsers
		config.plugins
			.delete('prefetch')

		// Do not remove whitespaces
		config.module.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.whitespace = 'preserve'
				return options
			})
	}
}
