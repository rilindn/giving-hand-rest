import initializeCronJobs from './cron.config'
import initializeMongo from './mongodb.config'
import './passport.config'

initializeMongo()
initializeCronJobs()
