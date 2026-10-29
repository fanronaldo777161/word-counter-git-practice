const fs = require('node:fs');

function countWords(text) {
  return (text.match(/[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*/gu) || []).length;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  try {
    let text;
    if (args[0] === '--file') {
      if (args.length !== 2) {
        throw new Error('Использование: node word-counter.js --file путь_к_файлу');
      }
      text = fs.readFileSync(args[1], 'utf8');
    } else if (args.length > 0) {
      text = args.join(' ');
    } else {
      text = fs.readFileSync(0, 'utf8');
    }
    console.log(`Количество слов: ${countWords(text)}`);
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { countWords };
