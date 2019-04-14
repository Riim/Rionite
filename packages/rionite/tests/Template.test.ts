import { NodeType, Template } from '../src/Template';

function fragmentToString(df: DocumentFragment): string {
	let el = document.createElement('div');
	el.appendChild(df.cloneNode(true));
	return el.innerHTML;
}

declare module '../src/Template' {
	/* tslint:disable-next-line */
	interface Template {
		renderToString(): string;
	}
}

Template.prototype.renderToString = function(): string {
	return fragmentToString(this.render());
};

Template.helpers.slot = el => {
	return [
		{
			nodeType: NodeType.ELEMENT,
			isHelper: false,
			tagName: 'rn-slot',
			is: null,
			names: el.names,
			attributes: el.attributes,
			content: el.content,
			contentTemplateIndex: null
		}
	];
};

describe('Template#parse', () => {
	test('элемент', () => {
		expect(
			new Template(`
				b {
					'text'
				}
			`).parse()
		).toMatchObject({
			nodeType: NodeType.BLOCK,
			elements: {
				'@root': {
					nodeType: NodeType.ELEMENT,
					isHelper: true,
					tagName: 'section',
					is: null,
					names: ['root'],
					attributes: null,
					content: [
						{
							nodeType: NodeType.ELEMENT,
							isHelper: false,
							tagName: 'b',
							is: null,
							names: null,
							attributes: null,
							content: [
								{
									nodeType: NodeType.TEXT,
									value: 'text'
								}
							],
							contentTemplateIndex: null
						}
					],
					contentTemplateIndex: null
				}
			}
		});
	});
	test('именованный элемент', () => {
		expect(
			new Template(`
				b/el1 {
					'text'
				}
			`).parse()
		).toMatchObject({
			nodeType: NodeType.BLOCK,
			elements: {
				'@root': {
					nodeType: NodeType.ELEMENT,
					isHelper: true,
					tagName: 'section',
					is: null,
					names: ['root'],
					attributes: null,
					content: [
						{
							nodeType: NodeType.ELEMENT_CALL,
							name: 'el1'
						}
					],
					contentTemplateIndex: null
				},
				el1: {
					nodeType: NodeType.ELEMENT,
					isHelper: false,
					tagName: 'b',
					is: null,
					names: ['el1'],
					attributes: null,
					content: [
						{
							nodeType: NodeType.TEXT,
							value: 'text'
						}
					],
					contentTemplateIndex: null
				}
			}
		});
	});
	test('встроенный шаблон', () => {
		let t1 = new Template(`
			template {
				'text'
			}
		`);
		expect(t1.parse()).toMatchObject({
			nodeType: NodeType.BLOCK,
			elements: {
				'@root': {
					nodeType: NodeType.ELEMENT,
					isHelper: true,
					tagName: 'section',
					is: null,
					names: ['root'],
					attributes: null,
					content: [
						{
							nodeType: NodeType.ELEMENT,
							tagName: 'template',
							is: null,
							names: null,
							attributes: null,
							content: [
								{
									nodeType: NodeType.TEXT,
									value: 'text'
								}
							],
							contentTemplateIndex: 0
						}
					],
					contentTemplateIndex: null
				}
			}
		});
		expect(t1._embeddedTemplates![0].parse()).toMatchObject({
			nodeType: NodeType.BLOCK,
			content: [
				{
					nodeType: NodeType.TEXT,
					value: 'text'
				}
			],
			elements: {}
		});
	});
});

describe('Template#render', () => {
	test('элемент', () => {
		expect(
			new Template(`
				b
			`).renderToString()
		).toBe('<b></b>');
	});

	test('элемент (2)', () => {
		expect(
			new Template(`
				b {
					'text'
				}
			`).renderToString()
		).toBe('<b>text</b>');
	});

	test('именованный элемент', () => {
		expect(
			new Template(
				`
					b/el1 {
						'text'
					}
				`,
				{ blockName: 'block1' }
			).renderToString()
		).toBe('<b class="block1__el1 ">text</b>');
	});

	test('именованный элемент (2)', () => {
		expect(
			new Template(
				`
					b/name1, name2 {
						'text'
					}
				`,
				{ blockName: 'block1' }
			).renderToString()
		).toBe('<b class="block1__name1 block1__name2 ">text</b>');
	});

	test('именованный элемент (3)', () => {
		expect(
			new Template(
				`
					b/, name1, name2
				`,
				{ blockName: 'block1' }
			).renderToString()
		).toBe('<b class="block1__name1 block1__name2 "></b>');
	});

	test('переопределение tagName элемента', () => {
		let t1 = new Template(
			`
				b/el1 {
					'text'
				}
				br
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						i/el1 {
							'text'
						}
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe('<i class="block1-x__el1 block1__el1 ">text</i><br>');
	});

	test('переопределение содержимого элемента', () => {
		let t1 = new Template(
			`
				b/el1 {
					'text'
				}
				br
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						b/el1 {
							'other text'
						}
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe('<b class="block1-x__el1 block1__el1 ">other text</b><br>');
	});

	test('наследование tagName элемента', () => {
		let t1 = new Template(
			`
				b/el1
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						/el1 {
							'text'
						}
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe('<b class="block1-x__el1 block1__el1 ">text</b>');
	});

	test('наследование tagName элемента (2)', () => {
		let t1 = new Template(
			`
				b/el1
			`,
			{ blockName: 'block1' }
		);

		let t2 = t1.extend('', { blockName: 'block1-x' });

		expect(
			t2
				.extend(
					`
						/el1 {
							'text'
						}
					`,
					{ blockName: 'block1-x-x' }
				)
				.renderToString()
		).toBe('<b class="block1-x-x__el1 block1-x__el1 block1__el1 ">text</b>');
	});

	test('наследование атрибутов элемента', () => {
		let t1 = new Template(
			`
				b/el1 (attr1=value1, attr2=value2)
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						/el1 (super!)
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe('<b attr1="value1" attr2="value2" class="block1-x__el1 block1__el1 "></b>');
	});

	test('доопределение атрибутов элемента', () => {
		let t1 = new Template(
			`
				b/el1 (attr1=value1, attr2=value2)
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						/el1 (super!, attr1=value0, attr3=value3)
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe(
			'<b attr1="value0" attr2="value2" attr3="value3" class="block1-x__el1 block1__el1 "></b>'
		);
	});

	test('наследование атрибута class', () => {
		let t1 = new Template(
			`
				b/el1 (class=_mod1)
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						/el1 (super!)
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe('<b class="block1-x__el1 block1__el1 _mod1"></b>');
	});

	test('наследование атрибута class (2)', () => {
		let t1 = new Template(
			`
				b/el1 (attr1=value1, attr2=value2)
			`,
			{ blockName: 'block1' }
		);

		let t2 = t1.extend('', { blockName: 'block1-x' });

		expect(
			t2
				.extend(
					`
						/el1 (super!)
					`,
					{ blockName: 'block1-x-x' }
				)
				.renderToString()
		).toBe(
			'<b attr1="value1" attr2="value2" class="block1-x-x__el1 block1-x__el1 block1__el1 "></b>'
		);
	});

	test('наследование атрибутов по имени', () => {
		let t1 = new Template(
			`
				b/el1 (class=_mod1, attr1=value1, attr2=value2)
				b/el2 (attr3=value3, attr4=value4)
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						/el1 (super.el2!, class=_mod2)
						/el2 (super.el1!, class=_mod1)
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe(
			'<b attr3="value3" attr4="value4" class="block1-x__el1 block1__el1 _mod2"></b><b class="block1-x__el2 block1__el2 _mod1" attr1="value1" attr2="value2"></b>'
		);
	});

	test('наследование содержимого элемента', () => {
		let t1 = new Template(
			`
				b/el1 {
					'text'
				}
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						u/el1 {
							b {
								super!
							}
						}
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe('<u class="block1-x__el1 block1__el1 "><b>text</b></u>');
	});

	test('наследование содержимого элемента (2)', () => {
		let t1 = new Template(
			`
				b/el1
				b/el2
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						i/el2 {
							super!
						}
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe(
			'<b class="block1-x__el1 block1__el1 "></b><i class="block1-x__el2 block1__el2 "></i>'
		);
	});

	test('наследование содержимого элемента (3)', () => {
		let t1 = new Template(
			`
				b/el1 {
					'text'
				}
			`,
			{ blockName: 'block1' }
		);

		let t2 = t1.extend('', { blockName: 'block1-x' });

		expect(
			t2
				.extend(
					`
						u/el1 {
							b {
								super!
							}
						}
					`,
					{ blockName: 'block1-x-x' }
				)
				.renderToString()
		).toBe('<u class="block1-x-x__el1 block1-x__el1 block1__el1 "><b>text</b></u>');
	});

	test('наследование содержимого элемента (3)', () => {
		let t1 = new Template(
			`
				b/el1 {
					'text'
				}
			`,
			{ blockName: 'block1' }
		);

		let t2 = t1.extend(
			`
				u/el1 {
					b {
						super!
					}
				}
			`,
			{ blockName: 'block1-x' }
		);

		expect(
			t2
				.extend(
					`
						s/el1 {
							u {
								super!
							}
						}
					`,
					{ blockName: 'block1-x-x' }
				)
				.renderToString()
		).toBe('<s class="block1-x-x__el1 block1-x__el1 block1__el1 "><u><b>text</b></u></s>');
	});

	test('наследование содержимого элемента по имени', () => {
		let t1 = new Template(
			`
				b/el1 {
					'text'
				}
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						u/el1 {
							b/el2 {
								super.el1!
							}
						}
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe(
			'<u class="block1-x__el1 block1__el1 "><b class="block1-x__el2 block1__el2 ">text</b></u>'
		);
	});

	test('комментарии в атрибутах', () => {
		expect(
			new Template(
				`
					b (/* comment */)
					b (attr1/* comment */=1)
					b (/* comment */attr1)
					b (attr1/* comment */, attr2)
					b (
						attr1, // comment
						/* comment */
						attr2=1
						// comment
					)
				`,
				{ blockName: 'block1' }
			).renderToString()
		).toBe(
			'<b></b><b attr1="1"></b><b attr1=""></b><b attr1="" attr2=""></b><b attr1="" attr2="1"></b>'
		);
	});

	test('helper', () => {
		Template.helpers.test = _el => {
			return [
				{ nodeType: NodeType.TEXT, value: '1' },
				{ nodeType: NodeType.TEXT, value: '2' },
				{ nodeType: NodeType.TEXT, value: '3' }
			];
		};

		expect(
			new Template(
				`
					b {
						@test
					}
				`,
				{ blockName: 'block1' }
			).renderToString()
		).toBe('<b>123</b>');
	});

	test('helper (2)', () => {
		Template.helpers.test = el => {
			return [
				{ nodeType: NodeType.TEXT, value: '[' },
				...el.content!,
				{ nodeType: NodeType.TEXT, value: ']' }
			];
		};

		expect(
			new Template(
				`
					b {
						@test {
							i
						}
					}
				`,
				{ blockName: 'block1' }
			).renderToString()
		).toBe('<b>[<i></i>]</b>');
	});

	test('доопределение атрибутов helper-а', () => {
		Template.helpers.test = el => {
			return [
				{
					nodeType: NodeType.ELEMENT,
					isHelper: false,
					tagName: 'b',
					is: null,
					names: el.names,
					attributes: el.attributes,
					content: el.content,
					contentTemplateIndex: null
				}
			];
		};

		let t1 = new Template(
			`
				@test/test (attr1=value1)
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						@/test (super!, attr2=value2)
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe('<b attr1="value1" attr2="value2" class="block1-x__test block1__test "></b>');
	});

	test('доопределение атрибутов и содержимого helper-а', () => {
		Template.helpers.test = el => {
			return [
				{
					nodeType: NodeType.ELEMENT,
					isHelper: false,
					tagName: 'b',
					is: null,
					names: el.names,
					attributes: el.attributes,
					content: el.content && [
						{
							nodeType: NodeType.ELEMENT,
							isHelper: false,
							tagName: 'u',
							is: null,
							names: null,
							attributes: null,
							content: el.content,
							contentTemplateIndex: null
						}
					],
					contentTemplateIndex: null
				}
			];
		};

		let t1 = new Template(
			`
				@test/test (attr1=value1) {
					'text'
				}
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						@/test (super!, attr2=value2) {
							s {
								super!
							}
						}
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe(
			'<b attr1="value1" attr2="value2" class="block1-x__test block1__test "><u><s><u>text</u></s></u></b>'
		);
	});

	test('доопределение содержимого helper-а по имени', () => {
		let t1 = new Template(
			`
				b
			`,
			{ blockName: 'block1' }
		);

		expect(
			t1
				.extend(
					`
						@/root {
							u {
								super!
							}
						}
					`,
					{ blockName: 'block1-x' }
				)
				.renderToString()
		).toBe('<u><b></b></u>');
	});

	test('экранированные последовательности', () => {
		expect(
			new Template(`
				'_\\t_\\x20_\\u0020_'
			`).renderToString()
		).toBe('_\t_\x20_\u0020_');
	});

	test('пустой шаблон', () => {
		expect(new Template('').renderToString()).toBe('');
	});

	test('встроенный шаблон', () => {
		let t1 = new Template(
			`
				template {
					'text'
				}
			`,
			{ blockName: 'block1' }
		);

		expect(t1.renderToString()).toBe('<template></template>');
		expect((t1.render().firstChild as any).contentTemplate.renderToString()).toBe('text');
	});

	test('встроенный шаблон (2)', () => {
		let t1 = new Template(
			`
				template {
					template {
						'text'
					}
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = (t1.render().firstChild as any).contentTemplate as Template;

		expect(t1.renderToString()).toBe('<template></template>');
		expect(t2.renderToString()).toBe('<template></template>');
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'text'
		);
	});

	test('встроенный шаблон (3)', () => {
		let t1 = new Template(
			`
				template {
					template {
						'text'
					}
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend('', { blockName: 'block1-x' });
		let t3 = (t2.render().firstChild as any).contentTemplate as Template;

		expect(t2.renderToString()).toBe('<template></template>');
		expect(t3.renderToString()).toBe('<template></template>');
		expect(((t3.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'text'
		);
	});

	test('переопределение содержимого элемента встроенного шаблона в текущем шаблоне', () => {
		let t1 = new Template(
			`
				template {
					div/el1 {
						'text1'
					}
				}

				div/el1 {
					'text2'
				}
			`,
			{ blockName: 'block1' }
		);

		expect(t1.renderToString()).toBe(
			'<template></template><div class="block1__el1 ">text2</div>'
		);
		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1__el1 ">text2</div>'
		);
	});

	test('переопределение содержимого встроенного шаблона', () => {
		let t1 = new Template(
			`
				template/template1 {
					'text'
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend(
			`
				/template1 {
					b {
						super!
					}
				}
			`,
			{ blockName: 'block1-x' }
		);

		expect(t1.renderToString()).toBe('<template class="block1__template1 "></template>');
		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'text'
		);
		expect(t2.renderToString()).toBe(
			'<template class="block1-x__template1 block1__template1 "></template>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<b>text</b>'
		);
	});

	test('наследование встроенного шаблона', () => {
		let t1 = new Template(
			`
				template/template1 {
					div/el1
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend('', { blockName: 'block1-x' });

		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1__el1 "></div>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1-x__el1 block1__el1 "></div>'
		);
	});

	test('переопределение содержимого элемента встроенного шаблона', () => {
		let t1 = new Template(
			`
				template/template1 {
					div/el1
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend(
			`
				/el1 {
					'text'
				}
			`,
			{ blockName: 'block1-x' }
		);

		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1__el1 "></div>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1-x__el1 block1__el1 ">text</div>'
		);
	});

	test('переопределение tagName элемента встроенного шаблона', () => {
		let t1 = new Template(
			`
				template {
					div/el1
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend(
			`
				span/el1 {
					'text'
				}
			`,
			{ blockName: 'block1-x' }
		);

		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1__el1 "></div>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<span class="block1-x__el1 block1__el1 ">text</span>'
		);
	});

	test('доопределение содержимого элемента встроенного шаблона', () => {
		let t1 = new Template(
			`
				template/template1 {
					div/el1 {
						'text'
					}
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend(
			`
				/el1 {
					span {
						super!
					}
				}
			`,
			{ blockName: 'block1-x' }
		);

		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1__el1 ">text</div>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1-x__el1 block1__el1 "><span>text</span></div>'
		);
	});

	test('доопределение содержимого элемента встроенного шаблона (2)', () => {
		let t1 = new Template(
			`
				template/template1 {
					div/el1 {
						'text'
					}
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend(
			`
				/el1 {
					span/el2 {
						super.el1!
					}
				}
			`,
			{ blockName: 'block1-x' }
		);

		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1__el1 ">text</div>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1-x__el1 block1__el1 "><span class="block1-x__el2 block1__el2 ">text</span></div>'
		);
	});

	test('доопределение содержимого элемента встроенного шаблона (3)', () => {
		let t1 = new Template(
			`
				template {
					div/el1 {
						'text'
					}
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend(
			`
				/el1 {
					span {
						super!
					}
				}
			`,
			{ blockName: 'block1-x' }
		);

		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1__el1 ">text</div>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1-x__el1 block1__el1 "><span>text</span></div>'
		);
	});

	test('доопределение содержимого элемента встроенного шаблона (4)', () => {
		let t1 = new Template(
			`
				template {
					div/el1 {
						'text'
					}
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend(
			`
				/el1 {
					span/el2 {
						super.el1!
					}
				}
			`,
			{ blockName: 'block1-x' }
		);

		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1__el1 ">text</div>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1-x__el1 block1__el1 "><span class="block1-x__el2 block1__el2 ">text</span></div>'
		);
	});

	test('доопределение атрибутов элемента встроенного шаблона', () => {
		let t1 = new Template(
			`
				template {
					div/el1 (attr1=value1)
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend(
			`
				/el1 (super!, attr1=value2)
			`,
			{ blockName: 'block1-x' }
		);

		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div attr1="value1" class="block1__el1 "></div>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div attr1="value2" class="block1-x__el1 block1__el1 "></div>'
		);
	});

	test('наследование helper-а', () => {
		let t1 = new Template(
			`
				@Slot/slot1 {
					div/el1
				}
			`,
			{ blockName: 'block1' }
		);
		let t2 = t1.extend('', { blockName: 'block1-x' });

		expect(t1.renderToString()).toBe('<rn-slot class="block1__slot1 "></rn-slot>');
		expect(((t1.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1__el1 "></div>'
		);
		expect(((t2.render().firstChild as any).contentTemplate as Template).renderToString()).toBe(
			'<div class="block1-x__el1 block1__el1 "></div>'
		);
	});
});
