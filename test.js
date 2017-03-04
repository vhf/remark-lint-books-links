const test = require('tape');
const remark = require('remark');
const lint = require('remark-lint');
const booksLinks = require('./');

const processor = remark().use(lint).use(booksLinks);

const author = `* [Another Awesome Book](http://example.com/book.html)- John Doe
* [Another Awesome Book](http://example.com/book.html) - John Doe
`;

const format = `* [Another Awesome Book](http://example.com/book.pdf)(PDF)
* [Another Awesome Book](http://example.com/book.pdf)
* [Another Awesome Book](http://example.com/book.pdf) (PDF)
`;

const authorAndFormat = `* [Another Awesome Book](http://example.com/book.pdf)- John Doe
* [Another Awesome Book](http://example.com/book.pdf) - John Doe
* [Another Awesome Book](http://example.com/book.pdf) - John Doe (PDF)
`;

test('remark-lint-alphabetize-lists', (t) => {
  t.deepEqual(
    processor.processSync(author).messages.map(String),
    [
      '1:3-1:65: Missing a space before author'
    ],
    'author'
  );

  t.deepEqual(
    processor.processSync(format).messages.map(String),
    [
      '1:3-1:59: Missing a space before PDF indication',
      '2:3-2:54: Missing PDF indication'
    ],
    'format'
  );

  t.deepEqual(
    processor.processSync(authorAndFormat).messages.map(String),
    [
      '1:3-1:64: Missing a space before author',
      '1:3-1:64: Missing PDF indication',
      '2:3-2:65: Missing PDF indication'
    ],
    'author and format'
  );

  t.end();
});
