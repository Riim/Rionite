const path = require('path');
const through = require('through2');
const Vinyl = require('vinyl');
const ts = require('typescript');
const nunjucks = require('nunjucks');
const gettextParser = require('gettext-parser');
const { NodeType, TemplateParser } = require('@riim/rionite-template-parser');
const templateWalk = require('@riim/rionite-template-walk');
const {
	TemplateNodeValueNodeType,
	TemplateNodeValueParser
} = require('@riim/rionite-template-node-value-parser');
const nunjucksWalk = require('@riim/nunjucks-walk');

const PLUGIN_NAME = 'gulp-rionite-localization';

const reLineBreak = /\n|\r\n?/;
const reComment = /\/\/ ?;;; ?(\S.*)/;
const reCommentValue = /^ ?;;; ?(\S.*)/;

module.exports = (options) => {
	// Plural forms:
	// http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms
	let languages = (options && options.languages) || [
		{
			code: 'en',
			pluralForms: 'nplurals=2; plural=(n != 1);'
		}
	];

	let existingPOFiles = new Map();
	let translations = {};

	let addTranslation = (msgctxt, msgid, extractedComment, referenceComment) => {
		let contextTranslations = translations[msgctxt] || (translations[msgctxt] = {});
		let translation = contextTranslations[msgid];

		if (translation) {
			let translationComments = translation.comments;

			if (extractedComment) {
				if (translationComments.extracted) {
					if (
						!`\n\n${translationComments.extracted}\n\n`.includes(
							`\n\n${extractedComment}\n\n`
						)
					) {
						translationComments.extracted =
							translationComments.extracted + '\n\n' + extractedComment;
					}
				} else {
					translationComments.extracted = extractedComment;
				}
			}

			translationComments.reference =
				(translationComments.reference ? translationComments.reference + '\n' : '') +
				referenceComment;
		} else {
			let comments = { reference: referenceComment };

			if (extractedComment) {
				comments.extracted = extractedComment;
			}

			translation = contextTranslations[msgid] = {
				msgctxt,
				msgid,
				msgstr: [''],
				comments
			};
		}
	};

	let onData = function (file, _encoding, cb) {
		let content = file.contents.toString();

		switch (path.extname(file.path)) {
			case '.po': {
				existingPOFiles.set(file.stem, file);
				break;
			}
			case '.ts': {
				let fileComments /* : { [lineNumber: number]: { value: string; afterLine: boolean } | undefined */;

				if (reComment.test(content)) {
					fileComments = { __proto__: null };

					let lines = content.split(reLineBreak);
					let lineIndex1 /* : number | undefined */;
					let lineIndex2 /* : number | undefined */;
					let prevAfterLine = false;

					for (let i = lines.length; i != 0; ) {
						let index;

						if ((index = lines[--i].search(reComment)) != -1) {
							let afterLine = !!lines[i].slice(0, index).trim();

							if (!prevAfterLine && !afterLine && lineIndex1 && i + 1 == lineIndex1) {
								fileComments[lineIndex2] = {
									value: RegExp.$1.trim() + '\n' + fileComments[lineIndex2].value,
									afterLine
								};
							} else {
								fileComments[i] = {
									value: RegExp.$1.trim(),
									afterLine
								};

								lineIndex2 = i;
							}

							lineIndex1 = i;
							prevAfterLine = afterLine;
						}
					}
				}

				let walk = (node) => {
					if (node.kind == ts.SyntaxKind.CallExpression) {
						let nodeExpr = node.expression;

						if (
							(nodeExpr.escapedText == 't' && node.arguments.length != 0) ||
							(nodeExpr.escapedText == 'pt' && node.arguments.length >= 2)
						) {
							let firstArg = node.arguments[0];

							if (firstArg.kind != ts.SyntaxKind.StringLiteral) {
								return;
							}

							let msgctxt = '';
							let msgid;

							if (nodeExpr.escapedText == 't') {
								msgid = firstArg.text;
							} else {
								let secondArg = node.arguments[1];

								if (secondArg.kind != ts.SyntaxKind.StringLiteral) {
									return;
								}

								msgctxt = firstArg.text;
								msgid = secondArg.text;
							}

							let lineIndex =
								content.slice(0, nodeExpr.end).split(reLineBreak).length - 1;

							addTranslation(
								msgctxt,
								msgid,
								fileComments &&
									(fileComments[lineIndex]
										? fileComments[lineIndex].value
										: fileComments[lineIndex - 1] &&
										  !fileComments[lineIndex - 1].afterLine &&
										  fileComments[lineIndex - 1].value),
								path.relative(process.cwd(), file.path).split(path.sep).join('/') +
									':' +
									lineIndex
							);
						}
					}

					ts.forEachChild(node, walk);
				};

				walk(ts.createSourceFile(file.path, content, ts.ScriptTarget.Latest, true));

				break;
			}
			case '.rnt': {
				let fileComments /* : Map<number, { value: string; afterLine: boolean }> | undefined */;
				let lines = content.split(reLineBreak);

				templateWalk.walk(new TemplateParser(content).parse(), {
					[NodeType.COMMENT](comment) {
						if (comment.multiline || !reCommentValue.test(comment.value)) {
							return;
						}

						if (!fileComments) {
							fileComments = new Map();
						}

						let line = lines[comment.line - 1];
						let afterLine = !!line.slice(0, line.indexOf('//')).trim();

						let prevLineComment;

						if (
							!afterLine &&
							(prevLineComment =
								fileComments && fileComments.get(comment.line - 1)) &&
							!prevLineComment.afterLine
						) {
							fileComments.delete(comment.line - 1);

							fileComments.set(comment.line, {
								value: prevLineComment.value + '\n' + RegExp.$1.trim(),
								afterLine
							});
						} else {
							fileComments.set(comment.line, {
								value: RegExp.$1.trim(),
								afterLine
							});
						}
					}
				});

				let handleNode = (node) => {
					let index = node.value.indexOf('{');

					if (index == -1) {
						return;
					}

					for (let valueNode of new TemplateNodeValueParser(node.value).parse(index)) {
						let formatter;

						if (
							!(
								valueNode.nodeType == TemplateNodeValueNodeType.BINDING &&
								valueNode.value &&
								(valueNode.value.charAt(0) == "'" ||
									valueNode.value.charAt(0) == '"') &&
								valueNode.formatters &&
								(formatter = valueNode.formatters.find(
									(formatter) => formatter.name == 't' || formatter.name == 'pt'
								))
							)
						) {
							continue;
						}

						let msgctxt = '';
						let msgid;

						if (formatter.name == 't') {
							msgid = valueNode.value.slice(1, -1);
						} else {
							let firstArg = formatter.arguments && formatter.arguments[0];

							if (firstArg.charAt(0) != "'" && firstArg.charAt(0) != '"') {
								continue;
							}

							msgctxt = firstArg.slice(1, -1);
							msgid = valueNode.value.slice(1, -1);
						}

						addTranslation(
							msgctxt,
							msgid,
							fileComments &&
								(fileComments.get(node.line)
									? fileComments.get(node.line).value
									: fileComments.get(node.line - 1) &&
									  fileComments.get(node.line - 1).value),
							path.relative(process.cwd(), file.path).split(path.sep).join('/') +
								':' +
								node.line
						);
					}
				};

				templateWalk.walk(new TemplateParser(content).parse(), {
					[NodeType.ELEMENT_ATTRIBUTE]: handleNode,
					[NodeType.TEXT]: handleNode
				});

				break;
			}
			case '.njk': {
				let ast = nunjucks.parser.parse(content);

				nunjucksWalk.walk(ast, (node) => {
					if (node.name?.value === 't') {
						addTranslation(
							'',
							node.args.children[0].value,
							null,
							path.relative(process.cwd(), file.path).split(path.sep).join('/') +
								':' +
								node.args.children[0].lineno
						);
					}
				});

				break;
			}
		}

		cb();
	};

	let poStream = through.obj();
	let jsonStream = through.obj();

	let onEnd = function (cb) {
		if (translations.length == 0) {
			poStream.push(null);
			jsonStream.push(null);
			cb();
			return;
		}

		for (let language of languages) {
			let poData;
			let stats = {
				notUsedAndNotTranslatedCount: 0,
				notUsedAndTranslated: [],
				usedAndNoTranslatedCount: 0
			};

			if (existingPOFiles.has(language.code)) {
				poData = gettextParser.po.parse(
					existingPOFiles.get(language.code).contents.toString()
				);

				for (let msgctxt of Object.keys(poData.translations)) {
					let contextTranslations = poData.translations[msgctxt];

					for (let msgid of Object.keys(contextTranslations)) {
						let translationComments = contextTranslations[msgid].comments;

						if (translationComments) {
							translationComments.extracted = '';
							translationComments.reference = '';
						}
					}
				}
			} else {
				poData = {
					charset: 'utf-8',

					headers: {
						'project-id-version': '',
						'language-team': '',
						'content-type': 'text/plain; charset=utf-8',
						'pot-creation-date': new Date()
							.toISOString()
							.replace('T', ' ')
							.replace(/:\d{2}.\d{3}Z/, '+0000'),
						'po-revision-date': '',
						'last-translator': '',
						language: language.code,
						'plural-forms': language.pluralForms,
						'mime-version': '1.0',
						'content-transfer-encoding': '8bit'
					},

					translations: {}
				};

				poData.headers['po-revision-date'] = poData.headers['pot-creation-date'];
			}

			for (let msgctxt of Object.keys(translations)) {
				let contextTranslations = translations[msgctxt];

				for (let msgid of Object.keys(contextTranslations)) {
					let translation = contextTranslations[msgid];

					if (
						(poData.translations[msgctxt] || (poData.translations[msgctxt] = {}))[msgid]
					) {
						let poTranslationComments =
							poData.translations[msgctxt][msgid].comments ||
							(poData.translations[msgctxt][msgid].comments = {});

						poTranslationComments.extracted = translation.comments.extracted;
						poTranslationComments.reference = translation.comments.reference;
					} else {
						poData.translations[msgctxt][msgid] = translation;
					}
				}
			}

			// удалить не используемые и без перевода
			for (let msgctxt of Object.keys(poData.translations)) {
				let contextTranslations = poData.translations[msgctxt];

				for (let msgid of Object.keys(contextTranslations)) {
					if (
						!(contextTranslations[msgid].comments || {}).reference &&
						!contextTranslations[msgid].msgstr[0]
					) {
						delete contextTranslations[msgid];
						stats.notUsedAndNotTranslatedCount++;
					}
				}
			}

			poData.translations = Object.keys(poData.translations)
				.sort()
				.reduce((translations, msgctxt) => {
					translations[msgctxt] = Object.keys(poData.translations[msgctxt])
						.sort()
						.reduce((contextTranslations, msgid) => {
							let translationComments = (contextTranslations[msgid] =
								poData.translations[msgctxt][msgid]).comments;

							if (translationComments) {
								translationComments.extracted = (
									translationComments.extracted || ''
								)
									.split('\n\n')
									.sort()
									.join('\n\n');
								translationComments.reference = (
									translationComments.reference || ''
								)
									.split('\n')
									.sort()
									.join('\n');
							}

							return contextTranslations;
						}, {});

					return translations;
				}, {});

			// fs.writeFileSync(poFilePath, gettextParser.po.compile(poData), 'utf8');

			let poFile = new Vinyl({
				path: language.code + '.po',
				contents: new Buffer(gettextParser.po.compile(poData))
			});
			this.push(poFile);
			poStream.push(poFile);
			poStream.push(null);

			let json = {
				localeSettings: {
					code: language.code,
					plural: language.pluralForms
				},
				translations: Object.keys(poData.translations).reduce((translations, msgctxt) => {
					translations[msgctxt] = Object.keys(poData.translations[msgctxt]).reduce(
						(contextTranslations, msgid) => {
							let referenceComment = (
								poData.translations[msgctxt][msgid].comments || {}
							).reference;

							if (referenceComment && poData.translations[msgctxt][msgid].msgstr[0]) {
								contextTranslations[msgid] =
									poData.translations[msgctxt][msgid].msgstr[0];
							} else if (referenceComment) {
								stats.usedAndNoTranslatedCount++;
							} else if (msgid) {
								stats.notUsedAndTranslated.push(
									poData.translations[msgctxt][msgid]
								);
							}

							return contextTranslations;
						},
						{}
					);

					return translations;
				}, {})
			};

			// fs.writeFileSync(
			// 	path.join(__dirname, `../../localization/${language.code}.json`),
			// 	JSON.stringify(json),
			// 	'utf8'
			// );
			// fs.writeFileSync(
			// 	path.join(
			// 		makeDir.sync(path.join(__dirname, '../../dist/public/localization')),
			// 		language.code + '.json'
			// 	),
			// 	JSON.stringify(json),
			// 	'utf8'
			// );

			let jsonFile = new Vinyl({
				path: language.code + '.json',
				contents: new Buffer(JSON.stringify(json))
			});
			this.push(jsonFile);
			jsonStream.push(jsonFile);
			jsonStream.push(null);

			console.log(`
Используются, не переведены - ${stats.usedAndNoTranslatedCount}
Не используются, переведены - ${stats.notUsedAndTranslated.length}: ${JSON.stringify(
				stats.notUsedAndTranslated
			)}
Не используются, не переведены (удалены) - ${stats.notUsedAndNotTranslatedCount}
`);
		}

		cb();
	};

	let resultStream = through.obj(onData, onEnd);
	resultStream.po = poStream;
	resultStream.json = jsonStream;
	return resultStream;
};
