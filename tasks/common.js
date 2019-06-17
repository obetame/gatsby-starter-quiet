const path = require('path');

exports.getLayoutConfig = (createPageConfig, layout) => {
	const defaultLayout = createPageConfig.posts;
	const targetLayout = Object.assign(
		{},
		defaultLayout,
		createPageConfig[layout]
	);

	return targetLayout;
};

/**
 * get component path
 * @param {*} createPageConfig
 * @param {*} layout
 * @param {*} type
 */
exports.getComponentPath = (createPageConfig, layout, type) => {
	const targetLayout = exports.getLayoutConfig(createPageConfig, layout);
	if (targetLayout[type]) {
		return path.resolve(`src/templates/${targetLayout[type]}`);
	}
	throw new Error(`can't find ${layout}:${type}`);
};

/**
 * convert url
 * url: '/posts/page/:page'
 * map: { page: 1 }
 * return '/posts/page/1'
 */
exports.fillParams = (url, map) =>
	url.replace(/:\w+/g, match => map[match.slice(1)]);

/**
 * get date in file path
 */
exports.formatDateForPath = filePath => {
	const fileArray = filePath.split('/');
	const fileName = fileArray[fileArray.length - 1];
	const [year, month, day] = fileName.split('-');

	const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	if (isNaN(Date.parse(date))) {
		throw new Error(`can't find date in file name`);
	}

	return date;
};
