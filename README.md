This repository is based on [https://github.com/Miorey/wow-model-viewer/](https://github.com/Miorey/wow-model-viewer/) — thanks to Miorey and everyone who contributed to the original work.

## 🛠 Requirements

This project works **only** with classic 3.3.5 and only with our data and our `viewer.min.js`.

You must provide the path to your previously downloaded data:

```js
window.CONTENT_PATH = `/data/`; // local path, or upload to any CDN
```

You can also disable the built-in loading animation and provide your own. Example:

```js
generateModels(1, '#model_3d', character, 'classic', {
    hideProgressBar: true,
    onReady: () => {
        // your code runs after the model is fully loaded and rendered
    }
});
```

Node.js 18+ required.

This project will be maintained.
