# 🚀 Guía de Deploy en Vercel - TicketSafer

## 📋 Variables de Entorno Requeridas

Configura estas variables en Vercel Dashboard > Settings > Environment Variables:

### 🌐 Configuración Principal
```
VITE_APP_NAME=TicketSafer
VITE_APP_URL=https://tu-dominio.vercel.app
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=La primera plataforma multichain de tickets NFT
```

### 🔗 Web3 Configuration
```
VITE_WALLETCONNECT_PROJECT_ID=705647bd297da3c2ea969a7940191475
VITE_ENABLE_WEB3_FEATURES=true
```

### 🗺️ APIs Externas
```
VITE_MAPBOX_TOKEN=pk.eyJ1IjoidmFpb3M0NCIsImEiOiJjbWNjZDN3a24wN2NiMmpwcnJ3ejdiZnQ5In0.OSq9I4OIDU8aJFLqRclkZw
VITE_IMAGES_CDN_URL=https://images.unsplash.com
VITE_API_URL=https://api.ticketsafer.com
VITE_API_VERSION=v1
```

### ⚡ Features Flags
```
VITE_ENABLE_PWA=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_EXPERIMENTAL_FEATURES=false
VITE_DEBUG_MODE=false
```

### 📱 PWA Configuration
```
VITE_PWA_NAME=TicketSafer
VITE_PWA_SHORT_NAME=TicketSafer
VITE_PWA_THEME_COLOR=#667eea
VITE_PWA_BACKGROUND_COLOR=#0f172a
VITE_BUILD_MODE=production
VITE_PUBLIC_PATH=/
```

## 🔧 Configuración de Build en Vercel

### Framework Preset: `Vite`
### Build Command: `npm run build`
### Output Directory: `dist`
### Install Command: `npm install`
### Node.js Version: `18.x`

## 🌐 Configuración de Dominio

1. Vercel automáticamente asignará un dominio: `https://ticketsafer-xxx.vercel.app`
2. Para dominio personalizado, ir a Settings > Domains
3. Agregar tu dominio personalizado si tienes uno

## 📊 Optimizaciones Incluidas

✅ **Caching Headers** - Assets con cache de 1 año
✅ **SPA Routing** - Todas las rutas redirigen a index.html
✅ **Gzip Compression** - Automático en Vercel
✅ **Code Splitting** - Chunks optimizados
✅ **PWA Support** - Service Worker incluido
✅ **SEO Optimized** - Meta tags dinámicos

## 🔍 Verificación Post-Deploy

Después del deploy, verifica:

1. ✅ Página principal carga correctamente
2. ✅ Rutas de React Router funcionan
3. ✅ Conexión de wallet funciona
4. ✅ Imágenes se cargan desde CDN
5. ✅ PWA se puede instalar
6. ✅ Performance > 90 en Lighthouse

## 🐛 Troubleshooting

### Error de Build
- Verificar que todas las variables de entorno estén configuradas
- Revisar que Node.js version sea 18.x
- Verificar que el comando de build sea `npm run build`

### Error 404 en rutas
- Verificar que vercel.json existe y tiene la configuración SPA
- Todas las rutas deben redirigir a index.html

### Variables de entorno no funcionan
- Verificar que las variables comiencen con `VITE_`
- Verificar que estén configuradas en Vercel Dashboard
- Hacer redeploy después de cambiar variables

## 📈 Monitoreo

Una vez desplegado, puedes monitorear:
- **Vercel Analytics** - Tráfico y performance
- **Functions** - Si usas Vercel Functions
- **Logs** - Para debug de errores
- **Real User Monitoring** - Performance real de usuarios 