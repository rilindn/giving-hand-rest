import createHttpError from 'http-errors'
import cron from 'node-cron'
import os from 'os'
import { logger } from '@/utils/logger'
import ResetTokenService from '@/services/resetToken.service'
import { RESET_TOKEN_CRON_JOB_SCHEDULE } from './env.config'

async function initializeCronJobs() {
  const jobSchedule = RESET_TOKEN_CRON_JOB_SCHEDULE
  try {
    cron.schedule(jobSchedule, async () => {
      const heap = process.memoryUsage().heapUsed / 1024 / 1024
      const freeMemory = `${Math.round((os.freemem() * 100) / os.totalmem())}%`

      // heap used | free memory
      const csv = `${heap}, ${freeMemory}\n`

      logger.info(' Running invalid tokens delete job ')
      logger.info(` OS Usage: ${csv}`)

      const { deletedCount } = await ResetTokenService.deleteInvalidResetToken()
      logger.info(`======== Deleted ${deletedCount} tokens ========`)
    })
  } catch (error) {
    createHttpError(error.staus, error)
  }
}

export default initializeCronJobs
