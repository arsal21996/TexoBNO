const express = require('express');
const fs = require('fs');
const router = express.Router();
const BLOGS_FILE = './data/blogs.json';

router.get('/', (req,res)=>{
 const blogs = JSON.parse(fs.readFileSync(BLOGS_FILE));
 res.json(blogs);
});

router.post('/', (req,res)=>{
 const blogs = JSON.parse(fs.readFileSync(BLOGS_FILE));
 const blog = { id: Date.now(), title: req.body.title, content: req.body.content, createdAt: new Date() };
 blogs.push(blog);
 fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs,null,2));
 res.status(201).json(blog);
});

router.put('/:id',(req,res)=>{
 const blogs = JSON.parse(fs.readFileSync(BLOGS_FILE));
 const id = Number(req.params.id);
 const index = blogs.findIndex(b=>b.id===id);
 if(index===-1) return res.status(404).json({message:'Blog not found'});
 blogs[index] = {...blogs[index], ...req.body};
 fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs,null,2));
 res.json(blogs[index]);
});

router.delete('/:id',(req,res)=>{
 const blogs = JSON.parse(fs.readFileSync(BLOGS_FILE));
 const filtered = blogs.filter(b=>b.id!==Number(req.params.id));
 fs.writeFileSync(BLOGS_FILE, JSON.stringify(filtered,null,2));
 res.json({message:'Blog deleted'});
});

module.exports = router;