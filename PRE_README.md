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

