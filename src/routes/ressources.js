const express = require('express')
const connection = require('../helper/db.js')
const Router = express.Router()

Router.get('/', (req, res) => {
  res.send("i am on GET '/' ")
})

Router.get('/read', (req, res) => {
    let sql = 'SELECT * FROM ressources'
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error retrieving ressources from database')
      } else {
        res.json(result)
      }
    })
  })
  

  Router.post("/add", (req, res) => {
    const sql = "INSERT INTO ressources (`type`, `picto`, `x`, `y`, `indications`) VALUES (?,?,?,?,?)";
    const values = [
      req.body.type,
      req.body.picto,
      req.body.x,
      req.body.y,
      req.body.indications,
    ]
    console.log("POST '/ressources/add'")
    
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      return res.status(200).send(result);
    })
  })
  
    Router.delete("/delete", (req, res) => {
    const sql = "DELETE FROM ressources WHERE id=?";
    const values = [
      req.body.id
    ]
    console.log("DELETE '/ressources/delete'")
    
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      return res.status(200).send(result);
    })
    })
  
module.export = Router