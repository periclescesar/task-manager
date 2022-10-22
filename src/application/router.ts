import express from 'express'

const router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/health', async (_req, res) => {
  /**
   #swagger.summary = 'to get status about API'
   #swagger.parameters['X-Request-Id'] = {
     in: 'header',
     description: 'to identify request on log'
   }
   #swagger.responses[200] = {
     description: 'status successfully obtained.',
     schema: {
       im: true
     }
   }
   */
  res.json({ im: true })
})

export default router
