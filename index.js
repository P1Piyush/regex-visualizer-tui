#!/usr/bin/env node

const chalk = require('chalk');
const boxen = require('boxen');
const { program } = require('commander');

program
  .argument('<regex>', 'The regex pattern to visualize')
  .argument('[testString]', 'Optional string to test against the regex')
  .parse(process.argv);

const [pattern, testString] = program.args;

if (!pattern) {
    console.log(chalk.red('❌ Please provide a regex pattern.'));
    process.exit(1);
}

function visualizeRegex(regexStr) {
    console.log(chalk.cyan.bold('\n🔍 Regex Visualizer TUI\n'));

    try {
        const re = new RegExp(regexStr);
        const explanation = [];

        // Simple decomposition logic
        if (regexStr.includes('^')) explanation.push(`${chalk.yellow('^')} : Matches the ${chalk.bold('beginning')} of the string.`);
        if (regexStr.includes('$')) explanation.push(`${chalk.yellow('$')} : Matches the ${chalk.bold('end')} of the string.`);
        if (regexStr.includes('\\d')) explanation.push(`${chalk.yellow('\\d')} : Matches any ${chalk.bold('digit')} (0-9).`);
        if (regexStr.includes('\\w')) explanation.push(`${chalk.yellow('\\w')} : Matches any ${chalk.bold('word character')} (alphanumeric + underscore).`);
        if (regexStr.includes('\\s')) explanation.push(`${chalk.yellow('\\s')} : Matches any ${chalk.bold('whitespace')} character.`);
        if (regexStr.includes('+')) explanation.push(`${chalk.yellow('+')} : Matches ${chalk.bold('one or more')} of the preceding token.`);
        if (regexStr.includes('*')) explanation.push(`${chalk.yellow('*')} : Matches ${chalk.bold('zero or more')} of the preceding token.`);
        if (regexStr.includes('?')) explanation.push(`${chalk.yellow('?')} : Matches ${chalk.bold('zero or one')} of the preceding token (optional).`);
        if (regexStr.includes('.')) explanation.push(`${chalk.yellow('.')} : Matches ${chalk.bold('any character')} except line breaks.`);
        
        const groups = regexStr.match(/\(.*?\)/g);
        if (groups) {
            groups.forEach(g => explanation.push(`${chalk.magenta(g)} : A ${chalk.bold('capturing group')}.`));
        }

        const charClasses = regexStr.match(/\[.*?\]/g);
        if (charClasses) {
            charClasses.forEach(c => explanation.push(`${chalk.blue(c)} : A ${chalk.bold('character class')} (matches any character inside).`));
        }

        console.log(boxen(explanation.join('\n') || 'Simple literal pattern match.', {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan',
            title: `Pattern: /${regexStr}/`
        }));

        if (testString) {
            const match = testString.match(re);
            if (match) {
                console.log(chalk.green.bold('✅ MATCH FOUND!'));
                console.log(chalk.dim(`Input: "${testString}"`));
                
                // Highlight match
                const highlighted = testString.replace(re, (m) => chalk.bgGreen.black(m));
                console.log(`Result: ${highlighted}\n`);
            } else {
                console.log(chalk.red.bold('❌ NO MATCH'));
                console.log(chalk.dim(`Input: "${testString}"\n`));
            }
        }

    } catch (e) {
        console.log(chalk.red(`❌ Invalid Regex: ${e.message}`));
    }
}

visualizeRegex(pattern);
