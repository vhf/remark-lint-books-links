const visit = require('unist-util-visit');
const position = require('mdast-util-position');

function hasLink(item) {
  return item.children.length &&
         item.children[0].type === 'paragraph' &&
         item.children[0].children.length &&
         item.children[0].children[0].type === 'link';
}

function itemLink(ast, file, preferred, done) {
  const contents = file.toString();

  visit(ast, 'list', (node) => {
    const items = node.children;
    let author;
    let pdf;
    let restStart;
    let restEnd;
    let lineStart;
    let lineEnd;
    let line;
    let rest;

    if (node.ordered) {
      return;
    }

    items.forEach((item) => {
      if (hasLink(item)) {
        lineStart = item.children[0].children[0].position.start.offset;
        lineEnd = item.children[0].children[item.children[0].children.length - 1].position.end.offset;
        line = contents.slice(lineStart, lineEnd);
        rest = null;

        if (item.children[0].children.length > 1) {
          restStart = item.children[0].children[1].position.start.offset;
          restEnd = item.children[0].children[item.children[0].children.length - 1].position.end.offset;
          rest = contents.slice(restStart, restEnd);
        }

        if (position.generated(item)) {
          return;
        }

        author = /- ([^\(\n]+){0,1}/gm.exec(rest);
        if (author) {
          if (author.index < 1) {
            file.warn('Missing a space before author', item);
          } else if (author.index !== 1 && author[1][author[1].length - 1] !== ')') {
            file.warn('Misplaced author', item);
          }
        }

        pdf = /(\.pdf)/gmi.exec(line);
        if (pdf) {
          if (!rest || (pdf.length > 1 && !/PDF/gm.test(rest))) {
            file.warn('Missing PDF indication', item);
          }
        }
      }
    });
  });

  done();
}

module.exports = itemLink;
