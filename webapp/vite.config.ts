/// <reference types="vitest/config" />
import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import colors from 'picocolors'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.VITE_PORT) || 5173
  const basePath = env.VITE_BASE_PATH || '/'
  const appUrl = env.VITE_APP_URL

  return {
    plugins: [
      react(),
      tailwindcss(),

      // This fixes the url, in case is another host
      ...(appUrl
        ? [
            {
              name: 'print-proxy-url',
              configureServer(server: any) {
                server.printUrls = () => {
                  server.config.logger.info(
                    `  ${colors.green('➜')}  ${colors.bold('Local:')}   ${colors.cyan(`${appUrl}/`)}`,
                  )
                  server.config.logger.info(
                    `  ${colors.green('➜')}  ${colors.bold('Network:')} ${colors.cyan(`${appUrl}/`)}`,
                  )
                }
              },
            },
          ]
        : []),
    ],
    base: basePath,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
    },
    server: {
      host: '0.0.0.0',
      port,
      allowedHosts: true,
    },
  }
})
