This repository is based on [https://github.com/Miorey/wow-model-viewer/](https://github.com/Miorey/wow-model-viewer/) — thanks to Miorey and everyone who contributed to the original work.

## 🛠 Requirements

- Node.js 18+
- Only works with classic 3.3.5 and our data + `viewer.min.js`

### Data

Download: [https://github.com/WarhoopAll/wotlk-model-viewer/releases/tag/data](https://github.com/WarhoopAll/wotlk-model-viewer/releases/tag/data)

Set the path to your data:

```js
window.CONTENT_PATH = `/data/`; // local or CDN URL
```

## Framework

```bash
npm i wotlk-model-viewer
```

```js
import { generateModels } from 'wotlk-model-viewer';
```

```html
<div id="model_3d"></div>
```

```js
const character = {
    "race": 7,
    "gender": 1,
    "skin": 4,
    "face": 0,
    "hairStyle": 5,
    "hairColor": 5,
    "facialStyle": 5,
    "items": [[1, 1170], [3, 4925], [5, 9575], [6, 25235], [7, 2311], [8, 21154], [9, 14618], [10, 9534], [15, 17238], [21, 20379], [22, 28787]]
};

generateModels(1, '#model_3d', character);
```

You can also disable the built-in loading animation:

```js
generateModels(1, '#model_3d', {
    ...character,
    items,
    hideProgressBar: true,
    onReady: () => {
        // runs after the model is fully loaded and rendered
    }
});
```

Demo: [https://warhoopall.github.io/wotlk-model-viewer/](https://warhoopall.github.io/wotlk-model-viewer/)

This project will be maintained.

Available on npm: [wotlk-model-viewer](https://www.npmjs.com/package/wotlk-model-viewer)
