class HttpController {
  createModel(req, res, model) {
    var item = new model(req.body);
        
    item.save((err, item) => {
        if (err) {
            return res.status(400).json(err)
        }

        res.status(200).json(item)
     });   
  }

  deleteModel(req, res, model) {
    model.findOneAndDelete({_id: req.params.id}, (err, item) => {
      if (err) {
        return handleNotFound(res);
      } 

      if (!user) {
        handleNotFound(res);
      } else {
        res.status(204).json(item)
      }
    })
  }

  notFound(res, message = 'Not found') {
    res.status(404).json({ message });
  }

  unAuthorized(res) {
    res.status(401).json({message: 'Access forbidden'})
  }
}

module.exports = HttpController;