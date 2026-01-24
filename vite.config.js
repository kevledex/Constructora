import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quienes_somos: resolve(__dirname, 'src/pages/quienes_somos.html'),
        contacto: resolve(__dirname, 'src/pages/contacto.html'),
        cipre: resolve(__dirname, 'src/pages/proyectos/cipres.html'),
        villa_ventura: resolve(__dirname, 'src/pages/proyectos/villa_ventura.html'),
        liberty_plaza: resolve(__dirname, 'src/pages/proyectos/liberty_plaza.html'),
        sassari: resolve(__dirname, 'src/pages/proyectos/sassari.html'),
      }
    }
  }
})
