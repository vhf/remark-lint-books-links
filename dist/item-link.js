'use strict';

var rule = require('unified-lint-rule');
var generated = require('unist-util-generated');
var visit = require('unist-util-visit');
var toString = require('mdast-util-to-string');

var credit = /- ([^(\n]+){0,1}/m;
var filetype = /\(PDF\)/;

function itemLink(tree, file) {
  visit(tree, 'list', function (node) {
    var items = node.children;

    if (node.ordered) {
      return;
    }

    items.forEach(function (item) {
      var head = item.children[0];
      var link = head && head.type === 'paragraph' && head.children[0];
      var rest = void 0;
      var author = void 0;
      var pdf = void 0;

      if (generated(item)) {
        return;
      }

      if (link && link.type === 'link') {
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