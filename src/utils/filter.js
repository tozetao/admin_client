import app from '@/store/modules/app'

export function filterImageUrl(url) {
  if (url && (url.indexOf('.com') !== -1 || url.indexOf('.net') !== -1)) {
    return url
  }
  return app.state.config.assetDir + url
}