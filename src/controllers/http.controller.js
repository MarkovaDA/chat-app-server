class HttpHandlers {
  handleNotFound(res) {
    return res.status(404).json({message: `Not found`})
  }

  handleDeleteSuccess(res) {

  }

  handleCreateSuccess(res) {

  }
}

module.exports = new HttpHandlers();