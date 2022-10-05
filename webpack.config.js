'use strict';

let path = require('path');

module.exports = {
	mode: 'production',
	entry: './js/script.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/js'
	},
	watch: true,

	devtool: "source-map",

	module: {			//  то какие модули будут исп-я
		rules: [		//  правила для опред файлов
			{
				test: /\.m?js$/,        						//  находим файлы js с помощью регулярного выражения
				exclude: /(node_modules|bower_components)/,		//  исключить файлы, т.е. не транспилировать
				use: {                          				//  как и что будет исп-я
					loader: 'babel-loader',						//  технология связывает webpack и babel (надо установить: npm i --save-dev babel-loader)
					options: {									//  настройки babel
						presets: [['@babel/preset-env', {		//  пресет(набор) настроек к-ые будут исп-я
								debug: true,
								corejs: 3,						//  библиотека полифиллов (надо установить: npm i --save-dev core-js)
								useBuiltIns: "usage"			//  интеллектуальный выбор полифиллов, исп-я только те, к-ые есть в проекте
						}]]
					}
				}
			}
		]
	}
};
