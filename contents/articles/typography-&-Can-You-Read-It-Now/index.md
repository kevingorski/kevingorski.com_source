title: Typography & Can You Read It Now
author: Kevin Gorski
date: 2012-08-29 08:21
template: article.jade

# Typography & Can You Read It Now?

Typography can be a subtle art. It's in front of us all day in one form or another, but it often takes extreme examples of high- or low-quality typography to [spur](http://www.typographydeconstructed.com/spur/) us to think – or even *care* – about type. Like most arts, the more you think about it, the more you notice details, which in turn makes you stop and evaluate what you might have glossed over before. This can be both enthralling and maddening.

## Productive Frustration

I read a lot on the Web. Not so uncommon. Unlike a lot of people, however, I read a lot of software development articles displayed on custom hosting or blog themes. This can lead to some particularly [unreadable](http://en.wikipedia.org/wiki/Readability) text, which is especially frustrating because these are smart and articulate people whose words have to fight through the muddy medium of their own design. It's frustrating.

For non-technical content, there are work-arounds for this problem: use [Instapaper](http://instapaper.com), [Readability](http://readability.com), or Safari's Reader feature to arrange the text in a more readable way and read away. This is great for prose and digital photos (which can usually be resized without losing the general idea), but software development articles tend to include important accompanying source code (which has different requirements for readability than prose) and screen shots.

One way to solve this might be to make affordances in the tools I mentioned for reading code, but I (and probably you) have no control over that, and it's probably more work than it would be worth to the percentage of their audience that has this minor problem.

A better way is to make it easy to tell if your text on the Web is *readable enough* or not, and concrete ways to improve its readability. Hopefully with this guidance all of the text in these articles can be made readable enough that a separate tool isn't needed.

## So I Made A Thing

When I started working on [Can You Read It Now](http://canyoureaditnow.com] (CYRIN), I was in the same situation as a lot of people: I could identify readable text, but not the ways that distinguished it from the text that was a challenge to read. Since it was clear that I was not the only one without this problem, I spent some time reading about the basics of typesetting in the browser and applied some of what I learned in the CYRIN [bookmarklet](http://en.wikipedia.org/wiki/Bookmarklet).

The source for a lot of the ratings are the W3C's [Web Content Accessibility Guidelines](http://www.w3.org/WAI/intro/wcag.php), which are focused on making content that is accessible to as many people as possible. Some of the guidelines include formulas for calculating how readable or not text will be, others are more abstract. I've used the formulae where possible and tried to make clear ratings based on that guidance or personal preference everywhere else. In CYRIN higher scores (up to 10) mean that the text will be easier and possible for more people to read your content, but anything rated 7 or above can be good enough if you're not targeting low-visibility visitors.

TODO: Show a screenshot of ratings? Include a live rating page here?

CYRIN also gives specific recommendations (including CSS) for updating the target design to make it more readable if the score is less than 7.

TODO: EXAMPLE of suggestions & CSS

Finally, CYRIN also provides short descriptions of the aspects of typesetting that are being measured. There are more aspects of well-set type than are listed here and more subtlety to determining whether text is readable, but I think it's a good start for the use case I've outlined.

TODO: Example description

Go ahead, [try it out](http://canyoureaditnow.com).

## What's coming

There's more to tell about CYRIN and some of the basics of typography as it applies to readability, so I hope you'll look forward to:

* More on the meanings of metrics that CYRIN evaluates
* Notes on other aspects of typography in the browser
* Technical details about how CYRIN was built
* Feature updates

## Other Reading

If you can't stand to wait until I post again to get your typography fix, here is some type-geeky reading I've enjoyed:

* [The Elements of Typographic Style](http://en.wikipedia.org/wiki/The_Elements_of_Typographic_Style) - The One True Typography Book, as far as I know. Covers a great deal of what I'd picked up in bits and pieces over time, but in greater detail, historical context & (of course) amazing typography.
* [The Elements of Typographic Style Applied to the Web](http://webtypography.net/) - A long-running work in progress (started in 2005) that tries to capture more of the specifics of designing for the browser.
* [Information Architects](http://informationarchitects.net/blog/) - Creators of iA Writer, they have written about how [they apply rigorous standards to the display of text](http://informationarchitects.net/blog/responsive-typography-the-basics/) in their cross-device text editors.
* [Elliot Jay Stocks](http://elliotjaystocks.com/)' Tomorrow's web type today series: [ligatures](http://elliotjaystocks.com/blog/the-fine-flourish-of-the-ligature/), [expert subsets](http://elliotjaystocks.com/blog/expert-subsets-for-css-in-123/) (for real small caps and lower case numerals), [swashes](http://elliotjaystocks.com/blog/say-it-with-a-swash/) & [stylesets](http://elliotjaystocks.com/blog/stylesets/).