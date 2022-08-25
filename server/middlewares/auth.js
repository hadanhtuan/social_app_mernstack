import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    const isCustomToken = token.length < 500

    let decodeData
    if(isCustomToken) {
      decodeData = jwt.verify(token, process.env.SECRET)

      req.userId = decodeData?.id
    } else {  //google login
      decodeData = jwt.decode(token)
      req.userId = decodeData?.sub
    }
    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: error})
  }
}

export default auth














