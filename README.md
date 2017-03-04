# remark-lint-books-links

This [remark-lint](https://github.com/wooorm/remark-lint) rule was created for [free-programming-books-lint](https://github.com/vhf/free-programming-books-lint) to enforce [free-programming-books](https://github.com/vhf/free-programming-books) [formatting guidelines](https://github.com/vhf/free-programming-books/blob/master/CONTRIBUTING.md#formatting).

This rule only applies to list items starting with a link. It enforces the following things:

###### Author

If an author is mentioned, it's done with `・-・` (middots represent spaces, so,
a dash surrounded by single spaces)

```markdown
* [Another Awesome Book - John Doe](http://example.com/book.html)
* [Another Awesome Book](http://example.com/book.html)- John Doe
* [Another Awesome Book](http://example.com/book.html) - John Doe
```

Yields:

```text
1:3-1:65: Missing a space before author
```

###### Format

If the URL in the link refers to a PDF, that format is mentioned.

```markdown
* [Another Awesome Book](http://example.com/book.pdf)(PDF)
* [Another Awesome Book](http://example.com/book.pdf)
* [Another Awesome Book](http://example.com/book.pdf) (PDF)
```

Yields:

```text
1:3-1:59: Missing a space before PDF indication
2:3-2:54: Missing PDF indication
```

###### Author and Format

The author comes before the format:

```markdown
* [Another Awesome Book](http://example.com/book.pdf)- John Doe
* [Another Awesome Book](http://example.com/book.pdf) - John Doe
* [Another Awesome Book](http://example.com/book.pdf) - John Doe (PDF)
```

Yields:

```text
1:3-1:64: Missing a space before author
1:3-1:64: Missing PDF indication
2:3-2:65: Missing PDF indication
```

## Using the rule

### Via `.remarkrc`

```bash
npm install -g remark-cli
npm install remark-lint remark-lint-books-links
```

Then, set up your `.mdastrc`:

```JSON
{
  "plugins": [
    "lint",
    "lint-books-links"
  ]
}
```

Now you can use the following command to run the lint:

```bash
remark xxx.md
```

### Via CLI

```bash
npm install -g remark-cli
npm install remark-lint remark-lint-books-links
remark -u lint -u lint-books-links xxx.md
```
