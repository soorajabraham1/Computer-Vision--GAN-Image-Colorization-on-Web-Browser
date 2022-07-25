




const MODEL_PATH = '/tensorflow/model.json';
function loadModel(){
    const model = tf.loadLayersModel(MODEL_PATH);
    console.log("model is loaded");
    return model;
}
const model = loadModel();


// load image
const IMAGE_SIZE = 224; // input size of mobileNet
const image = document.getElementById("image");  // assign the image element
function loadImage(elm) {
    // elm is the HTMLElement (image / webcam)
    const x = tf.tidy(() => {
        // read tf.Tensor from elm and convert to float
        let img = tf.cast(tf.browser.fromPixels(elm), 'float32');
        // insert dimension [w, h, 3] -> [1, w, h, 3]
        img = img.expandDims(0);
        // resize to [1, 224, 224, 3]
        img = tf.image.resizeBilinear(img, [IMAGE_SIZE, IMAGE_SIZE]);
        const offset = tf.scalar(127.5);
        // normalize to range [-1,1] for mobilenet input
        const normalized = img.sub(offset).div(offset);
        return normalized;
    });
    return x;
}

