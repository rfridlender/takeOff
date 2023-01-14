import { Router } from 'express'
import * as takeoffsCtrl from '../controllers/takeoffs.js'

const router = Router()

router.get('/', takeoffsCtrl.index)

export {
  router
}
