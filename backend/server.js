import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();
const app = express()
// const port = 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		// credentials: true,
		origin: '*',
	})
);

app.get('/', (req, res) => {
	res.send('Welcome to SQL');
});

app.listen(process.env.PORT || port, () => {
	console.log(`listening on ${process.env.PORT}`);
});