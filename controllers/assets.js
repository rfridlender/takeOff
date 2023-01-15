function index(req, res) {
  res.render('assets/index', {
      title: 'Assets',
    })
}

export {
  index,
}