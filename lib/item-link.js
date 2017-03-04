const rule = require('unified-lint-rule');
const generated = require('unist-util-generated');
const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

const credit = /- ([^(\n]+){0,1}/m;
const filetype = /\(PDF\)/;

function itemLink(tree, file) {
  visit(tree, 'list', (node) => {
    const items = node.children;

    if (node.ordered) {
      return;
    }

    items.forEach((item) => {
      const head = item.children[0];
      const link = head && head.type === 'paragraph' && head.children[0];
      let line;
      let rest;
      let author;
      let pdf;

      if (generated(item)) {
        return;
      }

      if (link && link.type === 'link') {
        line = toString(link);
        rest = null;

        if (head.children.length > 1) {
          rest = toString({ children: head.children.slice(1) });
        }

        author = credit.exec(rest);

        if (author) {
          if (author.index < 1) {
            file.message('Missing a space before author', head);
          } else if (author.index !== 1 && author[1][author[1].length - 1] !== ')') {
            file.message('Misplaced author', head);
          }
        } else {
          author = credit.exec(line);

          if (author) {
            file.message('Misplaced author: author should be after the link', link);
          }
        }

        if (/\.pdf($|\?)/.test(link.url)) {
          pdf = filetype.exec(rest);

          if (!pdf) {
            file.message('Missing PDF indication', head);
          } else if (pdf.index < 1) {
            file.message('Missing a space before PDF indication', head);
          }
        }
      }
    });
  });
}

module.exports = rule('remark-lint:books-links', itemLink);
