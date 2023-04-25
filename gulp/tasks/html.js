import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import nunjucks from "gulp-nunjucks"

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.plugins.replace(/@img\//g, "img/"))
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)
		.pipe(nunjucks.compile())
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({
					"value": "%DT%",
					"append": {
						"key": "_v",
						"cover": 0,
						"to": [
							"css",
							"js"
						] 
					},
					"output": {
						"file": "gulp/version.json"
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
}