import { Router } from 'express'
import * as takeoffsCtrl from '../controllers/takeoffs.js'
import { isManager } from '../middleware/middleware.js'

const router = Router()

router.get('/', takeoffsCtrl.index)
router.get('/new', takeoffsCtrl.new)
router.get('/:id', takeoffsCtrl.show)
router.get('/:id/edit', isManager, takeoffsCtrl.edit)

router.post('/', takeoffsCtrl.create)
router.put('/:id', isManager,takeoffsCtrl.update)

router.delete('/:id', isManager, takeoffsCtrl.delete)

export {
  router
}
