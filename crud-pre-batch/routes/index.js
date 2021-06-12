var express = require('express');
var router = express.Router();
const dbConnection = require("../lib/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  dbConnection.query(`  SELECT course.id as id,course.name as name,course.thumnail as thumnail,course.duration as duration,course.description as description,author.name as authorName from course left join author on course.id_author= author.id order by id`, ( error, data)=> {
 if(error) {
   console.log(error);
 }else {
   console.log(data);
  res.render('course/index', { title: 'Express' ,data:data});
 }
  }) 
});


router.get("/add", (req,res ) => {
  res.render("course/add",{
    name:"",
    thumnail:"",
    Idauthor:"",
    duration: "",
    description:"",
    
  });
});
router.post("/store", (req,res ) => {
  const { name,thumnail,Idauthor,duration,description } = req.body;
  let error = false;
  if(!name.length ||
    !thumnail.length||
     !Idauthor.length ||
     !duration.length||
     !description.length) {
       error = true

       req.flash("error","Lengkapi Data Anda");
       res.render("course/add",{ name,thumnail,Idauthor,duration,description});
     };

  if (!error) {
    const formdata= { 
    name,
    thumnail,
    id_author:Idauthor,
    duration,
    description,
    

   };
   dbConnection.query("INSERT INTO course SET?",formdata,(error) => {
    if(error) {
      req.flash("error",error);
    }else {
      
      req.flash("success", "berhasil Ditambahkan");
     res.redirect("/");
    }
   });
  }
});
 router.get("/delete/(:id)",(req,res) => {
   const id =req.params.id;

   dbConnection.query("DELETE FROM course WHERE  id=" + id,(error) =>{
    if(error) {
      req.flash("error",error);
    }else {
      req.flash("success", "berhasil hapus data");
     res.redirect("/");
    }
   });
 });

 router.get("/edit/(:id)",(req,res) => {
  const id =req.params.id;

   dbConnection.query(" SELECT * FROM post  WHERE id=" +id,(error,data)=>{
    if(error) {
      req.flash("error",error);
    }else {
      res.render("post/edit",{
    id : data[0].id,
    nama:data[0].nama,
    photo: data[0].photo,
    content:data[0].content,
    penerbit:data[0].penerbit,
    penulis:data[0].penulis,
    codeId:parseInt(data[0].codeId),

      })
    }
   })

 });
  router.post("/post/update",(req,res) =>{
    const { nama,photo,content,penerbit,penulis,codeId ,id} = req.body;
    let error = false;
    if(!nama.length ||
       !photo.length ||
       !content.length ||
       !penerbit.length||
       !penulis.length||
       !codeId.length) {
         error = true
  
         req.flash("error","Lengkapi Data Anda");
         res.render("post/edit",{ nama,photo,content,penerbit,penulis,codeId});
       };
  
    if (!error) {
      const formdata= { 
      nama,
      photo,
      content,
      penerbit,
      penulis,
      code_id:codeId,
  
     };
     dbConnection.query("UPDATE post SET? WHERE id="  + id,formdata,(error) => {
      if(error) {
        req.flash("error",error);
      }else {
        req.flash("success", "berhasil edit post");
       res.redirect("/");
      }
     });
    }
  });




module.exports = router;
