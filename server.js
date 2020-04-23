const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

const courses = require("./data")

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure("view", {
    express:server,
    autoescape: false,
    noCache: false
})

server.get("/", function(req, res){
    const about = {
        icon_url: "https://rocketseat.com.br/static/images/logo-rocketseat.svg",
        title: "RocketSeat",
        about: "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
        description:"Linguagens como, Javascript, NodeJS, React Native, React JS",

        link:[
            {
                url:"https://discordapp.com/invite/gCRAFhc",
                name:"Instagram"
            },
            {
                url:"https://www.facebook.com/rocketseat/",
                name:"Facebook"
            },
            {
                url:"tel:+5547992078767",
                name:"Telefone"
            }
            
        ]
        
    }
    return res.render("about", {data: about})
})

server.get("/courses", function(req, res){
    return res.render("courses", {infoCourse: courses})
})

server.get("/courses/:id", function(req, res) {
    const id = req.params.id

    const findCourse = courses.find(function(findCourse){
        return findCourse.id == id
    })
    // if(!course){
    //     return res.send("Course not found!")
    // }

    return res.render("courses.njk/",{infoSubCourses: findCourse})

  })

server.listen(5000, function(){
    console.log("server OK")
})

server.use(function(req, res) {
    res.status(404).render("not-found");
  });
