const app = require('./app');
const port = 8081;

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});