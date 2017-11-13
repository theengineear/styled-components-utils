# Styled Components Utils

## Installation

```bash
npm install --save styled-components-utils
```

## Nutshell

Functional tools to resolve props into style 💅. Compose these in tagged
template literals.

From:

```js
import styled from "styled-components";  // you'll likely have this...
const StyledButton = styled.button`color: ${props => props.color};`;
```

To:

```js
import styled from "styled-components";  // you'll likely have this...
import { prop } from "styled-components-utils";
const StyledButton = styled.button`color: ${prop("color")};`;
```

## More in depth

This library helps to compose functions. As an example, let's say you want to
coax folks in an open source project into being a follower or, better yet, a
contributor.

```js
import { includes, or, prop, tern } from "styled-components-utils";

const isFollower = includes(prop("followers"), prop("id"));
const isContributor = includes(prop("contributors"), prop("id"));
const FollowerBadge = styled.button`
  color: ${tern("gold", "grey", or(isFollower, isContributor))};
`;
const AdminBadge = styled.button`
  color: ${tern("gold", "grey", isFollower)};
`;
```

This library knows how to handle what we refer to as `resolvers`. Such that
gluing multiple resolvers together becomes trivial.


## Contributing

### Setup

After cloning the repo:

```bash
npm install
```

### Testing

We use `jest` to test.

```bash
npm test
```

### Formatting

We use `prettier` to format. You don't really need to run this as it runs on
each commit. However, if you want:


```bash
npm run format
```

## Documentation (auto-generated)

## Functions

<dl>
<dt><a href="#and">and(a, b)</a> ⇒ <code>Resolver</code> | <code>Boolean</code></dt>
<dd><p>The <code>and</code> function is for resolving the logical &quot;and&quot; of two
values. Given <code>a</code> and <code>b</code>, <code>and</code> will return
a boolean value immediately if possible. Otherwise, it returns a function
which accepts a value to resolve later.</p>
</dd>
<dt><a href="#declare">declare(cssProperty, value, [test])</a> ⇒ <code>Resolver</code> | <code>String</code></dt>
<dd><p>The <code>declare</code> function is for resolving whether or not a CSS
(property, value) pair string should be declared. In many cases, you know
what CSS property you want to declare, but you don&#39;t know whether or not to
declare it. The alternative would be to set the CSS value to something
invalid, but this bloats the CSS unnecessarily. Given
<code>cssProperty</code>, <code>value</code>, and <code>test</code>, the
<code>declare</code> function will return a string (may be empty)
immediately if possible. Otherwise, it returns a function which accepts a
value to resolve later. The cssProperty <bold>must</bold> be a string (i.e.,
cannot be a resolver). However, both value and test may be resolved later.</p>
</dd>
<dt><a href="#includes">includes(array, test)</a> ⇒ <code>Resolver</code> | <code>Boolean</code></dt>
<dd><p>The <code>includes</code> function is for resolving whether or not some value
is <em>included</em> in an array of values. Given <code>array</code> and
<code>test</code>, <code>includes</code> will return a boolean value
immediately if possible. Otherwise, it returns a function which accepts a
value to resolve later. Array&#39;s elements <bold>may not</bold> be
resolvers. I.e., they must be resolved along with the parent array.</p>
</dd>
<dt><a href="#is">is(a, b)</a> ⇒ <code>Resolver</code> | <code>Boolean</code></dt>
<dd><p>The <code>is</code> function is for resolving a <code>===</code> check of two
values. Given <code>a</code> and <code>b</code>, <code>is</code> will return
a boolean value immediately if possible. Otherwise, it returns a function
which accepts a value to resolve later.</p>
</dd>
<dt><a href="#join">join(joiner, ...values)</a> ⇒ <code>Resolver</code> | <code>String</code></dt>
<dd><p>Takes an array of strings possible interpolation functions. If all the values
are strings, a string is returned. Otherwise, a function is returned that
accepts an object and returns a string by resolving any functions.</p>
</dd>
<dt><a href="#not">not(value)</a> ⇒ <code>Resolver</code> | <code>Boolean</code></dt>
<dd><p>The <code>not</code> function is for resolving logical &quot;not&quot; of some
<em>single condition</em>. Given <code>value</code>, <code>not</code> will
return a boolean value immediately if possible. Otherwise, it returns a
function which accepts a value to resolve later.</p>
</dd>
<dt><a href="#or">or(a, b)</a> ⇒ <code>Resolver</code> | <code>Boolean</code></dt>
<dd><p>The <code>or</code> function is for resolving the logical &quot;or&quot; of two values.
Given <code>a</code> and <code>b</code>, <code>or</code> will return a
boolean value immediately if possible. Otherwise, it returns a function which
accepts a value to resolve later.</p>
</dd>
<dt><a href="#prop">prop(path)</a> ⇒ <code>Resolver</code></dt>
<dd><p>Takes a path; returns a value-resolving function.</p>
</dd>
<dt><a href="#switchMap">switchMap(map, key)</a> ⇒ <code>Resolver</code> | <code>String</code></dt>
<dd><p>The <code>switchMap</code> function is for <em>mapping</em> keys to values.
Given a <code>map</code> and a <code>key</code>, it will resolve to a value
immediately (if possible), or return a function with may be passed an object
to resolve later.</p>
</dd>
<dt><a href="#tern">tern(a, b, test)</a> ⇒ <code>Resolver</code> | <code>String</code></dt>
<dd><p>The <code>tern</code> function is for resolving some
<em>ternary condition</em>. Given <code>a</code>, <code>b</code>, and
<code>test</code>--if <code>tern</code> will return a value immediately if
possible. Otherwise, it returns a function which accepts a value to resolve
later.</p>
</dd>
</dl>

<a name="and"></a>

## and(a, b) ⇒ <code>Resolver</code> \| <code>Boolean</code>
The <code>and</code> function is for resolving the logical "and" of two
values. Given <code>a</code> and <code>b</code>, <code>and</code> will return
a boolean value immediately if possible. Otherwise, it returns a function
which accepts a value to resolve later.

**Kind**: global function  
**Returns**: <code>Resolver</code> \| <code>Boolean</code> - A value or a resolver.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Resolver</code> \| <code>String</code> | The first value to "and". |
| b | <code>Resolver</code> \| <code>String</code> | The second value to "and". |

<a name="declare"></a>

## declare(cssProperty, value, [test]) ⇒ <code>Resolver</code> \| <code>String</code>
The <code>declare</code> function is for resolving whether or not a CSS
(property, value) pair string should be declared. In many cases, you know
what CSS property you want to declare, but you don't know whether or not to
declare it. The alternative would be to set the CSS value to something
invalid, but this bloats the CSS unnecessarily. Given
<code>cssProperty</code>, <code>value</code>, and <code>test</code>, the
<code>declare</code> function will return a string (may be empty)
immediately if possible. Otherwise, it returns a function which accepts a
value to resolve later. The cssProperty <bold>must</bold> be a string (i.e.,
cannot be a resolver). However, both value and test may be resolved later.

**Kind**: global function  
**Returns**: <code>Resolver</code> \| <code>String</code> - A declaration string or a resolver.  

| Param | Type | Description |
| --- | --- | --- |
| cssProperty | <code>String</code> | The CSS property we want to declare. |
| value | <code>Resolver</code> \| <code>\*</code> | The value or resolver to set our CSS property to. |
| [test] | <code>Resolver</code> \| <code>\*</code> | This determines whether or not to declare. |

<a name="includes"></a>

## includes(array, test) ⇒ <code>Resolver</code> \| <code>Boolean</code>
The <code>includes</code> function is for resolving whether or not some value
is <em>included</em> in an array of values. Given <code>array</code> and
<code>test</code>, <code>includes</code> will return a boolean value
immediately if possible. Otherwise, it returns a function which accepts a
value to resolve later. Array's elements <bold>may not</bold> be
resolvers. I.e., they must be resolved along with the parent array.

**Kind**: global function  
**Returns**: <code>Resolver</code> \| <code>Boolean</code> - A value or a resolver.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Resolver</code> \| <code>Array</code> | The array to check inclusion with. |
| test | <code>Resolver</code> \| <code>\*</code> | The value or resolver to look for in the array. |

<a name="is"></a>

## is(a, b) ⇒ <code>Resolver</code> \| <code>Boolean</code>
The <code>is</code> function is for resolving a <code>===</code> check of two
values. Given <code>a</code> and <code>b</code>, <code>is</code> will return
a boolean value immediately if possible. Otherwise, it returns a function
which accepts a value to resolve later.

**Kind**: global function  
**Returns**: <code>Resolver</code> \| <code>Boolean</code> - A value or a resolver.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Resolver</code> \| <code>String</code> | The first value in the equality check. |
| b | <code>Resolver</code> \| <code>String</code> | The second value in the equality check. |

<a name="join"></a>

## join(joiner, ...values) ⇒ <code>Resolver</code> \| <code>String</code>
Takes an array of strings possible interpolation functions. If all the values
are strings, a string is returned. Otherwise, a function is returned that
accepts an object and returns a string by resolving any functions.

**Kind**: global function  
**Returns**: <code>Resolver</code> \| <code>String</code> - Returns string immediately if possible.  

| Param | Type | Description |
| --- | --- | --- |
| joiner | <code>String</code> | the string to join values with. |
| ...values | <code>Resolver</code> \| <code>String</code> | The values to join together. |

<a name="not"></a>

## not(value) ⇒ <code>Resolver</code> \| <code>Boolean</code>
The <code>not</code> function is for resolving logical "not" of some
<em>single condition</em>. Given <code>value</code>, <code>not</code> will
return a boolean value immediately if possible. Otherwise, it returns a
function which accepts a value to resolve later.

**Kind**: global function  
**Returns**: <code>Resolver</code> \| <code>Boolean</code> - A value or a resolver.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Resolver</code> \| <code>String</code> | The value to return the opposite of. |

<a name="or"></a>

## or(a, b) ⇒ <code>Resolver</code> \| <code>Boolean</code>
The <code>or</code> function is for resolving the logical "or" of two values.
Given <code>a</code> and <code>b</code>, <code>or</code> will return a
boolean value immediately if possible. Otherwise, it returns a function which
accepts a value to resolve later.

**Kind**: global function  
**Returns**: <code>Resolver</code> \| <code>Boolean</code> - A value or a resolver.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Resolver</code> \| <code>String</code> | The first value to "or". |
| b | <code>Resolver</code> \| <code>String</code> | The second value to "or". |

<a name="prop"></a>

## prop(path) ⇒ <code>Resolver</code>
Takes a path; returns a value-resolving function.

**Kind**: global function  
**Returns**: <code>Resolver</code> - A resolver.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | A valid path in a props object. |

<a name="switchMap"></a>

## switchMap(map, key) ⇒ <code>Resolver</code> \| <code>String</code>
The <code>switchMap</code> function is for <em>mapping</em> keys to values.
Given a <code>map</code> and a <code>key</code>, it will resolve to a value
immediately (if possible), or return a function with may be passed an object
to resolve later.

**Kind**: global function  
**Returns**: <code>Resolver</code> \| <code>String</code> - A value or a resolver.  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Object</code> | Maps values to values OR value-resolving funcs. |
| key | <code>Resolver</code> \| <code>String</code> | Value or function that resolves to value. |

<a name="tern"></a>

## tern(a, b, test) ⇒ <code>Resolver</code> \| <code>String</code>
The <code>tern</code> function is for resolving some
<em>ternary condition</em>. Given <code>a</code>, <code>b</code>, and
<code>test</code>--if <code>tern</code> will return a value immediately if
possible. Otherwise, it returns a function which accepts a value to resolve
later.

**Kind**: global function  
**Returns**: <code>Resolver</code> \| <code>String</code> - A value or a resolver.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Resolver</code> \| <code>String</code> | The 'true' case. |
| b | <code>Resolver</code> \| <code>String</code> | The 'false' case. |
| test | <code>Boolean</code> \| <code>function</code> | The value to test for a or b. |

