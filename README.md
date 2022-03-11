<div align=center>

![][logo]

# [Obs]()erver e[X]()tension

**S rank observer pattern** library  
for **JavaScript** and **TypeScript**

</div>

## Features

- **Small**: 0.91 KiB / gzip: 0.47 KiB
- **Splendid**: observe any values and function calls
- **Smart**: all nested values notified on parent change
- **Simple**: 1 function, 4 symbols
- **Sweet**: similar accessor syntax
- **Speedy**: location based proxy allocation

## Documentation

A tiny documentation for a tiny library...

### Installation

```sh
npm i obsx
# or
yarn add obsx
```

### Import

```ts
import { observe, value, onChange, onApply, notifyChange } from "obsx";
// or
const { observe, value, onChange, onApply, notifyChange } = require("obsx");
```

### Observe

```ts
interface TreeNode {
	value: number;
	parent?: TreeNode;
	nodes: TreeNode[];
}

const data = observe<TreeNode>({
	value: 0,
	nodes: [],
});
```

### On Change

Detect changes in a value, which can be not yet defined. Updating a parent object will notify all observers recursively for nested values.

```ts
const stop = data.value[onChange]((current, previous) => {
	console.log(`data.value changed from ${previous} to ${current}`);
});

data.value[value]++; // data.value changed from 0 to 1
data[value] = { value: 2, nodes: [] }; // data.value changed from 1 to 2
stop();
data.value[value]++; // silence...
```

### On Apply

Detect when the function is called. The function can be undefined when registering the observer.

```ts
const stop = data.nodes.push[onApply]((...nodes) => {
	console.log(`data.nodes has new nodes!`, nodes);
});

data.nodes.push({ value: 1, nodes: [] });
// data.nodes has new nodes! [{value: 1, nodes: []}]
stop();
data.nodes.push({ value: 1, nodes: [] }); // silence...
```

### Forced Notify Change

The default behavior won't call the change observer if there are no changes.

```ts
data.value[onChange](() => {
	console.log("I did not change...");
});
data.value[notifyChange](true);
data.value[notifyChange](true);
data.value[notifyChange](true);
// I did not change (3 times)
```

## Under the Hood

### Implementation

ObsX uses Proxies to allow for the sweet syntax you see above. It caches proxies on the location level, in contrast to the object level caching used in Vue. Therefore, it won't create a new Proxy on every assignment, but rather on every path access.

### Performance

With JIT-compiler optimizations, it should not be much slower than implementing all its functionalities without the fancy syntax provided by proxies.

## License

This project is licensed under the MIT License.

[logo]: ./doc/logo-128.png
