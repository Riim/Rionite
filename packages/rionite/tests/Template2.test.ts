import { TemplateParser } from '@riim/rionite-template-parser-2';
import { Template } from '../src/Template';
import { Template as Template2 } from '../src/Template2';
const Benchmark = require('benchmark-util');

const template = `
	b {
		u (attr1) {
			i (attr2=value) {
				'text'
			}
		}
	}
`;
const preparsedTemplate = new TemplateParser(template).parse();

describe('Template2', () => {
	test('benchmark', async () => {
		const bench = new Benchmark();

		await bench
			.setWarmupTime(3000)
			.setMaxUnitTime(6000)
			.add('Template', () => {
				new Template(template).parse();
			})
			.add('Template2', () => {
				new Template2(template).parse();
			})
			.add('Template2 preparsed', () => {
				new Template2(preparsedTemplate).parse();
			})
			.run({
				onCycle: ({ name, totals }: any) => {
					console.log(
						`### ${name} x ${Math.round(totals.avg)} ops/sec ± ${Math.round(
							(totals.stdDev / totals.avg) * 10000
						) / 100}% (${totals.runs} runs sampled)`
					);
				}
			});
	}, 50000);
});
