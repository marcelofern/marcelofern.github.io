# Why Is This Site Built With C

```
Created at: 2024-08-26
```


I've been writing about *things* on a personal website since
[2017](http://web.archive.org/web/20171124021420/http://marcelonet.com/snippets/).

Most of what I have written features in the category of notes-to-self. Mostly
on how to do A or B.

Only recently I've started polishing notes together and forming opinionated
posts on specific topics.

One thing I realised was preventing me of writing more frequently wasn't
the lack of ideas or motivation, but the trouble of having to deal with
whatever website builder and platform I was using at the time.

My first website was built with Django serviced by Nginx in a server hosted on
Digital Ocean. Back then, GitHub pages didn't exist and the canonical way was
to rent a cheap Digital Ocean Ubuntu machine for about $5 USD/month.

I was highly motivated to post things as I was still fresh in the web
development world and wanted to know how everything worked. I also had no idea
what I was doing and wanted my own website to be a sandbox where I could try
new things out.

That was my first mistake. Building a "static" website with Django is too
cumbersome. You have to set up views, Jinja templates, run the server, get
GitHub hooks for resetting the remote server when new commits are pushed, etc.

Once the romantic view of a newbie blog-poster faded away, handling the whole
apparatus to publish a note took more time than writing the note itself.

At some point I had to make a switch before the website grew too far.

My second take was to ditch the whole website and start from scratch using
a static website generator. I decided to use Nuxt because I was using Vue at
work and the whole set up looked simple to start with.

It was nice in the beginning. I set it up with GitHub Pages. I only had to
somehow get the static site that Nuxt creates via a cli command pushed to my
git repo and GitHub handled the rest for me. That was a major improvement over
the previous infrastructure. On top of that, I could do cool dynamic things
with JavaScript being embedded and having the framework to interact with it.

But I only had one blog post where I needed all of this. Soon it became a pain
to maintain the website again. Publishing posts involved writing things in Vue
and that was just not an ergonomic way to write regular prose.

Also the framework kept being updated in backward incompatible ways. Handling
versioning of Vue with all its JavaScript dependencies was a big pain point.

## Now

Learning from these two past mistakes, my third attempt involved the following
set of requirements:

1. Starting a post must be as easy as typing into a blank file.
2. The website must be statically generated. And Fast.
3. There should be little to none dependencies for generating the website.

The first requirement is satisfied by writing using markdown files. Writing
this blog post looks like this:

![markdown](markdown.png)

The second requirement is a bit trickier, but it is directly related to the
third.

Writing posts in markdown means that there needs to be a parser to convert the
files to html. I can either code this parser myself, or tank just this one
dependency.

Here's the thing, writing a markdown parser isn't the most trivial thing. But
at the same time, that's the only dependency I need to have.

My first instinct was to reach out to [Pandoc](https://pandoc.org/). I did so
and implemented a small shell script that could read my directory tree of
markdown files and transpose them to html.

That worked fine for about 20 to 30 markdown files. After that, the process
of converting files to html started to deteriorate. Pandoc is written in
Haskell, and it is not known for being fast at parsing large volumes of files.

Upgrading the script so that only new markdown files or changed ones are marked
for recompilation would involve too much wizardry to make it nice and robust. I
didn't want to do that. Especially given that I know that parsing hundreds or
even thousands of small files should be doable in single-digit seconds. The
problem was that Pandoc slowed everything down.

More over, the whole Pandoc ecosystem requires **a lot of** of dependencies.
227 dependencies and over 400MB of installed size to be exact:

```
Packages (227) ghc-libs-9.2.8-1  haskell-aeson-2.1.2.1-47  haskell-aeson-pretty-0.8.10-7
               haskell-ansi-terminal-0.11.4-66  haskell-ansi-wl-pprint-0.6.9-418
               haskell-appar-0.1.8-14  haskell-asn1-encoding-0.9.6-230
               haskell-asn1-parse-0.9.5-230  haskell-asn1-types-0.3.4-209  haskell-assoc-1.0.2-266
               haskell-async-2.2.5-27  haskell-attoparsec-0.14.4-74
               haskell-attoparsec-aeson-2.1.0.0-31  haskell-attoparsec-iso8601-1.1.0.0-50
               haskell-auto-update-0.1.6-339  haskell-base-compat-0.12.2-2
               haskell-base-compat-batteries-0.12.2-83  haskell-base-orphans-0.8.8.2-13
               haskell-base-unicode-symbols-0.2.4.2-14  haskell-base16-bytestring-1.0.2.0-80
               haskell-base64-0.4.2.4-69  haskell-base64-bytestring-1.2.1.0-104
               haskell-basement-0.0.16-2  haskell-bifunctors-5.6-77  haskell-bitvec-1.1.3.0-94
               haskell-blaze-builder-0.4.2.3-2  haskell-blaze-html-0.9.1.2-226
               haskell-blaze-markup-0.8.3.0-10  haskell-boring-0.2.1-3
               haskell-bsb-http-chunked-0.0.0.4-383  haskell-byteorder-1.0.4-25
               haskell-call-stack-0.4.0-184  haskell-case-insensitive-1.2.1.0-203
               haskell-cassava-0.5.3.1-4  haskell-cereal-0.5.8.3-2  haskell-citeproc-0.8.1-105
               haskell-cmdargs-0.10.22-2  haskell-colour-2.3.6-210  haskell-commonmark-0.2.4.1-1
               haskell-commonmark-extensions-0.2.4-2  haskell-commonmark-pandoc-0.2.1.3-82
               haskell-comonad-5.0.8-261  haskell-conduit-1.3.5-53  haskell-conduit-extra-1.3.6-134
               haskell-constraints-0.13.4-50  haskell-contravariant-1.5.5-4  haskell-cookie-0.4.6-2
               haskell-crypton-0.34-11  haskell-crypton-connection-0.3.2-8
               haskell-crypton-x509-1.7.6-28  haskell-crypton-x509-store-1.6.9-28
               haskell-crypton-x509-system-1.6.7-28  haskell-crypton-x509-validation-1.6.12-28
               haskell-data-array-byte-0.1.0.1-55  haskell-data-default-0.7.1.1-306
               haskell-data-default-class-0.1.2.0-25
               haskell-data-default-instances-containers-0.0.1-37
               haskell-data-default-instances-dlist-0.0.1-319
               haskell-data-default-instances-old-locale-0.0.1-37  haskell-data-fix-0.3.2-102
               haskell-dec-0.0.5-5  haskell-digest-0.0.1.7-2  haskell-digits-0.3.1-21
               haskell-distributive-0.6.2.1-209  haskell-dlist-1.0-241
               haskell-doclayout-0.4.0.1-29  haskell-doctemplates-0.11-71
               haskell-easy-file-0.2.5-21  haskell-emojis-0.1.3-10  haskell-erf-2.0.0.0-25
               haskell-fast-logger-3.1.2-74  haskell-file-embed-0.0.15.0-2
               haskell-foldable1-classes-compat-0.1-77  haskell-generically-0.1.1-2
               haskell-ghc-bignum-orphans-0.1.1-2  haskell-glob-0.10.2-90
               haskell-gridtables-0.1.0.0-48  haskell-haddock-library-1.11.0-17
               haskell-hashable-1.4.3.0-46  haskell-hourglass-0.2.12-246  haskell-hslua-2.3.0-52
               haskell-hslua-aeson-2.3.0.1-34  haskell-hslua-classes-2.3.0-53
               haskell-hslua-core-2.3.1-45  haskell-hslua-list-1.1.1-60
               haskell-hslua-marshalling-2.3.1-5  haskell-hslua-module-doclayout-1.1.0-58
               haskell-hslua-module-path-1.1.0-53  haskell-hslua-module-system-1.1.0.1-27
               haskell-hslua-module-text-1.1.0.1-27  haskell-hslua-module-version-1.1.0-53
               haskell-hslua-module-zip-1.1.1-22  haskell-hslua-objectorientation-2.3.0-49
               haskell-hslua-packaging-2.3.1-14  haskell-hslua-repl-0.1.2-11
               haskell-hslua-typing-0.1.1-7  haskell-http-api-data-0.5.1-54
               haskell-http-client-0.7.15-23  haskell-http-client-tls-0.3.6.3-58
               haskell-http-date-0.0.11-136  haskell-http-media-0.8.1.1-14
               haskell-http-types-0.12.4-6  haskell-http2-4.1.0-22  haskell-hunit-1.6.2.0-227
               haskell-indexed-traversable-0.1.3-69
               haskell-indexed-traversable-instances-0.1.1.2-44
               haskell-integer-logarithms-1.0.3.1-7  haskell-iproute-1.7.12-82
               haskell-ipynb-0.2-139  haskell-isocline-1.0.9-2  haskell-jira-wiki-markup-1.5.1-22
               haskell-juicypixels-3.3.8-31  haskell-lexer-1.1.1-2  haskell-libyaml-0.1.4-5
               haskell-lpeg-1.0.4-26  haskell-lua-2.3.2-6  haskell-memory-0.18.0-8
               haskell-mime-types-0.1.2.0-2  haskell-mmorph-1.2.0-6
               haskell-monad-control-1.0.3.1-102  haskell-mono-traversable-1.0.17.0-8
               haskell-network-3.1.4.0-20  haskell-network-byte-order-0.1.7-2
               haskell-network-uri-2.6.4.2-31  haskell-old-locale-1.0.0.7-31
               haskell-old-time-1.1.0.4-2  haskell-onetuple-0.3.1-75  haskell-only-0.1-23
               haskell-optparse-applicative-0.17.1.0-29  haskell-ordered-containers-0.2.3-2
               haskell-pandoc-3.1.8-34  haskell-pandoc-lua-engine-0.2.1.2-23
               haskell-pandoc-lua-marshal-0.2.4-2  haskell-pandoc-server-0.1.0.5-39
               haskell-pandoc-types-1.23.1-21  haskell-pem-0.2.4-286  haskell-pretty-show-1.10-15
               haskell-prettyprinter-1.7.1-165  haskell-primitive-0.7.4.0-111
               haskell-psqueues-0.2.8.0-10  haskell-quickcheck-2.14.3-64  haskell-random-1.2.1.2-8
               haskell-recv-0.1.0-30  haskell-regex-base-0.94.0.2-3  haskell-regex-tdfa-1.3.2.2-44
               haskell-resourcet-1.2.6-51  haskell-safe-0.3.21-5
               haskell-safe-exceptions-0.1.7.4-21  haskell-scientific-0.3.7.0-113
               haskell-semialign-1.2.0.1-160  haskell-semigroupoids-5.3.7-142
               haskell-servant-0.20.1-12  haskell-servant-server-0.20-23  haskell-sha-1.6.4.4-20
               haskell-simple-sendfile-0.2.32-36  haskell-singleton-bool-0.1.7-3
               haskell-skylighting-0.14-15  haskell-skylighting-core-0.14-14
               haskell-skylighting-format-ansi-0.1-121
               haskell-skylighting-format-blaze-html-0.1.1.2-8
               haskell-skylighting-format-context-0.1.0.2-86
               haskell-skylighting-format-latex-0.1-121  haskell-socks-0.6.1-237
               haskell-some-1.0.5-2  haskell-sop-core-0.5.0.2-2  haskell-split-0.2.5-6
               haskell-splitmix-0.1.0.5-22  haskell-statevar-1.2.2-3
               haskell-streaming-commons-0.2.2.6-26  haskell-strict-0.4.0.1-240
               haskell-string-conversions-0.4.0.1-171  haskell-syb-0.7.2.4-8
               haskell-tagged-0.8.8-2  haskell-tagsoup-0.14.8-226  haskell-temporary-1.3-585
               haskell-texmath-0.12.8.4-15  haskell-text-conversions-0.3.1.1-63
               haskell-text-icu-0.8.0.5-2  haskell-text-short-0.1.5-79
               haskell-th-abstraction-0.4.5.0-2  haskell-th-compat-0.1.5-2  haskell-th-lift-0.8.4-2
               haskell-th-lift-instances-0.1.20-47  haskell-these-1.1.1.1-267
               haskell-time-compat-1.9.6.1-97  haskell-time-manager-0.0.1-35  haskell-tls-1.8.0-29
               haskell-toml-parser-1.3.1.3-18  haskell-transformers-base-0.4.6-102
               haskell-transformers-compat-0.7.2-2  haskell-type-equality-1.0.1-1
               haskell-typed-process-0.2.11.1-15  haskell-typst-0.3.2.1-32
               haskell-typst-symbols-0.1.4-2  haskell-unicode-collation-0.1.3.6-12
               haskell-unicode-data-0.4.0.1-33  haskell-unicode-transforms-0.4.0.1-74
               haskell-uniplate-1.6.13-223  haskell-unix-compat-0.7.1-16
               haskell-unix-time-0.4.13-1  haskell-unliftio-0.2.25.0-10
               haskell-unliftio-core-0.2.1.0-2  haskell-unordered-containers-0.2.20-18
               haskell-utf8-string-1.0.2-150  haskell-uuid-types-1.0.5.1-16
               haskell-vault-0.3.1.5-185  haskell-vector-0.13.1.0-31
               haskell-vector-algorithms-0.9.0.2-3  haskell-vector-stream-0.1.0.1-2
               haskell-wai-3.2.4-19  haskell-wai-app-static-3.1.9-14  haskell-wai-cors-0.2.7-355
               haskell-wai-extra-3.1.15-2  haskell-wai-logger-2.4.0-443  haskell-warp-3.3.30-59
               haskell-witherable-0.4.2-101  haskell-word8-0.1.3-23  haskell-xml-1.3.14-31
               haskell-xml-conduit-1.9.1.3-53  haskell-xml-types-0.3.8-9  haskell-yaml-0.11.11.2-49
               haskell-zip-archive-0.4.3.2-2  haskell-zlib-0.6.3.0-60  hslua-cli-1.4.1-49
               lua-lpeg-1.1.0-2  numactl-2.0.18-1  pandoc-cli-0.1.1.1-113

Total Download Size:    65.52 MiB
Total Installed Size:  473.35 MiB
```

There are too many dependencies for me to trust this environment will be stable
for a long time. The last thing I want to do is deal with backward incompatible
changes on my wee blog.

I looked for a better alternative and found
[md4c](http://github.com/mity/md4c), which is a parser written in C with no
dependencies other than the standard C library. It also has only one header
file and one source file, making it easy to embed it straight into anything.

The only work I needed to do was to write a C script of ~250 LOC to call md4c
functions to parse my `md` files, and then chuck those converted files into the
GitHub Pages repo.

My website converter script, which is composed by this [250
LOC](https://gist.github.com/marcelofern/896574e055a05d011449b00217600fe6)
source file (plus md4c) is feature-complete and runs on any compiler that
supports the C standard from 1999 onwards. There's no platform-dependent code
and it's portable to Windows, Linux, and MacOS.

It runs incredibly well. I have 87 markdown files at the moment and parsing all
those files at the same time can be done virtually instantaneously:

```
[~] time ./scripts/website/converter.bin

real    0m0.115s
user    0m0.087s
sys     0m0.091s
```

This allows me completely flush the whole repo away and create it again from
scratch in almost no time. I do not have to worry about creating specific
logic to just re-parse files that have changed or anything fancy like that,
which reduces the burden of maintenance and makes my script smaller.

## Outro

One alternative to all of this is to use [Hugo](https://gohugo.io/). There is
nothing inherently bad with Hugo. It is decently fast (written in Go) and it is
easy to get going for a simple website. It is certainly better than some
alternatives like [pelican](https://github.com/getpelican/pelican) which is
written in Python and thus slow to compile.

However, Hugo doesn't particularly appeal to me because the framework seems
too big and opinionated for what I need:

> Hugo takes data files, i18n bundles, configuration, templates for layouts,
> static files, assets, and content written in Markdown, HTML, AsciiDoctor, or
> Org-mode and renders a static website. Some notable features are multilingual
> support, image processing, asset management, custom output formats, markdown
> render hooks and shortcodes. Nested sections allow for different types of
> content to be separated, e.g. for a website containing a blog and a podcast.

[source](http://web.archive.org/web/20240808001552/https://en.wikipedia.org/wiki/Hugo_(software))

There's a lot in there, so much so that big websites that need a lot of
features (e.g. Smashing Magazine) are capable of relying heavily on Hugo.

I don't need any of that. I just need a markdown parser. There is no need to
bring a GC-based language into this. I also want my website to use tech that I
know will continue to work in the upcoming decades. There is virtually nothing
that beats C compilers in that area.

As much as Hugo looks satisfiable today, I'm under no illusions that it won't
keep growing and changing.
