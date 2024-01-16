import md5 from 'md5'

export const generateToken = (username) => {
  return md5(username)
}
