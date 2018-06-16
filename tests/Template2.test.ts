import { NodeType } from 'nelm-parser';
import { Template } from '../src/Template2';

let origRender = Template.prototype.render;

Template.prototype.render = function() {
	let el = document.createElement('div');
	el.appendChild(origRender.call(this));
	return el.innerHTML;
} as any;

describe.skip('Template2', () => {
	test('simple template', () => {
		expect(
			new Template(`
				#block1
				b {
					'text'
				}
			`).render()
		).toBe('<b>text</b>');
	});

	test('element name', () => {
		expect(
			new Template(`
				#block1
				b/el1 {
					'text'
				}
			`).render()
		).toBe('<b class="block1__el1">text</b>');
	});

	test('multiple element names', () => {
		expect(
			new Template(`
				#block1
				b/name1, name2
			`).render()
		).toBe('<b class="block1__name1 block1__name2"></b>');
	});

	test('multiple element names (2)', () => {
		expect(
			new Template(`
				#block1
				b/, name1, name2
			`).render()
		).toBe('<b class="block1__name1 block1__name2"></b>');
	});

	test('override element tagName', () => {
		let t1 = new Template(`
			#block1
			b/el1 {
				'text'
			}
			br
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						i/el1 {
							'text'
						}
					`
				)
				.render()
		).toBe('<i class="block1-x__el1 block1__el1">text</i><br>');
	});

	test('override element content', () => {
		let t1 = new Template(`
			#block1
			b/el1 {
				'text'
			}
			br
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						b/el1 {
							'other text'
						}
					`
				)
				.render()
		).toBe('<b class="block1-x__el1 block1__el1">other text</b><br>');
	});

	test('tagName super', () => {
		let t1 = new Template(`
			#block1
			b/el1
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						/el1 {
							'text'
						}
					`
				)
				.render()
		).toBe('<b class="block1-x__el1 block1__el1">text</b>');
	});

	test('tagName super super', () => {
		let t1 = new Template(`
			#block1
			b/el1
		`);

		let t2 = t1.extend('#block1-x');

		expect(
			t2
				.extend(
					`
						#block1-x-x
						/el1 {
							'text'
						}
					`
				)
				.render()
		).toBe('<b class="block1-x-x__el1 block1-x__el1 block1__el1">text</b>');
	});

	test('attributes super', () => {
		let t1 = new Template(`
			#block1
			b/el1 (attr1=value1, attr2=value2)
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						/el1 (super!)
					`
				)
				.render()
		).toBe('<b class="block1-x__el1 block1__el1" attr1="value1" attr2="value2"></b>');
	});

	test('attributes super (2)', () => {
		let t1 = new Template(`
			#block1
			b/el1 (attr1=value1, attr2=value2)
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						/el1 (super!, attr1=value0, attr3=value3)
					`
				)
				.render()
		).toBe(
			'<b class="block1-x__el1 block1__el1" attr1="value0" attr2="value2" attr3="value3"></b>'
		);
	});

	test('class attribute super', () => {
		let t1 = new Template(`
			#block1
			b/el1 (class=_mod1)
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						/el1 (super!)
					`
				)
				.render()
		).toBe('<b class="block1-x__el1 block1__el1 _mod1"></b>');
	});

	test('attributes super super', () => {
		let t1 = new Template(`
			#block1
			b/el1 (attr1=value1, attr2=value2)
		`);

		let t2 = t1.extend('#block1-x');

		expect(
			t2
				.extend(
					`
						#block1-x-x
						/el1 (super!)
					`
				)
				.render()
		).toBe(
			'<b class="block1-x-x__el1 block1-x__el1 block1__el1" attr1="value1" attr2="value2"></b>'
		);
	});

	test('attributes super.name!', () => {
		let t1 = new Template(`
			#block1
			b/el1 (class=_mod1, attr1=value1, attr2=value2)
			b/el2 (attr3=value3, attr4=value4)
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						/el1 (super.el2!, class=_mod2)
						/el2 (super.el1!, class=_mod1)
					`
				)
				.render()
		).toBe(
			'<b attr3="value3" attr4="value4" class="block1-x__el1 block1__el1 _mod2"></b><b class="block1-x__el2 block1__el2 _mod1" attr1="value1" attr2="value2"></b>'
		);
	});

	test('content super', () => {
		let t1 = new Template(`
			#block1
			b/el1 {
				'text'
			}
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						u/el1 {
							b {
								super!
							}
						}
					`
				)
				.render()
		).toBe('<u class="block1-x__el1 block1__el1"><b>text</b></u>');
	});

	test('content super (2)', () => {
		let t1 = new Template(`
			#block1
			b/el1
			b/el2
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						i/el2 {
							super!
						}
					`
				)
				.render()
		).toBe(
			'<b class="block1-x__el1 block1__el1"></b><i class="block1-x__el2 block1__el2"></i>'
		);
	});

	test('content super super', () => {
		let t1 = new Template(`
			#block1
			b/el1 {
				'text'
			}
		`);

		let t2 = t1.extend('#block1-x');

		expect(
			t2
				.extend(
					`
						#block1-x-x
						u/el1 {
							b {
								super!
							}
						}
					`
				)
				.render()
		).toBe('<u class="block1-x-x__el1 block1-x__el1 block1__el1"><b>text</b></u>');
	});

	test('content super.name', () => {
		let t1 = new Template(`
			#block1
			b/el1 {
				'text'
			}
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						u/el1 {
							b/el2 {
								super.el1!
							}
						}
					`
				)
				.render()
		).toBe(
			'<u class="block1-x__el1 block1__el1"><b class="block1-x__el2 block1__el2">text</b></u>'
		);
	});

	test('comment in attributes', () => {
		expect(
			new Template(`
				#block1
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
			`).render()
		).toBe(
			'<b></b><b attr1="1"></b><b attr1=""></b><b attr1="" attr2=""></b><b attr1="" attr2="1"></b>'
		);
	});

	test('helper', () => {
		Template.helpers.test = el => {
			return [
				{ nodeType: NodeType.TEXT, value: '1' },
				{ nodeType: NodeType.TEXT, value: '2' },
				{ nodeType: NodeType.TEXT, value: '3' }
			];
		};

		expect(
			new Template(`
				#block1
				b {
					@test
				}
			`).render()
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
			new Template(`
				#block1
				b {
					@test {
						i
					}
				}
			`).render()
		).toBe('<b>[<i></i>]</b>');
	});

	test('helper super', () => {
		Template.helpers.test = el => {
			return [
				{
					nodeType: NodeType.ELEMENT,
					tagName: 'b',
					isHelper: false,
					names: el.names,
					attributes: el.attributes,
					content: el.content
				}
			];
		};

		let t1 = new Template(`
			#block1
			@test/test (attr1=value1)
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						@/test (super!, attr2=value2)
					`
				)
				.render()
		).toBe('<b class="block1-x__test block1__test" attr1="value1" attr2="value2"></b>');
	});

	test('helper super (2)', () => {
		Template.helpers.test = el => {
			return [
				{
					nodeType: NodeType.ELEMENT,
					tagName: 'b',
					isHelper: false,
					names: el.names,
					attributes: el.attributes,
					content: el.content && [
						{
							nodeType: NodeType.ELEMENT,
							tagName: 'u',
							isHelper: false,
							names: null,
							attributes: null,
							content: el.content
						}
					]
				}
			];
		};

		let t1 = new Template(`
			#block1
			@test/test (attr1=value1) {
				'text'
			}
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						@/test (super!, attr2=value2) {
							s {
								super!
							}
						}
					`
				)
				.render()
		).toBe(
			'<b class="block1-x__test block1__test" attr1="value1" attr2="value2"><u><s><u>text</u></s></u></b>'
		);
	});

	test('helper content super', () => {
		let t1 = new Template(`
			#block1
			@section/inner {
				b
			}
		`);

		expect(
			t1
				.extend(
					`
						#block1-x
						@/inner {
							u {
								super!
							}
						}
					`
				)
				.render()
		).toBe('<u><b></b></u>');
	});

	test('escape sequences', () => {
		expect(
			new Template(`
				'_\\t_\\x20_\\u0020_'
			`).render()
		).toBe('_\t_\x20_\u0020_');
	});

	test('empty', () => {
		expect(new Template('').render()).toBe('');
	});
});
