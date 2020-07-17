export default {
  port: process.env.PORT || 3000,
  folderStorage: process.env.URL_STORAGE || '/storage',
  pictureQuality: process.env.PICTURE_QUALITY || 80,
  secretkey: process.env.SECRETKEY || 'de0b716f-e58a-471a-bfca-80be3af4c453',
  publicRoutes: process.env.PUBLICROUTES ||[
    'cadastrousuarios/create',
    'cadastrousuarios/auth',
    'funcionarios/auth',
    '/storage',
    'cep'
  ]
  
}