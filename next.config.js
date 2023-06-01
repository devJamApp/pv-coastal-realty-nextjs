/** @type {import('next').NextConfig} */
import { isDev } from './data/settings'

const nextConfig = {
    images: {
        unoptimized: isDev ? true : false,
        domains: ['members.mlsvallarta.com'],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
