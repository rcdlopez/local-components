/// <reference path="../src/custom.d.ts" />
import * as globby from 'globby';
import * as SVGO from 'svgo';
import * as path from 'path';
import * as fs from 'fs';

const svgo = new SVGO({
	plugins: [
		{
			inlineStyles: { "onlyMatchedOnce": false },
		},
	]
});

async function getSvgs():Promise<string[]> {
	return await globby(['src/**/*.svg']);
}

async function generateSvgStubs () {
	const svgs = await getSvgs();

	for (const svgPath of svgs) {
		const svgDirname = path.dirname(svgPath);
		const svgBasename = path.basename(svgPath, '.svg');
		const tsSvgPath = path.resolve(process.cwd(), svgDirname, svgBasename + '.tsx');

		try {
			const svgContents = await svgo.optimize(fs.readFileSync(svgPath).toString());
			const tsSvgContents = `// This file is automatically generated with create-ts-svgs script in package.json
import * as React from 'react'; 
			
interface ISvgProps {
	className?: string,
}
			
const fn: React.FunctionComponent<ISvgProps> = (props) => (
	${svgContents.data.replace(/class=/g, 'className=').replace('<svg ', '<svg className={props.className} ')}
);

export default fn;
`;

			fs.writeFileSync(tsSvgPath, tsSvgContents);

			console.info('Wrote', tsSvgPath);
		}
		catch (e) {
			console.error('Ran into error', e);

			process.exit(1);
		}
	}
}

(async () => {
	await generateSvgStubs();
})();
