# remark-lint-books-links

This [remark-lint](https://github.com/wooorm/remark-lint) rule was created for [free-programming-books-lint](https://github.com/vhf/free-programming-books-lint) to enforce [free-programming-books](https://github.com/vhf/free-programming-books) [formatting guidelines](https://github.com/vhf/free-programming-books/blob/master/CONTRIBUTING.md#formatting).

This rule only applies to list items starting with a link. It enforces the following things:

- If an author is mentioned, it's done with ` - ` (a dash surrounded by single spaces)

```
BAD : * [Another Awesome Book - John Doe](http://example.com/book.html)
BAD : * [Another Awesome Book](http://example.com/book.html)- John Doe
GOOD: * [Another Awesome Book](http://example.com/book.html) - John Doe
```

- There's a single space between the link and its format

```
BAD : * [Another Awesome Book](http://example.com/book.pdf)(PDF)
GOOD: * [Another Awesome Book](http://example.com/book.pdf) (PDF)
```

- Author comes before format:

```
BAD : * [Another Awesome Book](http://example.com/book.pdf)- John Doe
GOOD: * [Another Awesome Book](http://example.com/book.pdf) - John Doe (PDF)
```

## Using the rule

### Via `.mdastrc`

```bash
npm install -g remark
npm install -g remark-lint
npm install remark-lint-books-links # local install!
```

Then, set up your `.mdastrc`:

```JSON
{
  "plugins": {
    "remark-lint": {
      "external": ["remark-lint-books-links"]
    }
  }
}
```

Now you can use the following command to run the lint:

```bash
remark --no-stdout xxx.md
```

### Via CLI

```bash
npm install -g remark
npm install -g remark-lint
npm install -g remark-lint-books-links # global install!
remark --no-stdout -u remark-lint="external:[\"remark-lint-books-links\"]" xxx.md
```

Note that the `lint=<lint_options>` option only works with `remark >= 1.1.1`.

This `README.md` is based on [this one](https://github.com/chcokr/mdast-lint-sentence-newline/blob/250b106c9e19b387270099cf16f17a84643f8944/README.md) by [@chcokr](https://github.com/chcokr) (MIT).
