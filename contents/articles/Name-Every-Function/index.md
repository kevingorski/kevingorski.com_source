---
title: Name Every Function
date: 2014-07-20 14:30
template: article.jade
series: It&rsquo;s Just JavaScript
---

When writing non-trivial, maintainable JavaScript, I&rsquo;ve found that there are some simple guidelines which can improve the development experience. The first of these is:

> Name every function

Functions are the basic building block of JavaScript and are correspondingly easy to define throughout your code. The most terse form (and probably the most familiar one) is in the anonymous form:

<figure class="codelisting"><pre><code lang="javascript" class="javascript">$('.confirm').click(function() {
  // handle confirmation
});</code></pre>
<figcaption>An anonymous function</figcaption>
</figure>

This is usually fine for small scripts and examples, but as your codebase grows, brevity is less important than other factors:

* Improved debugging experience - stack traces can tell you which function errors are being thrown from or through
* Surfacing refactoring opportunities - when you stop to name a function, you can tell if its intent is clear and if it should be broken down into smaller pieces
* Readability - scanning and searching for the names of functions once they&rsquo;re written can be easier than recognizing blocks of code
* Shortened path to re-use - once you&rsquo;ve got a named function the possibility for re-use is one step shorter

There are two ways to reference a function by name, each having slightly different syntax and behavior. The first is to assign an anonymous function to a variable. Pretty straightforward:

<figure class="codelisting"><pre><code lang="javascript" class="javascript">var anonymousConfirm = function() {
  // handle confirmation
};

$('.confirm').click(anonymousConfirm);</code></pre>
<figcaption>Still anonymous, but referenced by a named variable</figcaption>
</figure>

Not too surprising, but using a function variable *isn&rsquo;t the same* as having a named function, and only named functions will have their names show up in a stack trace.

<figure class="codelisting"><pre><code lang="javascript" class="javascript">function namedConfirm() {
  // handle confirmation
}

$('.confirm').click(namedConfirm);</code></pre>
<figcaption>A real named function</figcaption>
</figure>

It doesn&rsquo;t look that much different, does it? It's fewer characters than assigning a variable and doesn&rsquo;t requre a semicolin at the end of the statement (&ldquo;require&rdquo;), which is apparently a big deal to some devs. More interesting to me, however, is that the following example is valid with named functions, whereas with function variables it would not be:

<figure class="codelisting"><pre><code lang="javascript" class="javascript">$('.confirm').click(namedConfirm);

function namedConfirm() {
  // handle confirmation
}</code></pre>
<figcaption>Referencing named functions before definition</figcaption>
</figure>

This works because of a feature/behavior of JavaScript called function-hoisting, which &ldquo;moves&rdquo; named function definitions to the top of the current scope (usually another function) when the code is executed. This example was easy to read, but doesn&rsquo;t illustrate why you might want to do such a thing. Here&rsquo;s a slightly more realistic use case:

<figure class="codelisting"><pre><code lang="javascript" class="javascript">function mixinSomeStuff(target) {
  // Single place to look for methods added, contents separated
  return $.extend(target, {
    doSomething: doSomething,
    anotherThing: anotherThing,
    // etc.
  });

  function sharedPrivateHelper() {
    // Shy, but useful
  }

  function doSomething() {
    // something!
    sharedPrivateHelper();
  }

  function anotherThing(other) {
    // more!
  }
}</code></pre>
<figcaption>Assigning named functions to object properties</figcaption>
</figure>

Separating the public interface from the implementation details like this is a matter of taste, but I find it more readable.

That&rsquo;s it for now, I hope you&rsquo;ve found it helpful!