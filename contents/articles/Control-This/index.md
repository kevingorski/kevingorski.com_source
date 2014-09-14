---
title: Control &ldquo;this&rdquo;
date: 2014-08-18 20:55
template: article.jade
series: It&rsquo;s Just JavaScript
---

>>> Master the &ldquo;this&rdquo; keyword

If you&rsquo;ve used an object-oriented language that also has the `this` keyword, you may be surprised that it means something more subtle in JavaScript.

With many OO languages, `this` means the current instance of this class type (or a sub-class of that type). Methods are never disassociated from the instances that own them, so `this` always means the the owner.

In JavaScript, `this` depends entirely on how the function was invoked. The first way a function can be invoked is to execute it anonymously:

```
function run() {
  console.log(this, 'is running');
}

run();
```

In this case, there is no explicit object on which `run` was invoked, so the global context is used, which is `window` in the browser and is another object in runtime environments like Node.

To make an object "own" a function, the simplest way is to assign it to a property:

```
var task = {
  run: run
}

task.run(); // Object is running
```

If you&rsquo;ve got a JavaScript constructor, you can also assign it to the protoype of that constructor:

```
function Task() {
}

Task.prototype.run = run;

var task = new Task();

task.run(); // => Task is running
```

In either of those cases, invoking the function in the context of the object is done with the &ldquo;dot&rdquo; operator, which you&rsquo;ve probably seen enough times to be ignoring at this point, but there&rsquo;s a subtle difference to the *executing dot operator* and the *accessing dot operator*:

```
task.run(); // => executing

var anonymousRun = task.run; // accessing

anonymousRun(); // this = window/global
```

This is difference is important when trying to use functions on objects as callbacks. To keep the desired context object you can write an anonymous function that then calls the object&rsquo;s function:

```
$('.run').click(function() {
  task.run();
});
```

This is such a common pattern that many libraries build in constructing such a function to be used like so:

```
$('.run').click($.proxy(task.run, task));
```

But how does the `proxy` function work? It utilizes a function object native function to apply a specific context object and pass parameters to it. Something like this:

```
function proxy(fn, context) {
  return function () {
    return fn.apply(context, arguments);
  };
}
```

The `arguments` keyword is an array-like object of all the arguments passed  to the currently executing function. The only difference between `call` and `apply` is how they accept arguments. While `apply` takes an array, `call` expects there to be N parameters after the context object for each parameter to be passed to the function.

As JavaScript apps grow in complexity, you almost inevitably reach the point where it&rsquo;s easier to read a function created within another function than to attempt to pass enough context around for separate actions. In these cases keeping track of what `this` points to can be tricky, so it&rsquo;s usually best to assign `this` to a descriptively-named local variable at the beginning of each function. That way, if you need the inner or outer context object it will be obvious what to use and if code moves within your codebase it will be easy to spot context changes.

```
function addThings(things) {
  var container = this;
  
  function clickThing() {
    console.log('Contained by ', container);
  }
  
  for(var index = 0; index < things.length; index++) {
    things[index].onclick = clickThing;
  }
}
```

I hope now you can not only touch `this`, but fully grasp it.