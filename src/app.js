import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { engine } from 'express-handlebars';
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/api/sessions.js';
import viewsRouter from './routes/views.js';
// import handlebars from 'handlebars';

const app = express()
const PORT = 8080



app.engine('handlebars', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(session({
    // store: new fileStorage({path: './sessions', ttl:100, retries:0}),
    store:MongoStore.create({
        mongoUrl: 'mongodb+srv://viviana_6:Dios66**@cluster0.mqsapxf.mongodb.net/',
        ttl:100
    }),
    secret: "coderSecret",
    resave:false,
    saveUninitialized:false
}))

app.use('/sessions', sessionsRouter);

app.get('/', (req, res)=>{
     res.render('home', {title: 'Bienvenido'});
 });

//  app.engine('handlebars', handlebars.engine())
 app.set('views', __dirname + './views');
 app.set('view engine', 'handlebars');




app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
