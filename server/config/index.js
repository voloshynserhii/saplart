require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })

/**
 * Default Config
 */
let defaultConfig = {
  /**
   * Setting server
   * port - port
   * env - production | development
   */
  server: {
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV,
  },

  /**
   * Setting MongoDB
   * uri - uri
   */
  db: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
  },

  /**
   * Setting cookie for session
   * name - name cookie
   * secure - use only https
   * secret - secret
   * maxAge - max time alive (sec)
   */
  cookie: {
    name: process.env.COOKIE_NAME || '__rd',
    secure: process.env.COOKIE_SECURE || false,
    secret: process.env.COOKIE_SECRET,
    userSecret: process.env.COOKIE_USER_SECRET,
    maxAge: process.env.COOKIE_MAX_AGE || 30 * 60,
  },

  /**
   * Setting AWS for S3
   * bucketName - name bucket
   * region - Region
   * accessKeyId - Access key Id
   * secretAccessKey - Secret access key
   */
  s3: {
    bucketName: process.env.S3_BUCKET_NAME,
    bucketCommon: process.env.S3_BUCKET_COMMON,
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
}

module.exports = defaultConfig
