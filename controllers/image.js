const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a5d597b42c6149aba0f97dff3587b050'
});
const handleApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('API isn\'t responding! '))
}


const handleImage = (req, res, pdb) => {
    const { id } = req.body;
    pdb('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to update'))
};

module.exports = { handleImage, handleApiCall };